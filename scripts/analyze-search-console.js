#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DEFAULT_MIN_IMPRESSIONS = 25;

function parseArgs(argv) {
  const args = {
    file: null,
    json: false,
    minImpressions: DEFAULT_MIN_IMPRESSIONS,
  };

  argv.forEach((arg) => {
    if (arg === "--json") {
      args.json = true;
      return;
    }

    if (arg.startsWith("--min-impressions=")) {
      args.minImpressions = Number(arg.split("=")[1]);
      return;
    }

    if (!args.file) {
      args.file = arg;
    }
  });

  return args;
}

function parseCsv(source) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }

      row.push(field);
      field = "";

      if (row.some((value) => value.trim())) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    field += char;
  }

  row.push(field);

  if (row.some((value) => value.trim())) {
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(header) {
  return header.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findColumn(headers, candidates) {
  const normalized = headers.map(normalizeHeader);
  return candidates
    .map((candidate) => normalized.indexOf(candidate))
    .find((index) => index !== -1);
}

function parseNumber(value) {
  if (!value) {
    return 0;
  }

  const parsed = Number(String(value).replace(/[%,$\s]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseCtr(value) {
  if (!value) {
    return 0;
  }

  const raw = String(value).trim();
  const parsed = parseNumber(raw);
  return raw.includes("%") ? parsed / 100 : parsed;
}

function expectedCtr(position) {
  if (position <= 1.5) return 0.28;
  if (position <= 2.5) return 0.15;
  if (position <= 3.5) return 0.1;
  if (position <= 5) return 0.06;
  if (position <= 10) return 0.035;
  if (position <= 20) return 0.015;
  return 0.005;
}

function rowToRecord(row, columns) {
  const clicks = parseNumber(row[columns.clicks]);
  const impressions = parseNumber(row[columns.impressions]);
  const ctr = parseCtr(row[columns.ctr]);
  const position = parseNumber(row[columns.position]);
  const query = columns.query === -1 ? "" : row[columns.query]?.trim();
  const page = columns.page === -1 ? "" : row[columns.page]?.trim();

  return {
    query,
    page,
    clicks,
    impressions,
    ctr,
    position,
    expectedCtr: expectedCtr(position),
  };
}

function classify(records, minImpressions) {
  const eligible = records.filter((record) => record.impressions >= minImpressions);

  const withOpportunity = eligible.map((record) => ({
    ...record,
    ctrGap: Math.max(0, record.expectedCtr - record.ctr),
    estimatedMissedClicks: Math.max(
      0,
      Math.round(record.impressions * (record.expectedCtr - record.ctr))
    ),
  }));

  const quickWins = withOpportunity
    .filter((record) => record.position > 5 && record.position <= 20)
    .sort((a, b) => b.impressions / b.position - a.impressions / a.position)
    .slice(0, 25);

  const ctrGaps = withOpportunity
    .filter((record) => record.position <= 10 && record.estimatedMissedClicks > 0)
    .sort((a, b) => b.estimatedMissedClicks - a.estimatedMissedClicks)
    .slice(0, 25);

  const contentGaps = withOpportunity
    .filter((record) => record.position > 20 && record.position <= 60)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25);

  const defend = withOpportunity
    .filter((record) => record.position <= 5)
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 25);

  const pageGroups = new Map();

  withOpportunity.forEach((record) => {
    const key = record.page || "(no page column)";
    const current = pageGroups.get(key) || {
      page: key,
      clicks: 0,
      impressions: 0,
      queryCount: 0,
      weightedPositionTotal: 0,
    };

    current.clicks += record.clicks;
    current.impressions += record.impressions;
    current.queryCount += record.query ? 1 : 0;
    current.weightedPositionTotal += record.position * record.impressions;
    pageGroups.set(key, current);
  });

  const expansionCandidates = Array.from(pageGroups.values())
    .map((group) => ({
      ...group,
      avgPosition: group.impressions
        ? group.weightedPositionTotal / group.impressions
        : 0,
    }))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);

  return {
    defend,
    quickWins,
    ctrGaps,
    contentGaps,
    expansionCandidates,
  };
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatRecord(record) {
  const parts = [
    record.query ? `query: "${record.query}"` : null,
    record.page ? `page: ${record.page}` : null,
    `clicks: ${record.clicks}`,
    `impressions: ${record.impressions}`,
    `CTR: ${formatPercent(record.ctr)}`,
    `position: ${record.position.toFixed(1)}`,
  ].filter(Boolean);

  if (record.estimatedMissedClicks) {
    parts.push(`est. missed clicks: ${record.estimatedMissedClicks}`);
  }

  return `- ${parts.join(" | ")}`;
}

function renderMarkdown(report, metadata) {
  const sections = [
    ["Defend", report.defend],
    ["Quick Wins", report.quickWins],
    ["CTR Gaps", report.ctrGaps],
    ["Content Gaps", report.contentGaps],
  ];

  const lines = [
    "# Search Console Opportunity Report",
    "",
    `Source: ${metadata.file}`,
    `Rows analyzed: ${metadata.rows}`,
    `Minimum impressions: ${metadata.minImpressions}`,
    "",
  ];

  sections.forEach(([title, rows]) => {
    lines.push(`## ${title}`, "");
    lines.push(...(rows.length ? rows.map(formatRecord) : ["- No matching rows."]));
    lines.push("");
  });

  lines.push("## Expansion Candidates", "");
  report.expansionCandidates.forEach((page) => {
    lines.push(
      `- page: ${page.page} | queries: ${page.queryCount} | clicks: ${page.clicks} | impressions: ${page.impressions} | avg position: ${page.avgPosition.toFixed(1)}`
    );
  });

  if (!report.expansionCandidates.length) {
    lines.push("- No matching rows.");
  }

  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.file) {
    console.error(
      "Usage: node scripts/analyze-search-console.js <gsc-export.csv> [--min-impressions=25] [--json]"
    );
    process.exit(1);
  }

  const filePath = path.resolve(args.file);
  const rows = parseCsv(fs.readFileSync(filePath, "utf8"));
  const headers = rows.shift() || [];

  const columns = {
    query: findColumn(headers, ["query", "queries", "topqueries"]) ?? -1,
    page: findColumn(headers, ["page", "pages", "url"]) ?? -1,
    clicks: findColumn(headers, ["clicks"]),
    impressions: findColumn(headers, ["impressions"]),
    ctr: findColumn(headers, ["ctr"]),
    position: findColumn(headers, ["position", "avgposition", "averageposition"]),
  };

  const missingColumns = Object.entries(columns)
    .filter(([name, index]) => !["query", "page"].includes(name) && index === undefined)
    .map(([name]) => name);

  if (missingColumns.length) {
    console.error(`Missing required columns: ${missingColumns.join(", ")}`);
    process.exit(1);
  }

  const records = rows.map((row) => rowToRecord(row, columns));
  const report = classify(records, args.minImpressions);
  const metadata = {
    file: filePath,
    minImpressions: args.minImpressions,
    rows: records.length,
  };

  if (args.json) {
    console.log(JSON.stringify({ metadata, report }, null, 2));
    return;
  }

  console.log(renderMarkdown(report, metadata));
}

main();
