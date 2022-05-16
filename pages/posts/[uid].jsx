import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Header } from "../../components/Header";

const Page = ({ page, navigation, settings }) => {
  return (
    <>
      <Header navigation={navigation} settings={settings} />
      <Head>
        <title>{page.data.Title}</title>
      </Head>
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <header>
              <h1 className="w-full max-w-screen-md mb-8 text-3xl font-black lg:text-6xl md:text-5xl sm:text-4xl lg:mb-10 leading-tighter">
                {page.data.Title}
              </h1>
            </header>
            <main className="prose sm:prose-lg lg:prose-xl">
              <SliceZone slices={page.data.slices} components={components} />
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

  console.log(previewData);

  const page = await client.getByUID("post", params.uid);
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("post");
  console.log(pages);

  return {
    paths: pages.map((page) => prismicH.asLink(page, linkResolver)),
    fallback: false,
  };
}
