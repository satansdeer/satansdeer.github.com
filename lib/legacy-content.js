const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content", "legacy-posts");
const SITE_URL = "https://maksimivanov.com";

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return { data: {}, content: source };
  }

  const data = {};
  const frontmatter = match[1];
  const content = source.slice(match[0].length);

  frontmatter.split(/\r?\n/).forEach((line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  });

  return { data, content };
}

function normalizeMarkdown(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/<sign-up-form>\s*<\/sign-up-form>/g, "")
    .replace(/`youtube:(https:\/\/www\.youtube\.com\/embed\/([^`?]+)[^`]*)`/g, (_, embedUrl, id) => {
      return `[Watch the video on YouTube](https://www.youtube.com/watch?v=${id})`;
    })
    .replace(
      /<div class="glitch-embed-wrap"[\s\S]*?<iframe[\s\S]*?src="([^"]+)"[\s\S]*?<\/iframe>[\s\S]*?<\/div>/g,
      (_, url) => `[Open the Glitch example](${url})`
    );
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(date) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date || "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(POSTS_DIR, slug, "index.md")))
    .sort();
}

function getPostBySlug(slug) {
  const filePath = path.join(POSTS_DIR, slug, "index.md");
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(source);
  const normalizedContent = normalizeMarkdown(content);
  const excerpt = stripMarkdown(normalizedContent).slice(0, 220);

  return {
    slug,
    title: (data.title || slug).trim(),
    date: data.date || "",
    dateLabel: formatDate(data.date),
    category: (data.categories || "Uncategorized").trim(),
    categorySlug: normalizeCategory(data.categories || "Uncategorized"),
    image: data.image ? `/posts/${slug}/${data.image}` : null,
    content: normalizedContent,
    excerpt,
    url: `/posts/${slug}/`,
    canonicalUrl: `${SITE_URL}/posts/${slug}/`,
  };
}

function sortPosts(posts) {
  return posts.sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
  });
}

function getAllPosts() {
  return sortPosts(getPostSlugs().map(getPostBySlug));
}

function getFeaturedPosts() {
  const featuredSlugs = [
    "build-it-and-they-will-not-come",
    "mont-slides-and-video-timeline",
    "record-saas-demo-video-from-screenshots",
    "make-your-first-video-in-mont",
  ];
  const posts = new Map(getAllPosts().map((post) => [post.slug, post]));

  return featuredSlugs.map((slug) => posts.get(slug)).filter(Boolean);
}

function normalizeCategory(category) {
  return category.trim().toLowerCase().replace(/\s+/g, "-");
}

function getCategories() {
  const groups = new Map();

  getAllPosts().forEach((post) => {
    const slug = normalizeCategory(post.category);
    const current = groups.get(slug) || {
      slug,
      title: post.category.trim(),
      count: 0,
    };

    current.count += 1;
    groups.set(slug, current);
  });

  return Array.from(groups.values()).sort((a, b) => a.title.localeCompare(b.title));
}

function getPostsByCategory(categorySlug) {
  return getAllPosts().filter((post) => normalizeCategory(post.category) === categorySlug);
}

module.exports = {
  SITE_URL,
  getAllPosts,
  getCategories,
  getFeaturedPosts,
  getPostBySlug,
  getPostSlugs,
  getPostsByCategory,
  normalizeCategory,
  parseFrontmatter,
  stripMarkdown,
};
