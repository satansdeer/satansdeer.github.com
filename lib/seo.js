const SITE_URL = "https://maksimivanov.com";
const SITE_NAME = "Maksim Ivanov";
const AUTHOR_NAME = "Maksim Ivanov";
const AUTHOR_ID = `${SITE_URL}/about/#person`;

function absoluteUrl(urlOrPath = "/") {
  if (/^https?:\/\//.test(urlOrPath)) {
    return urlOrPath;
  }

  const path = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return `${SITE_URL}${path}`;
}

function authorReference() {
  return {
    "@type": "Person",
    "@id": AUTHOR_ID,
  };
}

function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: AUTHOR_NAME,
    url: `${SITE_URL}/about/`,
    sameAs: [
      "https://github.com/satansdeer",
      "https://www.linkedin.com/in/mivanovm/",
      "https://twitter.com/satansdeer",
      "https://www.youtube.com/user/satansdeer1/videos",
    ],
    jobTitle: "Full-stack developer",
  };
}

function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "en",
    publisher: authorReference(),
  };
}

function buildWebPageJsonLd({ title, description, path, type = "WebPage" }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    inLanguage: "en",
  };
}

function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function buildBlogPostingJsonLd(post) {
  const image = post.image ? [absoluteUrl(post.image)] : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(post.url)}#article`,
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(post.url),
    mainEntityOfPage: absoluteUrl(post.url),
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    articleSection: post.category || undefined,
    image,
    author: authorReference(),
    publisher: authorReference(),
    inLanguage: "en",
  };
}

function buildCollectionPageJsonLd({ title, description, path }) {
  return buildWebPageJsonLd({
    title,
    description,
    path,
    type: "CollectionPage",
  });
}

function buildCreativeWorkJsonLd(work, path) {
  const type = work.type?.includes("Book")
    ? "Book"
    : work.type?.includes("Course")
      ? "Course"
      : "CreativeWork";

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#creative-work`,
    name: work.title,
    description: work.summary,
    url: absoluteUrl(path),
    sameAs: work.externalUrl,
    creator: authorReference(),
    author: type === "Book" ? authorReference() : undefined,
    provider: type === "Course" ? authorReference() : undefined,
    inLanguage: "en",
  };
}

module.exports = {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildCreativeWorkJsonLd,
  buildPersonJsonLd,
  buildWebPageJsonLd,
  buildWebsiteJsonLd,
};
