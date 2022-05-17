import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../prismicio";
import { components } from "../slices";
import { Header } from "../components/Header";

const Page = ({ page, navigation, settings }) => {
  return (
    <>
      <Header navigation={navigation} settings={settings} />
      <Head>
        <title>{page.data.Title}</title>
      </Head>
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <div className="pt-12 pb-9">
            <div className="container mx-auto md:max-w-4xl px-4">
              <h1>{page.data.Title}</h1>
            </div>
          </div>
          <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
            <SliceZone slices={page.data.slices} components={components} />
          </main>
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

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => prismicH.asLink(page, linkResolver)),
    fallback: false,
  };
}
