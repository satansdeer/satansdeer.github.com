#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const DEFAULT_PROPERTY = process.env.GSC_PROPERTY || "sc-domain:maksimivanov.com";
const DEFAULT_SITE_URL = process.env.SITE_URL || "https://maksimivanov.com";
const DEFAULT_CLIENT_PATH =
  process.env.GSC_OAUTH_CLIENT_PATH ||
  path.join(os.homedir(), ".config/codex/secrets/google-search-console-oauth-client.json");
const DEFAULT_TOKEN_PATH =
  process.env.GSC_OAUTH_TOKEN_PATH ||
  path.join(os.homedir(), ".config/codex/secrets/google-search-console-token.json");
const SEARCH_CONSOLE_SCOPE =
  process.env.GSC_SCOPE || "https://www.googleapis.com/auth/webmasters";
const TOKEN_EXPIRY_SKEW_MS = 60 * 1000;

function parseArgs(argv) {
  const args = {
    _: [],
    property: DEFAULT_PROPERTY,
    siteUrl: DEFAULT_SITE_URL,
    client: DEFAULT_CLIENT_PATH,
    token: DEFAULT_TOKEN_PATH,
    days: 90,
    limit: undefined,
    issueLimit: 30,
    sitemap: "public/sitemap.xml",
    inspectLimit: 0,
    json: false,
  };

  argv.forEach((arg) => {
    if (arg === "--json") {
      args.json = true;
      return;
    }

    if (!arg.startsWith("--")) {
      args._.push(arg);
      return;
    }

    const [rawKey, ...rawValue] = arg.slice(2).split("=");
    const key = rawKey.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    const value = rawValue.length ? rawValue.join("=") : "true";
    args[key] = value;
  });

  ["days", "limit", "issueLimit", "inspectLimit"].forEach((key) => {
    if (args[key] !== undefined) {
      args[key] = Number(args[key]);
    }
  });

  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeSecretJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true, mode: 0o700 });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  fs.chmodSync(filePath, 0o600);
}

function loadClient(clientPath) {
  const payload = readJson(clientPath);
  const config = payload.installed || payload.web;

  if (!config?.client_id) {
    throw new Error(`OAuth client JSON is missing installed.client_id: ${clientPath}`);
  }

  return {
    clientId: config.client_id,
    clientSecret: config.client_secret || "",
  };
}

function base64Url(input) {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function openInBrowser(url) {
  const opener =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "cmd"
        : "xdg-open";

  const args = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(opener, args, {
    detached: true,
    stdio: "ignore",
  });

  child.unref();
}

function createOAuthServer(expectedState) {
  let resolveCode;
  let rejectCode;
  const sockets = new Set();
  const codePromise = new Promise((resolve, reject) => {
    resolveCode = resolve;
    rejectCode = reject;
  });

  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, "http://127.0.0.1");

    if (requestUrl.pathname !== "/oauth2callback") {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const state = requestUrl.searchParams.get("state");
    const code = requestUrl.searchParams.get("code");
    const error = requestUrl.searchParams.get("error");

    if (state !== expectedState) {
      res.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
      res.end("OAuth state did not match. You can close this tab.");
      closeOAuthServer(server, sockets);
      rejectCode(new Error("OAuth state did not match"));
      return;
    }

    if (error) {
      res.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
      res.end(`Google returned an OAuth error: ${error}`);
      closeOAuthServer(server, sockets);
      rejectCode(new Error(`Google returned an OAuth error: ${error}`));
      return;
    }

    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end("<p>Search Console authorization complete. You can close this tab.</p>", () => {
      closeOAuthServer(server, sockets);
      resolveCode(code);
    });
  });

  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.on("connection", (socket) => {
      sockets.add(socket);
      socket.on("close", () => sockets.delete(socket));
    });
    server.listen(0, "127.0.0.1", () => {
      resolve({
        redirectUri: `http://127.0.0.1:${server.address().port}/oauth2callback`,
        codePromise,
      });
    });
  });
}

function closeOAuthServer(server, sockets) {
  server.close();
  sockets.forEach((socket) => socket.destroy());
}

