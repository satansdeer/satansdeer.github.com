import { buildFeed } from "../../../lib/feed";

export default async (req, res) => {
  const feed = await buildFeed();

  res.statusCode = 200;
  res.setHeader("content-type", "application/feed+json");
  res.end(feed.json1());
};
