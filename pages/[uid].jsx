import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";

import { createClient, linkResolver } from "../prismicio";
import { components } from "../slices";
import { Header } from "../components/Header";

const Page = ({ page, navigation, settings, postsByCategory }) => {
  return (
    <>
      <Header navigation={navigation} settings={settings} />
      <Head>
        <title>{page.data.Title}</title>
      </Head>
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <SliceZone
                slices={page.data.slices}
                components={components}
                context={{ postsByCategory }}
              />
            </main>
          </article>
        </div>
      </div>
    </>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  const slices = page.data.slices;

  let postsByCategory = {};
  for (let slice of slices) {
    if (slice.slice_type === "category_posts") {
      const category = slice.primary.category;
      const categoryPosts = await client.getAllByType("post", {
        predicates: [prismic.predicate.at("my.post.category", category)],
      });
      postsByCategory[category] = categoryPosts;
    }
  }

  return {
    props: {
      page,
      navigation,
      settings,
      postsByCategory,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => prismicH.asLink(page, linkResolver)),
    fallback: false,
  };
}
