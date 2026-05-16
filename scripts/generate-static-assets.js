const fs = require("fs");
const path = require("path");
const {
  SITE_URL,
  getAllPosts,
  getCategories,
} = require("../lib/legacy-content");
const { getAllProjects, getProjectUrl } = require("../lib/projects");

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const contentPostsDir = path.join(rootDir, "content", "legacy-posts");
const publicPostsDir = path.join(publicDir, "posts");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function copyPostAssets() {
  ensureDir(publicPostsDir);

  getAllPosts().forEach((post) => {
    const sourceDir = path.join(contentPostsDir, post.slug);
    const targetDir = path.join(publicPostsDir, post.slug);

    ensureDir(targetDir);

    fs.readdirSync(sourceDir, { withFileTypes: true }).forEach((entry) => {
      if (entry.name === "index.md") {
        return;
      }

      const source = path.join(sourceDir, entry.name);
      const target = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        fs.cpSync(source, target, { recursive: true });
      } else {
        fs.copyFileSync(source, target);
      }
    });
  });
}

function writeRss(posts) {
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${post.url}`;
      const date = post.date ? new Date(post.date).toUTCString() : "";

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <pubDate>${escapeXml(date)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Maksim Ivanov Blog</title>
    <link>${SITE_URL}</link>
    <description>Frontend developer tutorials by Maksim Ivanov.</description>${items}
  </channel>
</rss>
`;

  fs.writeFileSync(path.join(publicDir, "rss.xml"), rss);
  fs.writeFileSync(path.join(publicDir, "feed.xml"), rss);
}

function writeAtom(posts) {
  const updated = posts[0]?.date
    ? new Date(posts[0].date).toISOString()
    : new Date().toISOString();
  const entries = posts
    .map((post) => {
      const url = `${SITE_URL}${post.url}`;
      const date = post.date ? new Date(post.date).toISOString() : updated;

      return `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${escapeXml(url)}" />
    <id>${escapeXml(url)}</id>
    <updated>${escapeXml(date)}</updated>
    <summary>${escapeXml(post.excerpt)}</summary>
  </entry>`;
    })
    .join("");

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Maksim Ivanov Blog</title>
  <link href="${SITE_URL}/" />
  <updated>${escapeXml(updated)}</updated>
  <id>${SITE_URL}/</id>${entries}
</feed>
`;

  fs.writeFileSync(path.join(publicDir, "atom.xml"), atom);
}

function writeJsonFeed(posts) {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Maksim Ivanov Blog",
    home_page_url: `${SITE_URL}/`,
    feed_url: `${SITE_URL}/feed.json`,
    description: "Frontend developer tutorials by Maksim Ivanov.",
    items: posts.map((post) => {
      const url = `${SITE_URL}${post.url}`;

      return {
        id: url,
        url,
        title: post.title,
        summary: post.excerpt,
        date_published: post.date ? new Date(post.date).toISOString() : undefined,
        tags: post.category ? [post.category] : [],
      };
    }),
  };

  fs.writeFileSync(path.join(publicDir, "feed.json"), `${JSON.stringify(feed, null, 2)}\n`);
}

function writeSitemap(posts, categories, projects) {
  const urls = [
    "/",
    "/about/",
    "/articles/",
    "/books/",
    "/books/command-line-git-everything-you-need-to-know-to-get-started/",
    "/projects/",
    ...projects.map(getProjectUrl),
    "/posts/",
    ...categories.map((category) => `/categories/${category.slug}/`),
    ...posts.map((post) => post.url),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${escapeXml(`${SITE_URL}${url}`)}</loc></url>`)
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
}

function writeRedirects() {
  const redirects = `# Cloudflare Pages redirects and rewrites for recovered URLs
/posts/7-skills-of-an-effective-developer /posts/skills-of-an-effective-developer/ 301
/posts/7-skills-of-an-effective-developer/ /posts/skills-of-an-effective-developer/ 301
/feed /rss.xml 200
/feed/ /rss.xml 200
/feed.xml /rss.xml 200
/feed/rss /rss.xml 200
/feed/rss/ /rss.xml 200
/feed/json /feed.json 200
/feed/json/ /feed.json 200
/feed/atom /atom.xml 200
/feed/atom/ /atom.xml 200
/rss /rss.xml 301
/posts /posts/ 301
/posts/:slug /posts/:slug/ 301
/categories/:category /categories/:category/ 301
/category/:category /categories/:category/ 301
/category/uncategorized/ /posts/ 301
/articles /articles/ 301
/books /books/ 301
/projects /projects/ 301
/projects/:project /projects/:project/ 301
/2023/06/27/hello-world/ / 301
/sample-page/ /about/ 301
/how-i-clock-in-my-work-time/ /posts/ 302
/what-does-11-12-mean-in-git/ /categories/git/ 302
/setting-up-jupyterlab-with-a-rust-server-using-nix-on-mac-os/ /posts/ 302
`;

  fs.writeFileSync(path.join(publicDir, "_redirects"), redirects);
}

function writeHeaders() {
  const headers = `/feed
  Content-Type: application/rss+xml; charset=utf-8
/feed/
  Content-Type: application/rss+xml; charset=utf-8
/feed/rss
  Content-Type: application/rss+xml; charset=utf-8
/feed/rss/
  Content-Type: application/rss+xml; charset=utf-8
/feed/json
  Content-Type: application/feed+json; charset=utf-8
/feed/json/
  Content-Type: application/feed+json; charset=utf-8
/feed/atom
  Content-Type: application/atom+xml; charset=utf-8
/feed/atom/
  Content-Type: application/atom+xml; charset=utf-8
/rss.xml
  Content-Type: application/rss+xml; charset=utf-8
/feed.xml
  Content-Type: application/rss+xml; charset=utf-8
/atom.xml
  Content-Type: application/atom+xml; charset=utf-8
/feed.json
  Content-Type: application/feed+json; charset=utf-8
/sitemap.xml
  Content-Type: application/xml; charset=utf-8
`;

  fs.writeFileSync(path.join(publicDir, "_headers"), headers);
}

function main() {
  ensureDir(publicDir);

  const posts = getAllPosts();
  const categories = getCategories();
  const projects = getAllProjects();

  copyPostAssets();
  writeRss(posts);
  writeAtom(posts);
  writeJsonFeed(posts);
  writeSitemap(posts, categories, projects);
  writeRedirects();
  writeHeaders();

  console.log(`Generated static assets for ${posts.length} posts.`);
}

main();
