/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "",
    domains: ["images.prismic.io"],
  },
  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/api/feed/rss",
      },
      {
        // The /:slug part is a generic parameter handler to catch all other cases
        source: "/feed/:slug",
        destination: "/api/feed/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
