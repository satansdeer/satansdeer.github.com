import React from "react";
import Link from "gatsby-link";
import { rhythm, scale } from "../utils/typography";

export default () => {
  return (
    <Link
      style={{
        boxShadow: "none",
        fontFamily: "Montserrat, sans-serif",
        textDecoration: "none",
        fontSize: 26,
        backgroundImage: "none",
        color: "inherit"
      }}
      to={"/"}
    >
      Maksim Ivanov
    </Link>
  );
};