async function postForm(url, values) {
  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(values),
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(payload)}`);
  }

  return payload;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: options.signal || controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function authorize(args) {
  const client = loadClient(args.client);
  const state = base64Url(crypto.randomBytes(24));
  const verifier = base64Url(crypto.randomBytes(64));
  const challenge = base64Url(sha256(verifier));
  const { redirectUri, codePromise } = await createOAuthServer(state);

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", client.clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SEARCH_CONSOLE_SCOPE);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", challenge);
  authUrl.searchParams.set("code_challenge_method", "S256");

  console.log("Opening Google OAuth in your browser.");
  console.log(`If it does not open, visit:\n${authUrl.toString()}\n`);
  openInBrowser(authUrl.toString());

  const code = await codePromise;
  const token = await postForm("https://oauth2.googleapis.com/token", {
    client_id: client.clientId,
    client_secret: client.clientSecret,
    code,
    code_verifier: verifier,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  writeSecretJson(args.token, {
    ...token,
    scope: SEARCH_CONSOLE_SCOPE,
    expiry_date: Date.now() + token.expires_in * 1000,
  });

  console.log(`Saved Search Console OAuth token to ${args.token}`);
}

async function refreshToken(args, currentToken) {
  if (!currentToken.refresh_token) {
    throw new Error("No refresh_token found. Run `npm run seo:gsc:auth` again.");
  }

  const client = loadClient(args.client);
  const token = await postForm("https://oauth2.googleapis.com/token", {
    client_id: client.clientId,
    client_secret: client.clientSecret,
    grant_type: "refresh_token",
    refresh_token: currentToken.refresh_token,
  });

  const nextToken = {
    ...currentToken,
    ...token,
    refresh_token: token.refresh_token || currentToken.refresh_token,
    scope: token.scope || currentToken.scope || SEARCH_CONSOLE_SCOPE,
    expiry_date: Date.now() + token.expires_in * 1000,
  };

  writeSecretJson(args.token, nextToken);
  return nextToken.access_token;
}

async function getAccessToken(args) {
  if (!fs.existsSync(args.token)) {
    throw new Error(`No OAuth token found at ${args.token}. Run \`npm run seo:gsc:auth\` first.`);
  }

  const token = readJson(args.token);

  if (token.access_token && token.expiry_date > Date.now() + TOKEN_EXPIRY_SKEW_MS) {
    return token.access_token;
  }

  return refreshToken(args, token);
}

