#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { cleanUrl } = require("./analyze-social-content");

function parseArgs(argv) {
  const statsRoot = path.resolve(process.cwd(), "..", "stats-dashboard");
  const args = {
    statsRoot,
    analysisDir: "",
    postId: "",
    title: "",
    slug: "",
    category: "Programming",
    output: "",
  };

  argv.forEach((arg) => {
    if (arg.startsWith("--stats-root=")) {
      args.statsRoot = path.resolve(arg.split("=").slice(1).join("="));
      return;
    }

    if (arg.startsWith("--post-id=")) {
      args.postId = arg.split("=").slice(1).join("=");
      return;
    }

    if (arg.startsWith("--title=")) {
      args.title = arg.split("=").slice(1).join("=");
      return;
    }

    if (arg.startsWith("--slug=")) {
      args.slug = arg.split("=").slice(1).join("=");
      return;
    }

    if (arg.startsWith("--category=")) {
      args.category = arg.split("=").slice(1).join("=");
      return;
    }

    if (arg.startsWith("--output=")) {
      args.output = arg.split("=").slice(1).join("=");
      return;
    }

    if (!arg.startsWith("--") && !args.analysisDir && !args.postId) {
      args.analysisDir = path.resolve(arg);
    }
  });

  return args;
}

function sanitizeText(value) {
  return String(value || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return sanitizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

function readTextIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function findAnalysisDir(statsRoot, postId) {
  const root = path.join(statsRoot, "tmp", "post-analysis");

  if (!fs.existsSync(root)) {
    return "";
  }

  const normalized = postId.toLowerCase().replace(/[^a-z0-9]/g, "");
  const matches = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name))
    .filter((dirPath) =>
      path.basename(dirPath).toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalized)
    )
    .sort()
    .reverse();

  return matches[0] || "";
}

function extractMetadata(analysisDir) {
  const info = readJsonIfExists(path.join(analysisDir, "source.info.json"));
  const report = readTextIfExists(path.join(analysisDir, "report.md"));
  const transcript = readTextIfExists(path.join(analysisDir, "transcript.txt"));
  const title =
    sanitizeText(info.title) ||
    sanitizeText((report.match(/^# Post Analysis: (.+)$/m) || [])[1]) ||
    "Untitled social post";
  const sourceUrl = cleanUrl(info.webpage_url || "");
  const duration = info.duration ? `${Math.round(info.duration)} sec` : "";
  const publishedAt = info.timestamp
    ? new Date(info.timestamp * 1000).toISOString()
    : "";
  const platform = info.extractor_key || info.extractor || "";

  return {
    title,
    sourceUrl,
    duration,
    publishedAt,
    platform,
    transcript: sanitizeText(transcript),
    contactSheetPath: path.join(analysisDir, "contact-sheet.jpg"),
  };
}

function firstSentence(text) {
  const match = text.match(/^(.{40,220}?[.!?])\s/);
  return match ? match[1] : text.slice(0, 180);
}

function renderDraft(metadata, args) {
  const title = sanitizeText(args.title || metadata.title);
  const slug = args.slug || slugify(title);
  const imageName = outputImageName(args.output);
  const sourceLine = metadata.sourceUrl
    ? `[Watch the source video](${metadata.sourceUrl})`
    : "Source video: TODO";
  const intro = firstSentence(metadata.transcript);

  return `---
title: ${title}
date: ${new Date().toISOString()}
categories: ${args.category}
image: ${imageName}
---

${sourceLine}

Draft source: ${metadata.platform || "social video"}${
    metadata.duration ? `, ${metadata.duration}` : ""
  }${metadata.publishedAt ? `, published ${metadata.publishedAt.slice(0, 10)}` : ""}.

![Contact sheet from the source video](./${imageName})

## Direct Answer

${intro || "TODO: write a concise answer to the target search query."}

TODO: Rewrite this section so it answers the search intent directly. Do not publish the raw transcript.

## Why This Matters

TODO: Explain the problem the viewer had in the video and turn it into a durable article premise.

## Step 1

TODO: Convert the first practical beat from the transcript into a clear step.

## Step 2

TODO: Add an example, command, code snippet, checklist, or before/after comparison.

## Common Mistakes

- TODO: Add mistake 1.
- TODO: Add mistake 2.
- TODO: Add mistake 3.

## Exercise

TODO: Add one small action the reader can take immediately.

## Summary

TODO: Recap the article and link to one or two related posts.

<!--
Conversion notes:
- Slug suggestion: ${slug}
- Source transcript follows for editing context only. Remove before publishing.

${metadata.transcript}
-->
`;
}

function outputImageName(output) {
  if (!output) {
    return "contact-sheet.jpg";
  }

  const basename = path.basename(output);
  if (basename === "index.md") {
    return "contact-sheet.jpg";
  }

  return `${path.basename(basename, path.extname(basename))}-contact-sheet.jpg`;
}

function writeDraft(markdown, output, analysisDir) {
  const outputPath = path.resolve(output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, markdown);

  const contactSheet = path.join(analysisDir, "contact-sheet.jpg");
  const targetImage = path.join(path.dirname(outputPath), outputImageName(outputPath));

  if (fs.existsSync(contactSheet)) {
    fs.copyFileSync(contactSheet, targetImage);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const analysisDir = args.analysisDir || findAnalysisDir(args.statsRoot, args.postId);

  if (!analysisDir) {
    console.error(
      "Usage: node scripts/convert-social-analysis-to-post.js <analysis-dir> [--output=path] [--title=...] [--slug=...]"
    );
    console.error("Or: --post-id=<id> with --stats-root=<path>");
    process.exit(1);
  }

  const metadata = extractMetadata(analysisDir);
  const markdown = renderDraft(metadata, args);

  if (args.output) {
    writeDraft(markdown, args.output, analysisDir);
    console.log(`Wrote draft: ${path.resolve(args.output)}`);
    return;
  }

  console.log(markdown);
}

main();
