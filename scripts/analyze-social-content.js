#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DEFAULT_AFTER = "2019-07-24";
const DEFAULT_LIMIT = 25;
const YOUTUBE_REGULAR_VIDEO_MIN_SECONDS = 61;
const YOUTUBE_SHORT_MAX_SECONDS = 180;
const PUBLISHED_SOURCE_MAP = {
  "7631569099822320918": "/posts/claude-code-architecture/",
  "7631897804771757334": "/posts/map-ai-generated-codebase-architecture/",
  "7631927253911309590": "/posts/map-ai-generated-codebase-architecture/",
  "7634553095103581462": "/posts/stop-storing-secret-keys-in-env-files/",
  "2TioQir4Pr8": "/posts/map-ai-generated-codebase-architecture/",
  bZwOlUq7JDM: "/posts/stop-storing-secret-keys-in-env-files/",
  Cw_JrTcRtpg: "/posts/make-your-first-video-in-mont/",
  D2QbCZRrBbU: "/posts/mont-slides-and-video-timeline/",
  EKGyk1Q0Dbo: "/posts/record-screen-in-mont/",
  eZh03k61wQM: "/posts/mont-slides-and-video-timeline/",
  GQ1_QaOjsWg: "/posts/record-presentation-voiceover-from-pdf/",
  Gze_w1iFRDA: "/posts/mont-slides-and-video-timeline/",
  mNfEigGQ35o: "/posts/localize-your-app-without-translation-keys/",
  CMj1p0saSX8: "/posts/build-it-and-they-will-not-come/",
  THqqfIFoumM: "/posts/use-subagents-to-keep-ai-context-clean/",
  tjakK9Nj4bA: "/posts/build-it-and-they-will-not-come/",
  ufdMQ142PxA: "/posts/record-saas-demo-video-from-screenshots/",
  yltyunpWyhg: "/posts/mont-slides-and-video-timeline/",
  "9vMjt-6ow8s": "/posts/architecture-literacy-for-vibe-coders/",
};

