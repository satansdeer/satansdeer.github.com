#!/usr/bin/env node

const { spawnSync } = require("child_process");
const path = require("path");
const { buildReport, cleanUrl } = require("./analyze-social-content");

function parseArgs(argv) {
  const statsRoot = path.resolve(process.cwd(), "..", "stats-dashboard");
  const args = {
    statsRoot,
    platform: "all",
    limit: 5,
    minViews: 0,
    after: "2019-07-24",
    run: false,
    json: false,
  };

  argv.forEach((arg) => {
    if (arg === "--run") {
      args.run = true;
      return;
    }

    if (arg === "--json") {
      args.json = true;
      return;
    }

    if (arg.startsWith("--stats-root=")) {
      args.statsRoot = path.resolve(arg.split("=").slice(1).join("="));
      return;
    }

    if (arg.startsWith("--platform=")) {
      args.platform = arg.split("=")[1];
      return;
    }

    if (arg.startsWith("--limit=")) {
      args.limit = Number(arg.split("=")[1]);
      return;
    }

    if (arg.startsWith("--min-views=")) {
      args.minViews = Number(arg.split("=")[1]);
      return;
    }

    if (arg.startsWith("--after=")) {
      args.after = arg.split("=")[1];
    }
  });

  return args;
}

function platformMatches(post, platform) {
  return platform === "all" || post.platform === platform;
}

function makeArgsForPost(post) {
  const parts = [`--post-id ${post.id}`];

  if (post.platform === "youtube") {
    parts.push("--platform youtube");
  }

  return parts.join(" ");
}

function buildQueue(args) {
  const report = buildReport({
    posts: path.join(args.statsRoot, "data", "posts.json"),
    analysisDir: path.join(args.statsRoot, "tmp", "post-analysis"),
    successfulDir: path.join(args.statsRoot, "tmp", "successful-post"),
    after: args.after,
    minViews: args.minViews,
    limit: 200,
  });

  return report.candidates
    .filter((post) => !post.hasTranscript)
    .filter((post) => platformMatches(post, args.platform))
    .slice(0, args.limit)
    .map((post) => ({
      id: post.id,
      platform: post.platform,
      title: post.title,
      date: post.date,
      views: post.views,
      url: cleanUrl(post.url),
      command: `make analyze-post ARGS='${makeArgsForPost(post)}'`,
      makeArgs: makeArgsForPost(post),
    }));
}

function renderQueue(queue, statsRoot, run) {
  const lines = [
    "# Social Transcript Prep Queue",
    "",
    `Stats dashboard: ${statsRoot}`,
    `Mode: ${run ? "run" : "dry-run"}`,
    "",
  ];

  if (!queue.length) {
    lines.push("No matching posts need transcripts.");
    return `${lines.join("\n")}\n`;
  }

  queue.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.platform} ${item.id} - ${item.views.toLocaleString(
        "en-US"
      )} views`
    );
    lines.push(`   Title: ${item.title}`);
    lines.push(`   URL: ${item.url}`);
    lines.push(`   Command: ${item.command}`);
    lines.push("");
  });

  if (!run) {
    lines.push("Run with `--run` to execute the queue.");
  }

  return `${lines.join("\n")}\n`;
}

function runQueue(queue, statsRoot) {
  queue.forEach((item) => {
    const result = spawnSync("make", ["analyze-post", `ARGS=${item.makeArgs}`], {
      cwd: statsRoot,
      stdio: "inherit",
    });

    if (result.status !== 0) {
      process.exit(result.status || 1);
    }
  });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const queue = buildQueue(args);

  if (args.json) {
    console.log(JSON.stringify({ statsRoot: args.statsRoot, queue }, null, 2));
  } else {
    console.log(renderQueue(queue, args.statsRoot, args.run));
  }

  if (args.run && queue.length) {
    runQueue(queue, args.statsRoot);
  }
}

main();