async function googleRequest(args, url, options = {}) {
  const accessToken = await getAccessToken(args);
  const response = await fetchWithTimeout(url, {
    ...options,
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(payload)}`);
  }

  return payload;
}

function webmastersUrl(siteUrl, suffix = "") {
  return `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}${suffix}`;
}

function renderRows(rows, columns) {
  const widths = columns.map((column) =>
    Math.max(column.length, ...rows.map((row) => String(row[column] ?? "").length))
  );
  const line = columns.map((column, index) => column.padEnd(widths[index])).join("  ");
  const rule = widths.map((width) => "-".repeat(width)).join("  ");
  const body = rows
    .map((row) => columns.map((column, index) => String(row[column] ?? "").padEnd(widths[index])).join("  "))
    .join("\n");

  return `${line}\n${rule}${body ? `\n${body}` : ""}`;
}

async function listSites(args) {
  const payload = await googleRequest(args, "https://www.googleapis.com/webmasters/v3/sites");

  if (args.json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const rows = (payload.siteEntry || []).map((site) => ({
    siteUrl: site.siteUrl,
    permissionLevel: site.permissionLevel,
  }));

  console.log(renderRows(rows, ["siteUrl", "permissionLevel"]));
}

async function listSitemaps(args) {
  const payload = await googleRequest(args, webmastersUrl(args.property, "/sitemaps"));

  if (args.json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const rows = (payload.sitemap || []).map((sitemap) => ({
    path: sitemap.path,
    submitted: sitemap.lastSubmitted || "",
    downloaded: sitemap.lastDownloaded || "",
    warnings: sitemap.warnings || 0,
    errors: sitemap.errors || 0,
    contents: (sitemap.contents || [])
      .map((content) => `${content.type}:${content.submitted || 0}/${content.indexed || 0}`)
      .join(", "),
  }));

  console.log(rows.length ? renderRows(rows, ["path", "submitted", "downloaded", "warnings", "errors", "contents"]) : "No sitemaps found.");
}

async function deleteSitemap(args) {
  const sitemapUrl = args.sitemapUrl || args.sitemap || args._[1];

  if (!sitemapUrl) {
    throw new Error("Usage: npm run seo:gsc:api -- delete-sitemap --sitemap-url=https://example.com/sitemap.xml");
  }

  await googleRequest(args, webmastersUrl(args.property, `/sitemaps/${encodeURIComponent(sitemapUrl)}`), {
    method: "DELETE",
  });

  console.log(`Deleted sitemap from ${args.property}: ${sitemapUrl}`);
}

async function performance(args) {
  const endDate = args.endDate || today();
  const startDate = args.startDate || daysAgo(args.days);
  const dimensions = (args.dimensions || "query,page").split(",").filter(Boolean);
  const payload = await googleRequest(args, webmastersUrl(args.property, "/searchAnalytics/query"), {
    method: "POST",
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions,
      rowLimit: Number.isFinite(args.limit) && args.limit > 0 ? args.limit : 25,
      searchType: args.searchType || "web",
    }),
  });

  if (args.json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const rows = (payload.rows || []).map((row) => {
    const record = {
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: `${(row.ctr * 100).toFixed(1)}%`,
      position: row.position.toFixed(1),
    };

    dimensions.forEach((dimension, index) => {
      record[dimension] = row.keys?.[index] || "";
    });

    return record;
  });

  console.log(`Search Analytics for ${args.property}: ${startDate} to ${endDate}`);
  console.log(rows.length ? renderRows(rows, [...dimensions, "clicks", "impressions", "ctr", "position"]) : "No rows returned.");
}

async function inspectUrl(args, url) {
  return googleRequest(args, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    body: JSON.stringify({
      inspectionUrl: url,
      siteUrl: args.property,
    }),
  });
}

function summarizeInspection(url, payload) {
  const result = payload.inspectionResult || {};
  const index = result.indexStatusResult || {};
  const mobile = result.mobileUsabilityResult || {};
  const rich = result.richResultsResult || {};

  return {
    url,
    verdict: index.verdict || "",
    coverageState: index.coverageState || "",
    robotsTxtState: index.robotsTxtState || "",
    indexingState: index.indexingState || "",
    pageFetchState: index.pageFetchState || "",
    lastCrawlTime: index.lastCrawlTime || "",
    userCanonical: index.userCanonical || "",
    googleCanonical: index.googleCanonical || "",
    mobileUsability: mobile.verdict || "",
    richResults: rich.verdict || "",
  };
}

async function inspect(args) {
  const url = args.url || args._[1];

  if (!url) {
    throw new Error("Usage: npm run seo:gsc:inspect -- --url=https://maksimivanov.com/path/");
  }

  const payload = await inspectUrl(args, url);

  if (args.json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const summary = summarizeInspection(url, payload);
  console.log(renderRows([summary], Object.keys(summary)));
}

function parseSitemap(source) {
  const urls = [];
  const locPattern = /<loc>\s*([^<]+?)\s*<\/loc>/g;
  let match;

  while ((match = locPattern.exec(source))) {
    urls.push(match[1].trim());
  }

  return urls;
}

async function readSitemap(args) {
  if (/^https?:\/\//.test(args.sitemap)) {
    const response = await fetch(args.sitemap);

    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap ${args.sitemap}: ${response.status} ${response.statusText}`);
    }

    return response.text();
  }

  return fs.readFileSync(path.resolve(args.sitemap), "utf8");
}

function robotsGroups(source) {
  const groups = [];
  let current = null;

  source.split(/\r?\n/).forEach((line) => {
    const cleaned = line.split("#")[0].trim();

    if (!cleaned) {
      return;
    }

    const separator = cleaned.indexOf(":");
    if (separator === -1) {
      return;
    }

    const field = cleaned.slice(0, separator).trim().toLowerCase();
    const value = cleaned.slice(separator + 1).trim();

    if (field === "user-agent") {
      current = { agents: [value.toLowerCase()], rules: [] };
      groups.push(current);
      return;
    }

    if (!current) {
      return;
    }

    if (field === "disallow" || field === "allow") {
      current.rules.push({ field, value });
    }
  });

  return groups;
}

