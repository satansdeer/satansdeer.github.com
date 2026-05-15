/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: "imgix",
    path: "",
    domains: ["images.prismic.io"],
  },
};

module.exports = nextConfig;
