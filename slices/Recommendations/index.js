import React from "react";
import { Post } from "../../components/Post";

const Recommendations = ({ slice }) => {
  return (
    <div className="not-prose">
      {slice.items.map(({ post }) => (
        <div key={post.uid} className="my-10">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
