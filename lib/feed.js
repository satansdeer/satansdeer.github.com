import { Feed } from "feed";
import { createClient, linkResolver } from "../prismicio";
import * as prismicH from "@prismicio/helpers";

export const buildFeed = async () => {
  const client = createClient();
  // This contains site level metadata like title, url, etc
  const feed = new Feed({
    // Global feed config
    title: "Maksim Ivanov's blog",
    description: "Frontend developer tutorials. Mostly React and Typescript",
    generator: "Feed",
  });

  const posts = await client.getAllByType("post");

  posts.forEach((post) => {
    feed.addItem({
      title: post.data.Title,
      description: prismicH.asText(post.data.description),
			link: "https://maksimivanov.com" + prismicH.asLink(post, linkResolver),
    });
  });

  return feed;
};
