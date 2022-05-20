import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

export const Post = ({ post }) => {
  return (
    <PrismicLink
      className="block group p-6 rounded-lg border border-gray-200 shadow-md no-underline bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      document={post}
    >
      <h3 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {post.data.Title}
      </h3>
      {post.data.description && (
        <PrismicRichText
          className="prose dark:prose-invert  sm:prose-lg lg:prose-xl"
          field={post.data.description}
        />
      )}
    </PrismicLink>
  );
};
