import { PrismicLink, PrismicText } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import { PrismicRichText } from "@prismicio/react";

import { Header } from "../components/Header";
import { createClient } from "../prismicio";

const Index = ({ navigation, settings, mainPageContent }) => {
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
  const mainPageContent = await client.getSingle("main-page-content", {
		fetchLinks: ["post.Title", "post.description"]
	});

  return {
    props: {
      navigation,
      settings,
      mainPageContent,
    },
  };
}
