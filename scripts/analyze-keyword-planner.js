#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DEFAULT_MIN_SEARCHES = 10;
const DEFAULT_LIMIT = 40;

function parseArgs(argv) {
  const args = {
    file: null,
    json: false,
    minSearches: DEFAULT_MIN_SEARCHES,
    limit: DEFAULT_LIMIT,
  };

  argv.forEach((arg) => {
    if (arg === "--json") {
      args.json = true;
      return;
    }

    if (arg.startsWith("--min-searches=")) {
      args.minSearches = Number(arg.split("=")[1]);
      return;
    }

    if (arg.startsWith("--limit=")) {
      args.limit = Number(arg.split("=")[1]);
      return;
    }

    if (!arg.startsWith("--") && !args.file) {
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
  return String(header || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function findColumn(headers, candidates) {
  const normalized = headers.map(normalizeHeader);
  return candidates
    .map((candidate) => normalized.indexOf(candidate))
    .find((index) => index !== -1);
}

function findHeaderRow(rows) {
  return rows.findIndex((row) => {
    const normalized = row.map(normalizeHeader);
    return (
      normalized.some((header) =>
        ["keyword", "keywordidea", "keywords"].includes(header)
      ) &&
      normalized.some((header) =>
        ["avgmonthlysearches", "averagemonthlysearches", "monthlysearches"].includes(
          header
        )
      )
    );
  });
}

function parseNumber(value) {
  if (!value) {
    return 0;
  }

  const parsed = Number(String(value).replace(/[%,$\s]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseSearchVolume(value) {
  const raw = String(value || "").trim().toLowerCase();

  if (!raw) {
    return 0;
  }

  if (raw.startsWith("<")) {
    return parseNumber(raw) / 2 || 5;
  }

  const parsePart = (part) => {
    const clean = part.trim().replace(/,/g, "");
    const multiplier = clean.endsWith("k") ? 1000 : clean.endsWith("m") ? 1000000 : 1;
    const parsed = Number(clean.replace(/[km]/g, ""));
    return Number.isFinite(parsed) ? parsed * multiplier : 0;
  };

  const range = raw.replace(/\u2013/g, "-").split(/\s*-\s*/);
  if (range.length === 2) {
    return (parsePart(range[0]) + parsePart(range[1])) / 2;
  }

  return parsePart(raw) || parseNumber(raw);
}

function parseCompetition(value) {
  const raw = String(value || "").trim().toLowerCase();

  if (raw === "low") return 1;
  if (raw === "medium") return 2;
  if (raw === "high") return 3;
  return parseNumber(raw);
}

const CLUSTERS = [
  {
    name: "Git and GitHub",
    patterns: [
      /\bgit\b/i,
      /\bgithub\b/i,
      /\bcommit\b/i,
      /\bbranch\b/i,
      /\bmerge\b/i,
      /\brebase\b/i,
      /\bstash\b/i,
      /\bpull request\b/i,
    ],
  },
  {
    name: "AI coding workflow",
    patterns: [
      /\bclaude\b/i,
      /\bcodex\b/i,
      /\bcursor\b/i,
      /\bvibe coding\b/i,
      /\bvibe code\b/i,
      /\bai coding\b/i,
      /\bllm\b/i,
      /\bcode agent\b/i,
    ],
  },
  {
    name: "Video tooling",
    patterns: [
      /\bvideo editor\b/i,
      /\bvideo editing\b/i,
      /\bsubtitles?\b/i,
      /\bcaptions?\b/i,
      /\bscreen recorder\b/i,
      /\bremotion\b/i,
      /\bffmpeg\b/i,
    ],
  },
  {
    name: "JavaScript and React",
    patterns: [
      /\bjavascript\b/i,
      /\breact\b/i,
      /\btypescript\b/i,
      /\bnode\b/i,
      /\bpromise\b/i,
      /\basync\b/i,
      /\barray\b/i,
      /\bforeach\b/i,
    ],
  },
  {
    name: "Learn programming",
    patterns: [
      /\blearn to code\b/i,
      /\blearn programming\b/i,
      /\bprogramming\b/i,
      /\bcoding\b/i,
      /\bdeveloper\b/i,
    ],
  },
];

function classifyCluster(keyword) {
  const match = CLUSTERS.find((cluster) =>
    cluster.patterns.some((pattern) => pattern.test(keyword))
  );

  return match ? match.name : "General developer content";
}

function intentScore(keyword) {
  const tutorialIntent = /\b(how to|tutorial|guide|example|for beginners|explained)\b/i.test(
    keyword
  );
  const comparisonIntent = /\b(vs|versus|difference|compare|alternative)\b/i.test(
    keyword
  );
  const problemIntent = /\b(error|fix|debug|not working|issue|problem)\b/i.test(keyword);
  const exerciseIntent = /\b(exercise|practice|challenge)\b/i.test(keyword);

  return [tutorialIntent, comparisonIntent, problemIntent, exerciseIntent].filter(Boolean)
    .length;
}

function rowToRecord(row, columns) {
  const keyword = row[columns.keyword]?.trim() || "";
  const avgMonthlySearches = parseSearchVolume(row[columns.avgMonthlySearches]);
  const competition =
    columns.competition === undefined ? 0 : parseCompetition(row[columns.competition]);
  const competitionIndex =
    columns.competitionIndex === undefined
      ? 0
      : parseNumber(row[columns.competitionIndex]);
  const topBidLow =
    columns.topBidLow === undefined ? 0 : parseNumber(row[columns.topBidLow]);
  const topBidHigh =
    columns.topBidHigh === undefined ? 0 : parseNumber(row[columns.topBidHigh]);
  const threeMonthChange =
    columns.threeMonthChange === undefined ? 0 : parseNumber(row[columns.threeMonthChange]);
  const cluster = classifyCluster(keyword);
  const intent = intentScore(keyword);
  const lowCompetitionBoost =
    competition === 1 || (competitionIndex > 0 && competitionIndex <= 35) ? 20 : 0;
  const bidSignal = Math.min(20, topBidHigh || topBidLow);
  const growthSignal = Math.max(-10, Math.min(20, threeMonthChange / 10));
  const score =
    Math.log10(avgMonthlySearches + 10) * 20 +
    lowCompetitionBoost +
    bidSignal +
    growthSignal +
    intent * 15;

  return {
    keyword,
    avgMonthlySearches,
    competition,
    competitionIndex,
    topBidLow,
    topBidHigh,
    threeMonthChange,
    cluster,
    intent,
    score,
  };
}

function buildReport(filePath, minSearches, limit) {
  const rows = parseCsv(fs.readFileSync(filePath, "utf8"));
  const headerIndex = findHeaderRow(rows);

  if (headerIndex === -1) {
    throw new Error("Could not find Keyword Planner header row.");
  }

  const headers = rows[headerIndex];
  const dataRows = rows.slice(headerIndex + 1);
  const columns = {
    keyword: findColumn(headers, ["keyword", "keywordidea", "keywords"]),
    avgMonthlySearches: findColumn(headers, [
      "avgmonthlysearches",
      "averagemonthlysearches",
      "monthlysearches",
    ]),
    competition: findColumn(headers, ["competition"]),
    competitionIndex: findColumn(headers, ["competitionindexedvalue", "competitionindex"]),
    topBidLow: findColumn(headers, [
      "topofpagebidlowrange",
      "lowtopofpagebid",
      "topofpagebidlow",
    ]),
    topBidHigh: findColumn(headers, [
      "topofpagebidhighrange",
      "hightopofpagebid",
      "topofpagebidhigh",
    ]),
    threeMonthChange: findColumn(headers, ["threemonthchange", "3monthchange"]),
  };

  if (columns.keyword === undefined || columns.avgMonthlySearches === undefined) {
    throw new Error("Keyword Planner CSV must include keyword and search volume columns.");
  }

  const records = dataRows
    .map((row) => rowToRecord(row, columns))
    .filter((record) => record.keyword && record.avgMonthlySearches >= minSearches)
    .sort((a, b) => b.score - a.score || b.avgMonthlySearches - a.avgMonthlySearches);
  const clusters = new Map();

  records.forEach((record) => {
    const current = clusters.get(record.cluster) || {
      name: record.cluster,
      keywords: 0,
      searchVolume: 0,
      topKeywords: [],
    };
    current.keywords += 1;
    current.searchVolume += record.avgMonthlySearches;
    if (current.topKeywords.length < 5) {
      current.topKeywords.push(record.keyword);
    }
    clusters.set(record.cluster, current);
  });

  return {
    metadata: {
      file: filePath,
      rows: records.length,
      minSearches,
    },
    priorities: records.slice(0, limit),
    clusters: Array.from(clusters.values()).sort(
      (a, b) => b.searchVolume - a.searchVolume
    ),
  };
}

function formatNumber(value) {
  return Math.round(value).toLocaleString("en-US");
}

function formatMoney(value) {
  return value ? `$${value.toFixed(2)}` : "";
}

function competitionLabel(value) {
  if (value === 1) return "low";
  if (value === 2) return "medium";
  if (value === 3) return "high";
  return value ? String(value) : "";
}

function escapeCell(value) {
  return String(value || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function renderMarkdown(report) {
  const lines = [
    "# Keyword Planner Opportunity Report",
    "",
    `Source: ${report.metadata.file}`,
    `Rows analyzed: ${report.metadata.rows}`,
    `Minimum monthly searches: ${report.metadata.minSearches}`,
    "",
    "## Cluster Summary",
    "",
    "| Cluster | Keywords | Search volume | Top examples |",
    "| --- | ---: | ---: | --- |",
  ];

  report.clusters.forEach((cluster) => {
    lines.push(
      `| ${[
        escapeCell(cluster.name),
        cluster.keywords,
        formatNumber(cluster.searchVolume),
        escapeCell(cluster.topKeywords.join(", ")),
      ].join(" | ")} |`
    );
  });

  lines.push(
    "",
    "## Priority Keywords",
    "",
    "| # | Keyword | Cluster | Monthly searches | Competition | Top bid | Intent score |",
    "| ---: | --- | --- | ---: | --- | ---: | ---: |"
  );

  report.priorities.forEach((record, index) => {
    lines.push(
      `| ${[
        index + 1,
        escapeCell(record.keyword),
        escapeCell(record.cluster),
        formatNumber(record.avgMonthlySearches),
        competitionLabel(record.competitionIndex || record.competition),
        formatMoney(record.topBidHigh || record.topBidLow),
        record.intent,
      ].join(" | ")} |`
    );
  });

  lines.push(
    "",
    "## How To Use This",
    "",
    "- Pick keywords where the cluster matches existing authority: Git, JavaScript, React, AI coding, and video tooling.",
    "- Prefer tutorial, comparison, debugging, and exercise intent because those map cleanly to standalone articles.",
    "- Cross-check the keyword against `npm run seo:social` before choosing a video-derived post.",
    "- Treat broad high-volume keywords as cluster names, not single-post targets."
  );

  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.file) {
    console.error(
      "Usage: node scripts/analyze-keyword-planner.js <keyword-planner-export.csv> [--min-searches=10] [--limit=40] [--json]"
    );
    process.exit(1);
  }

  try {
    const report = buildReport(path.resolve(args.file), args.minSearches, args.limit);
    if (args.json) {
      console.log(JSON.stringify(report, null, 2));
      return;
    }
    console.log(renderMarkdown(report));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
