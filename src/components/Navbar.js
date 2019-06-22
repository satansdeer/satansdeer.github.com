import React from "react";
import Link from "gatsby-link";

export default () => {
  return (
    <div style={{ display: "flex" }}>
      <Link
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
          marginRight: 20
        }}
        to={"/"}
      >
        Start here
      </Link>
      <Link
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
          marginRight: 20
        }}
        to={"/posts/"}
      >
        Posts
      </Link>
      <a
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
          marginRight: 20
        }}
        href={"https://www.youtube.com/user/satansdeer1/videos"}
      >
        Videos
      </a>
    </div>
  );
};
