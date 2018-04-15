import React from "react";
import Link from "gatsby-link";
import { rhythm, scale } from "../utils/typography";

export default () => {
  return (
    <div style={{ display: "flex" }}>
      <a
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
          marginRight: 20
        }}
        href={"https://basicreact.com"}
      >
        React course
      </a>
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
    </div>
  );
};
