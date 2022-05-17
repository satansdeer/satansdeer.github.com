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

const findFirstImage = (slices) => {
  const imageSlice = slices.find((slice) => slice.slice_type === "image");

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

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
  const featuredImage =
    (prismicH.isFilled.image(post.data.image) && post.data.image) ||
    findFirstImage(post.data.slices);
  const date = prismicH.asDate(
    post.data.publishDate || post.first_publication_date
  );
  const excerpt = getExcerpt(post.data.slices);

  return (
    <li>
      <h2>
        <PrismicLink document={post}>{post.data.Title}</PrismicLink>
      </h2>
      <p className="text-slate-500">{dateFormatter.format(date)}</p>
      {excerpt && (
        <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
          {excerpt}
        </p>
      )}
    </li>
  );
};

const Index = ({ navigation, settings, mainPageContent }) => {
  const recommendedPosts = mainPageContent.data.recommendedPosts

  return (
    <>
      <Header navigation={navigation} settings={settings} />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <main className="prose sm:prose-lg lg:prose-xl">
              <SliceZone
                slices={mainPageContent.data.slices}
                components={components}
              />
							{/* {recommendedPosts.map((post) => (
								<Post key={post.uid} post={post} />
							))} */}
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
  const mainPageContent = await client.getSingle("main-page-content");

  return {
    props: {
      navigation,
      settings,
      mainPageContent,
    },
  };
}