function robotsRuleToRegex(rule) {
  const escaped = rule
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*")
    .replace(/\\\$/g, "$");
  return new RegExp(`^${escaped}`);
}

function isRobotsBlocked(url, robotsSource) {
  if (!robotsSource) {
    return false;
  }

  const { pathname, search } = new URL(url);
  const target = `${pathname}${search}`;
  const matchingGroups = robotsGroups(robotsSource).filter((group) =>
    group.agents.some((agent) => agent === "*" || agent === "googlebot")
  );
  const matchingRules = matchingGroups
    .flatMap((group) => group.rules)
    .filter((rule) => rule.value && robotsRuleToRegex(rule.value).test(target))
    .sort((a, b) => b.value.length - a.value.length);

  return matchingRules[0]?.field === "disallow";
}

async function fetchRobots(siteUrl) {
  const origin = new URL(siteUrl).origin;

  try {
    const response = await fetch(`${origin}/robots.txt`);
    return response.ok ? response.text() : "";
  } catch {
    return "";
  }
}

function findMetaRobots(html) {
  const match = html.match(/<meta\s+[^>]*name=["']robots["'][^>]*>/i);

  if (!match) {
    return "";
  }

  const content = match[0].match(/content=["']([^"']+)["']/i);
  return content?.[1] || "";
}

function looksSoft404(status, html) {
  if (status !== 200) {
    return false;
  }

  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || "";
  const normalized = `${title}\n${html.slice(0, 2500)}`.toLowerCase();

  return (
    normalized.includes("404") ||
    normalized.includes("not found") ||
    normalized.includes("page not found") ||
    html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length < 250
  );
}

async function fetchUrlStatus(url, robotsSource) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; CodexSeoAudit/1.0)",
      },
    });
    const contentType = response.headers.get("content-type") || "";
    const xRobotsTag = response.headers.get("x-robots-tag") || "";
    const html = contentType.includes("text/html") ? await response.text() : "";
    const metaRobots = html ? findMetaRobots(html) : "";

    return {
      url,
      status: response.status,
      redirectedTo: response.headers.get("location") || "",
      robotsBlocked: isRobotsBlocked(url, robotsSource),
      noindex: /noindex/i.test(`${xRobotsTag} ${metaRobots}`),
      xRobotsTag,
      metaRobots,
      soft404Hint: looksSoft404(response.status, html),
      contentType,
      error: "",
    };
  } catch (error) {
    return {
      url,
      status: "ERR",
      redirectedTo: "",
      robotsBlocked: isRobotsBlocked(url, robotsSource),
      noindex: false,
      xRobotsTag: "",
      metaRobots: "",
      soft404Hint: false,
      contentType: "",
      error: error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function mapLimit(items, limit, mapper) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function classifyAuditRow(row) {
  if (row.status === "ERR") return "fetch-error";
  if (Number(row.status) >= 500) return "server-error";
  if (Number(row.status) === 403) return "forbidden";
  if (row.robotsBlocked) return "robots-blocked";
  if (row.noindex) return "noindex";
  if (row.soft404Hint) return "soft-404-hint";
  if (Number(row.status) >= 300 && Number(row.status) < 400) return "redirect";
  if (Number(row.status) >= 400) return "client-error";
  return "ok";
}

function countBy(rows, keyFn) {
  return rows.reduce((counts, row) => {
    const key = keyFn(row);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function isInspectionIssue(row) {
  return (
    row.verdict !== "PASS" ||
    row.robotsTxtState === "DISALLOWED" ||
    (row.pageFetchState && row.pageFetchState !== "SUCCESSFUL") ||
    /blocked|not found|unknown|error/i.test(row.coverageState)
  );
}

async function audit(args) {
  const sitemapSource = await readSitemap(args);
  const urls = parseSitemap(sitemapSource);
  const robotsSource = await fetchRobots(args.siteUrl);
  const limitedUrls = Number.isFinite(args.limit) && args.limit > 0 ? urls.slice(0, args.limit) : urls;
  const liveRows = await mapLimit(limitedUrls, 8, async (url) => {
    const row = await fetchUrlStatus(url, robotsSource);
    return {
      ...row,
      issue: classifyAuditRow(row),
    };
  });

  const inspectedRows =
    args.inspectLimit > 0
      ? await mapLimit(limitedUrls.slice(0, args.inspectLimit), 2, async (url) => {
          try {
            const payload = await inspectUrl(args, url);
            return summarizeInspection(url, payload);
          } catch (error) {
            return {
              url,
              verdict: "ERROR",
              coverageState: error.message,
              robotsTxtState: "",
              indexingState: "",
              pageFetchState: "",
              lastCrawlTime: "",
              userCanonical: "",
              googleCanonical: "",
              mobileUsability: "",
              richResults: "",
            };
          }
        })
      : [];

  const report = {
    property: args.property,
    sitemap: args.sitemap,
    checkedUrls: liveRows.length,
    issueCounts: countBy(liveRows, (row) => row.issue),
    inspectionCounts: countBy(inspectedRows, (row) => `${row.verdict || "unspecified"} | ${row.coverageState || "unspecified"}`),
    liveRows,
    inspectedRows,
  };

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`Sitemap audit for ${args.property}`);
  console.log(`Checked ${report.checkedUrls} URLs from ${args.sitemap}`);
  console.log("");
  console.log(renderRows(Object.entries(report.issueCounts).map(([issue, count]) => ({ issue, count })), ["issue", "count"]));

  const problemRows = liveRows.filter((row) => row.issue !== "ok");
  console.log("");
  console.log("Live crawl issues");
  console.log(
    problemRows.length
      ? renderRows(
          problemRows.map((row) => ({
            issue: row.issue,
            status: row.status,
            url: row.url,
            redirectedTo: row.redirectedTo,
            error: row.error,
          })),
          ["issue", "status", "url", "redirectedTo", "error"]
        )
      : "No live crawl issues found in checked sitemap URLs."
  );

  if (inspectedRows.length) {
    const inspectionIssues = inspectedRows.filter(isInspectionIssue).slice(0, args.issueLimit);

    console.log("");
    console.log("URL Inspection summary");
    console.log(
      renderRows(
        Object.entries(report.inspectionCounts).map(([state, count]) => ({ state, count })),
        ["state", "count"]
      )
    );

    console.log("");
    console.log("URL Inspection issues");
    console.log(
      inspectionIssues.length
        ? renderRows(inspectionIssues, ["url", "verdict", "coverageState", "robotsTxtState", "indexingState", "pageFetchState"])
        : "No URL Inspection issues found in inspected URLs."
    );
  }
}

function usage() {
  console.log(`Usage:
  node scripts/search-console-api.js auth
  node scripts/search-console-api.js sites
  node scripts/search-console-api.js sitemaps --property=${DEFAULT_PROPERTY}
  node scripts/search-console-api.js delete-sitemap --property=${DEFAULT_PROPERTY} --sitemap-url=${DEFAULT_SITE_URL}/sitemap.xml
  node scripts/search-console-api.js performance --property=${DEFAULT_PROPERTY} --days=90 --limit=25
  node scripts/search-console-api.js inspect --property=${DEFAULT_PROPERTY} --url=${DEFAULT_SITE_URL}/
  node scripts/search-console-api.js audit --property=${DEFAULT_PROPERTY} --site-url=${DEFAULT_SITE_URL} --sitemap=public/sitemap.xml

Options:
  --property=VALUE       Search Console property, e.g. sc-domain:maksimivanov.com
  --site-url=URL         Canonical site URL used for robots.txt checks
  --client=PATH          OAuth desktop client JSON
  --token=PATH           Local token JSON
  --json                 Print JSON where supported
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];

  if (!command || command === "help" || command === "--help") {
    usage();
    return;
  }

  if (command === "auth") return authorize(args);
  if (command === "sites") return listSites(args);
  if (command === "sitemaps") return listSitemaps(args);
  if (command === "delete-sitemap") return deleteSitemap(args);
  if (command === "performance") return performance(args);
  if (command === "inspect") return inspect(args);
  if (command === "audit") return audit(args);

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
