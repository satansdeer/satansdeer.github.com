import { PrismicLink, PrismicText } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { components } from "../slices";

import { Header } from "../components/Header";
import { createClient } from "../prismicio";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === "markdown")
    .map((slice) => prismicH.asText(slice.primary.text))
    .join(" ");

  const excerpt = text.substring(0, 300);

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
  } else {
    return excerpt;
  }
};

const Post = ({ post }) => {
  const date = prismicH.asDate(
    post.data.publishDate || post.first_publication_date
  );
  const excerpt = getExcerpt(post.data.slices);

  return (
    <PrismicLink
      className="block p-6 rounded-lg border border-gray-200 shadow-md no-underline bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      document={post}
    >
      <h3 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {post.data.Title}
      </h3>
      {excerpt && (
        <p className="prose dark:prose-invert  sm:prose-lg lg:prose-xl">
          {excerpt}
        </p>
      )}
    </PrismicLink>
  );
};

const Index = ({ navigation, settings, mainPageContent, posts }) => {
  return (
    <>
      <Header navigation={navigation} settings={settings} />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <SliceZone
                slices={mainPageContent.data.slices}
                components={components}
              />
            </main>
            {posts.map((post) => (
							<div className="mt-12">

              <Post key={post.uid} post={post} />
							</div>
            ))}
          </article>
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  const mainPageContent = await client.getSingle("main-page-content");

  const recommendedPosts = mainPageContent.data.recommendedPosts;

  let posts = [];
  for (const item of recommendedPosts) {
    const postData = await client.getByUID("post", item.post.uid);
    posts.push(postData);
  }

  return {
    props: {
      navigation,
      settings,
      mainPageContent,
      posts,
    },
  };
}