function parseArgs(argv) {
  const statsRoot = path.resolve(process.cwd(), "..", "stats-dashboard");
  const args = {
    posts: path.join(statsRoot, "data", "posts.json"),
    analysisDir: path.join(statsRoot, "tmp", "post-analysis"),
    successfulDir: path.join(statsRoot, "tmp", "successful-post"),
    after: DEFAULT_AFTER,
    limit: DEFAULT_LIMIT,
    minViews: 0,
    json: false,
    output: null,
  };

  argv.forEach((arg) => {
    if (arg === "--json") {
      args.json = true;
      return;
    }

    if (arg.startsWith("--posts=")) {
      args.posts = arg.split("=").slice(1).join("=");
      return;
    }

    if (arg.startsWith("--analysis-dir=")) {
      args.analysisDir = arg.split("=").slice(1).join("=");
      return;
    }

    if (arg.startsWith("--successful-dir=")) {
      args.successfulDir = arg.split("=").slice(1).join("=");
      return;
    }

    if (arg.startsWith("--after=")) {
      args.after = arg.split("=")[1];
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

    if (arg.startsWith("--output=")) {
      args.output = arg.split("=").slice(1).join("=");
      return;
    }

    if (!arg.startsWith("--")) {
      args.posts = arg;
    }
  });

  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readTextIfExists(filePath, maxLength = 4000) {
  if (!filePath || !fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(filePath, "utf8").slice(0, maxLength);
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value) {
  return Math.round(value).toLocaleString("en-US");
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function normalizePost(post) {
  const sourceVideoId = post.source?.video_id || extractExternalId(post.url) || "";
  const views = number(post.views);
  const likes = number(post.likes);
  const comments = number(post.comments);
  const durationSeconds = number(post.durationSeconds);

  return {
    id: post.id || sourceVideoId,
    externalId: sourceVideoId,
    title: post.title || `${post.platform || "social"} post ${sourceVideoId}`,
    platform: post.platform || "unknown",
    views,
    likes,
    comments,
    durationSeconds,
    isShortForm: Boolean(post.isShortForm),
    engagementRate: views ? (likes + comments) / views : 0,
    publishedAt: post.publishedAt || "",
    date: post.publishedAt ? post.publishedAt.slice(0, 10) : "",
    url: post.url || "",
    source: post.source || {},
  };
}

function artifactForPost(post, artifacts) {
  return (
    artifacts.get(normalizeKey(post.id)) ||
    artifacts.get(normalizeKey(post.externalId)) ||
    {}
  );
}

function isLikelyDailyYouTubeShort(post) {
  return (
    post.platform === "youtube" &&
    post.durationSeconds > 0 &&
    post.durationSeconds <= YOUTUBE_SHORT_MAX_SECONDS &&
    (/^day \d+\b/i.test(post.title) || /^\d{1,2} [a-z]+ \d{4}$/i.test(post.title))
  );
}

function isVerticalYouTubeShort(post, artifact) {
  const sourceInfo = artifact?.sourceInfo || {};
  const width = number(sourceInfo.width);
  const height = number(sourceInfo.height);
  const durationSeconds = number(sourceInfo.durationSeconds || post.durationSeconds);

  return (
    post.platform === "youtube" &&
    width > 0 &&
    height > width &&
    durationSeconds > 0 &&
    durationSeconds <= YOUTUBE_SHORT_MAX_SECONDS
  );
}

function isIgnoredYouTubeShort(post, artifact = {}) {
  return (
    post.platform === "youtube" &&
    (post.isShortForm ||
      (post.durationSeconds > 0 && post.durationSeconds < YOUTUBE_REGULAR_VIDEO_MIN_SECONDS) ||
      isVerticalYouTubeShort(post, artifact) ||
      isLikelyDailyYouTubeShort(post))
  );
}

function extractExternalId(url) {
  if (!url) {
    return "";
  }

  const tiktokMatch = url.match(/\/video\/([0-9]+)/);
  if (tiktokMatch) {
    return tiktokMatch[1];
  }

  const youtubeMatch = url.match(/[?&]v=([^&]+)/);
  if (youtubeMatch) {
    return youtubeMatch[1];
  }

  const shortYoutubeMatch = url.match(/youtu\.be\/([^?]+)/);
  return shortYoutubeMatch ? shortYoutubeMatch[1] : "";
}

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function addArtifact(artifacts, keys, artifact) {
  keys
    .map(normalizeKey)
    .filter(Boolean)
    .forEach((key) => {
      const current = artifacts.get(key) || {};
      artifacts.set(key, { ...current, ...artifact });
    });
}

function readInfoKeys(infoPath) {
  if (!fs.existsSync(infoPath)) {
    return [];
  }

  try {
    const info = readJson(infoPath);
    return [
      info.id,
      info.display_id,
      info.webpage_url_basename,
      extractExternalId(info.webpage_url),
    ].filter(Boolean);
  } catch {
    return [];
  }
}

function readSourceInfo(infoPath) {
  if (!fs.existsSync(infoPath)) {
    return {};
  }

  try {
    const info = readJson(infoPath);
    return {
      durationSeconds: number(info.duration),
      width: number(info.width),
      height: number(info.height),
      aspectRatio: number(info.aspect_ratio),
    };
  } catch {
    return {};
  }
}

function scanAnalysisArtifacts(analysisDir, successfulDir) {
  const artifacts = new Map();

  if (fs.existsSync(analysisDir)) {
    fs.readdirSync(analysisDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => {
        const dirPath = path.join(analysisDir, entry.name);
        const transcriptPath = path.join(dirPath, "transcript.txt");
        const reportPath = path.join(dirPath, "report.md");
        const infoPath = path.join(dirPath, "source.info.json");
        const numericIds = entry.name.match(/[0-9]{8,}/g) || [];
        const keys = [
          entry.name,
          ...numericIds,
          ...readInfoKeys(infoPath),
        ];

        addArtifact(artifacts, keys, {
          analysisPath: dirPath,
          transcriptPath: fs.existsSync(transcriptPath) ? transcriptPath : "",
          reportPath: fs.existsSync(reportPath) ? reportPath : "",
          sourceInfo: readSourceInfo(infoPath),
        });
      });
  }

  if (fs.existsSync(successfulDir)) {
    const correctedTranscript = path.join(successfulDir, "day38-corrected-transcript.md");
    const rawTranscript = path.join(successfulDir, "day38-transcript.txt");
    const infoPath = path.join(successfulDir, "day38.info.json");
    const keys = readInfoKeys(infoPath);

    if (keys.length) {
      addArtifact(artifacts, keys, {
        analysisPath: successfulDir,
        transcriptPath: fs.existsSync(correctedTranscript)
          ? correctedTranscript
          : rawTranscript,
        reportPath: "",
      });
    }
  }

  return artifacts;
}

const CLUSTERS = [
  {
    name: "Localization and i18n",
    patterns: [
      /\blocali[sz]ation\b/i,
      /\bi18n\b/i,
      /\btranslation keys?\b/i,
      /\btranslate\b/i,
      /\bgettext\b/i,
      /\bnon-english\b/i,
    ],
    keywordSeeds: [
      "app localization",
      "translation keys",
      "gettext javascript",
      "i18n best practices",
    ],
  },
  {
    name: "SaaS distribution",
    patterns: [
      /\bearly adopters?\b/i,
      /\bfirst users?\b/i,
      /\bget users?\b/i,
      /\buser acquisition\b/i,
      /\bdistribution\b/i,
      /\bbuild it\b/i,
      /\bthey will come\b/i,
    ],
    keywordSeeds: [
      "find first users for saas",
      "saas user acquisition",
      "how to get early adopters",
      "build it and they will come",
    ],
  },
  {
    name: "AI coding workflow",
    patterns: [
      /\bclaude\b/i,
      /\bcodex\b/i,
      /\bcursor (?:ai|editor|ide|agent)\b/i,
      /\bllm\b/i,
      /\bai[- ]?coding\b/i,
      /\bvibe code\b/i,
      /\bprompt\b/i,
      /\bagent\b/i,
    ],
    keywordSeeds: [
      "claude code architecture",
      "ai coding workflow",
      "vibe coding",
      "debug claude code",
    ],
  },
  {
    name: "Video tooling",
    patterns: [
      /\bvideo editor\b/i,
      /\bvideo editing\b/i,
      /\bmont\b/i,
      /\bsubtitles?\b/i,
      /\bcaptions?\b/i,
      /\bremotion\b/i,
      /\bffmpeg\b/i,
      /\bscreen recorder\b/i,
      /\bscreen recording\b/i,
      /\bdemo video\b/i,
      /\bapp demo\b/i,
      /\bproduct demo\b/i,
      /\bsaas demo\b/i,
      /\bcursor animation\b/i,
      /\bzoom effect\b/i,
    ],
    keywordSeeds: [
      "browser video editor",
      "generate video subtitles",
      "programmatic video editing",
      "remotion alternative",
      "record saas demo video",
    ],
  },
  {
    name: "Secrets and security",
    patterns: [
      /\bsecrets?\b/i,
      /\bsecret keys?\b/i,
      /\bapi keys?\b/i,
      /\bcredentials?\b/i,
      /\b\.env\b/i,
      /\benv file\b/i,
      /\bsecret manager\b/i,
      /\bsecurity\b/i,
    ],
    keywordSeeds: [
      "where to store api keys",
      "secret manager for developers",
      "env file secrets",
      "api key security",
    ],
  },
  {
    name: "Git and GitHub",
    patterns: [
      /\bgit\b/i,
      /\bgithub\b/i,
      /\bcommit\b/i,
      /\bbranch\b/i,
      /\bmerge\b/i,
      /\brebase\b/i,
      /\bpull request\b/i,
    ],
    keywordSeeds: [
      "git tutorial for beginners",
      "git commit explained",
      "resolve merge conflicts",
      "git command line exercises",
    ],
  },
  {
    name: "JavaScript and React",
    patterns: [
      /\bjavascript\b/i,
      /\btypescript\b/i,
      /\breact\b/i,
      /\bnode\b/i,
      /\bpromise\b/i,
      /\basync\b/i,
      /\barray\b/i,
      /\bforeach\b/i,
    ],
    keywordSeeds: [
      "javascript tutorial",
      "react tutorial",
      "typescript basics",
      "javascript array methods",
    ],
  },
  {
    name: "Learn programming",
    patterns: [
      /\blearn to code\b/i,
      /\blearning to code\b/i,
      /\bprogramming\b/i,
      /\bcoding\b/i,
      /\bcourse\b/i,
      /\bdeveloper\b/i,
    ],
    keywordSeeds: [
      "learn to code",
      "programming for beginners",
      "how to learn programming",
      "coding exercises",
    ],
  },
];

function classifyCluster(post, transcript) {
  const haystack = `${post.title}\n${transcript}`;
  const match = CLUSTERS.find((cluster) =>
    cluster.patterns.some((pattern) => pattern.test(haystack))
  );

  return match || {
    name: "General developer content",
    keywordSeeds: ["developer productivity", "software development"],
  };
}

function suggestAngle(post, transcript, cluster) {
  const text = `${post.title}\n${transcript}`;

  if (/not your architect|architecture|speed without architecture|debt/i.test(text)) {
    if (/architectural literacy|compact model|fits in your head|vibe coder/i.test(text)) {
      return "Build enough architecture literacy to move an AI-built app past the MVP";
    }
    return "How to use Claude Code without losing the architecture of your app";
  }

  if (/sub ?agents?|compaction|main context|long conversation|spawn a sub/i.test(text)) {
    return "Use subagents to keep long AI coding sessions clean and responsive";
  }

  if (/console\.log|debug logs?|stringify|debugging|prefix/i.test(text)) {
    return "A practical logging trick for debugging AI-generated front-end code";
  }

  if (/locali[sz]ation|i18n|translation keys?|gettext|non-english/i.test(text)) {
    return "Localize an app without inventing translation keys for every string";
  }

  if (/secrets?|secret keys?|api keys?|\.env|env file|secret manager|security/i.test(text)) {
    return "Why .env files are the wrong place to keep long-lived secret keys";
  }

  if (/early adopters?|first users?|get users?|user acquisition|distribution|build it|they will come/i.test(text)) {
    return "Find users for a SaaS before assuming launch will solve distribution";
  }

  if (/record.*demo|demo video|app demo|product demo|saas demo|cursor animation|zoom effect/i.test(text)) {
    return "Record a SaaS demo video from screenshots without re-recording every edit";
  }

  if (/subtitles?|captions?/i.test(text)) {
    return "How automatic captions fit into a browser-based video editor";
  }

  if (/video editor|mont|timeline|rendering/i.test(text)) {
    return "What building a browser video editor teaches about product engineering";
  }

  if (/git|github|commit|branch|merge/i.test(text)) {
    return "Turn the Git lesson into a command-line tutorial with exercises";
  }

  if (/learn to code|learning to code/i.test(text)) {
    return "Rewrite the lesson as a practical learn-to-code guide with exercises";
  }

  return `Rewrite as a search-focused ${cluster.name.toLowerCase()} article`;
}

function percentile(values, percentileValue) {
  if (!values.length) {
    return 0;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.floor((percentileValue / 100) * sorted.length))
  );
  return sorted[index];
}

function platformStats(posts) {
  const groups = new Map();

  posts.forEach((post) => {
    const group = groups.get(post.platform) || [];
    group.push(post);
    groups.set(post.platform, group);
  });

  return Array.from(groups.entries()).map(([platform, group]) => {
    const views = group.map((post) => post.views);
    const totalViews = views.reduce((sum, value) => sum + value, 0);
    return {
      platform,
      count: group.length,
      totalViews,
      averageViews: group.length ? totalViews / group.length : 0,
      medianViews: percentile(views, 50),
      topViews: Math.max(...views, 0),
    };
  });
}

function scoreCandidate(post, platformStat, hasTranscript, cluster) {
  const median = Math.max(platformStat?.medianViews || 1, 1);
  const relativeViews = Math.min(180, (post.views / median) * 30);
  const engagementScore = Math.min(80, post.engagementRate * 1200);
  const transcriptScore = hasTranscript ? 20 : 0;
  const evergreenScore = cluster.name === "General developer content" ? 0 : 12;
  const commentScore = Math.min(20, post.comments * 1.5);

  return relativeViews + engagementScore + transcriptScore + evergreenScore + commentScore;
}

function annotatePosts(posts, artifacts, stats) {
  const statByPlatform = new Map(stats.map((item) => [item.platform, item]));

  return posts.map((post) => {
    const artifact = artifactForPost(post, artifacts);
    const transcript = readTextIfExists(artifact.transcriptPath);
    const cluster = classifyCluster(post, transcript);
    const hasTranscript = Boolean(artifact.transcriptPath);

    return {
      ...post,
      artifact,
      hasTranscript,
      cluster: cluster.name,
      keywordSeeds: cluster.keywordSeeds,
      articleAngle: suggestAngle(post, transcript, cluster),
      publishedPath: PUBLISHED_SOURCE_MAP[post.externalId] || "",
      score: scoreCandidate(post, statByPlatform.get(post.platform), hasTranscript, cluster),
    };
  });
}

function markdownLink(label, url) {
  if (!url) {
    return label;
  }

  return `[${label}](${url})`;
}

function cleanUrl(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") && parsed.pathname === "/watch") {
      const videoId = parsed.searchParams.get("v");
      parsed.search = "";
      if (videoId) {
        parsed.searchParams.set("v", videoId);
      }
    } else if (
      parsed.hostname.includes("tiktok.com") ||
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtu.be")
    ) {
      parsed.search = "";
    }
    return parsed.toString();
  } catch {
    return url;
  }
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

function truncate(value, length = 120) {
  const text = sanitizeText(value);
  return text.length > length ? `${text.slice(0, length - 3)}...` : text;
}

function escapeCell(value) {
  return sanitizeText(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function renderCandidateRow(candidate, index) {
  const label = `${candidate.platform}:${candidate.externalId || candidate.id}`;
  const title = candidate.title.replace(/^TikTok video #?/, "TikTok ");

  const cells = [
    index + 1,
    markdownLink(escapeCell(label), cleanUrl(candidate.url)),
    candidate.date,
    escapeCell(truncate(title)),
    formatNumber(candidate.views),
    formatPercent(candidate.engagementRate),
    candidate.hasTranscript ? "yes" : "needed",
    candidate.publishedPath
      ? markdownLink("published", candidate.publishedPath)
      : "queued",
    escapeCell(candidate.cluster),
    escapeCell(truncate(candidate.articleAngle, 100)),
  ];

  return `| ${cells.join(" | ")} |`;
}

function renderMarkdown(report) {
  const lines = [
    "# Social Content Opportunity Report",
    "",
    `Source: ${report.metadata.postsPath}`,
    `Stats updated: ${report.metadata.updatedAt || "unknown"}`,
    `Posts analyzed: ${report.metadata.postCount}`,
    `Cutoff date: ${report.metadata.after}`,
    `YouTube Shorts ignored: ${report.metadata.ignoredYouTubeShorts}`,
    "",
    "## Platform Summary",
    "",
    "| Platform | Posts | Total views | Average views | Median views | Top views |",
    "| --- | ---: | ---: | ---: | ---: | ---: |",
  ];

  report.platforms.forEach((platform) => {
    lines.push(
      `| ${[
        platform.platform,
        platform.count,
        formatNumber(platform.totalViews),
        formatNumber(platform.averageViews),
        formatNumber(platform.medianViews),
        formatNumber(platform.topViews),
      ].join(" | ")} |`
    );
  });

  lines.push(
    "",
    "## Strategy While Search Console Is Processing",
    "",
    "- Use social performance to find proven pain points and hooks.",
    "- Use Google Ads Keyword Planner exports to validate search demand before writing the final title and outline.",
    "- Prioritize posts where social proof, durable search intent, and existing site topical authority overlap.",
    "- Keep raw transcripts as source notes only; publish rewritten articles with examples, headings, and exercises.",
    "",
    "## Priority Queue",
    "",
    "| # | Source | Date | Working title | Views | Engagement | Transcript | Status | Cluster | Article angle |",
    "| ---: | --- | --- | --- | ---: | ---: | --- | --- | --- | --- |"
  );

  report.candidates.forEach((candidate, index) => {
    lines.push(renderCandidateRow(candidate, index));
  });

  lines.push("", "## Keyword Seeds By Cluster", "");

  report.clusters.forEach((cluster) => {
    lines.push(`### ${cluster.name}`, "");
    lines.push(`- Social candidates: ${cluster.count}`);
    lines.push(`- Total views: ${formatNumber(cluster.views)}`);
    lines.push(`- Seed keywords: ${cluster.keywordSeeds.join(", ")}`);
    lines.push("");
  });

  lines.push("## Transcription Backlog", "");

  if (report.transcriptionBacklog.length) {
    report.transcriptionBacklog.forEach((candidate) => {
      lines.push(
        `- ${candidate.date} ${candidate.platform} ${markdownLink(
          truncate(candidate.title, 120),
          cleanUrl(candidate.url)
        )} - ${formatNumber(candidate.views)} views, ${candidate.cluster}`
      );
    });
  } else {
    lines.push("- No high-priority missing transcripts.");
  }

  lines.push(
    "",
    "## Source Commands",
    "",
    "Refresh metrics in `stats-dashboard`:",
    "",
    "```bash",
    "cd ../stats-dashboard",
    "make sync-posts",
    "```",
    "",
    "Download and transcribe a specific source post:",
    "",
    "```bash",
    "cd ../stats-dashboard",
    "make analyze-post ARGS='--post-id tiktok_7631569099822320918'",
    "make analyze-post ARGS='--post-id youtube_mnfeiggq35o --platform youtube'",
    "```",
    "",
    "Regenerate this report from the website repo:",
    "",
    "```bash",
    "npm run seo:social -- --output=docs/seo/social-content-opportunities.md",
    "```",
    "",
    "Prepare the next transcript queue without running it:",
    "",
    "```bash",
    "npm run seo:transcripts -- --platform=all --limit=5",
    "npm run seo:transcripts -- --platform=youtube --limit=3",
    "```",
    "",
    "Create a conversion draft after an analysis folder exists:",
    "",
    "```bash",
    "npm run seo:post-draft -- --post-id=tiktok_7631897804771757334 --output=docs/seo/post-drafts/example.md",
    "npm run seo:post-draft -- --post-id=youtube_mnfeiggq35o --output=docs/seo/post-drafts/localization-with-source-text-keys.md",
    "```"
  );

  return `${lines.join("\n")}\n`;
}

function buildReport(args) {
  const postsPath = path.resolve(args.posts);
  const source = readJson(postsPath);
  const cutoff = new Date(`${args.after}T00:00:00.000Z`).getTime();
  const artifacts = scanAnalysisArtifacts(
    path.resolve(args.analysisDir),
    path.resolve(args.successfulDir)
  );
  const normalizedPosts = (source.posts || source.videos || [])
    .map(normalizePost)
    .filter((post) => !post.publishedAt || new Date(post.publishedAt).getTime() >= cutoff);
  const ignoredYouTubeShorts = normalizedPosts.filter((post) =>
    isIgnoredYouTubeShort(post, artifactForPost(post, artifacts))
  ).length;
  const posts = normalizedPosts
    .filter((post) => !isIgnoredYouTubeShort(post, artifactForPost(post, artifacts)))
    .filter((post) => post.views >= args.minViews);

  const stats = platformStats(posts);
  const annotated = annotatePosts(posts, artifacts, stats)
    .sort((a, b) => b.score - a.score || b.views - a.views);
  const candidates = annotated.slice(0, args.limit);
  const clusterMap = new Map();

  annotated.forEach((candidate) => {
    const current = clusterMap.get(candidate.cluster) || {
      name: candidate.cluster,
      count: 0,
      views: 0,
      keywordSeeds: candidate.keywordSeeds,
    };
    current.count += 1;
    current.views += candidate.views;
    clusterMap.set(candidate.cluster, current);
  });

  return {
    metadata: {
      postsPath,
      updatedAt: source.updatedAt,
      postCount: posts.length,
      ignoredYouTubeShorts,
      after: args.after,
    },
    platforms: stats.sort((a, b) => b.totalViews - a.totalViews),
    candidates,
    clusters: Array.from(clusterMap.values()).sort((a, b) => b.views - a.views),
    transcriptionBacklog: annotated
      .filter((candidate) => !candidate.hasTranscript)
      .slice(0, 10),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const report = buildReport(args);

  if (args.json) {
    const json = JSON.stringify(report, null, 2);
    if (args.output) {
      fs.writeFileSync(path.resolve(args.output), `${json}\n`);
      return;
    }
    console.log(json);
    return;
  }

  const markdown = renderMarkdown(report);
  if (args.output) {
    fs.writeFileSync(path.resolve(args.output), markdown);
    return;
  }

  console.log(markdown);
}

if (require.main === module) {
  main();
}

module.exports = {
  buildReport,
  cleanUrl,
  renderMarkdown,
};
