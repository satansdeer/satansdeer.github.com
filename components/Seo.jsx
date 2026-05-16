import Head from "next/head";
import { absoluteUrl, SITE_NAME } from "../lib/seo";

const serializeJsonLd = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const formatTitle = (title) => {
  if (!title || title === SITE_NAME || title.endsWith(`| ${SITE_NAME}`)) {
    return title || SITE_NAME;
  }

  return `${title} | ${SITE_NAME}`;
};

export const Seo = ({
  title,
  description,
  path = "/",
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  jsonLd = [],
}) => {
  const pageTitle = formatTitle(title);
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : null;
  const structuredData = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean);

  return (
    <Head>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {structuredData.map((item, index) => (
        <script
          key={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
    </Head>
  );
};
