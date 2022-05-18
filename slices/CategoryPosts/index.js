import React from "react";
import { Post } from "../../components/Post";

const CategoryPosts = ({ slice, context }) => {
	const category = slice.primary.category;
	const posts = context.postsByCategory[category];

  return (
    <div className="not-prose">
      {posts.map((post) => (
        <div className="my-10">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default CategoryPosts;
