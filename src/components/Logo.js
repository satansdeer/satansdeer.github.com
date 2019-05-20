import React from "react";
import Link from "gatsby-link";
import { rhythm, scale } from "../utils/typography";

export default () => {
  return (
    <Link
      style={{
        boxShadow: "none",
        fontFamily: "Open Sans, sans-serif",
        textDecoration: "none",
        fontSize: 26,
        fontWeight: 800,
        backgroundImage: "none",
        color: "inherit",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
      to={"/"}
    >
      Maksim Ivanov
      <span style={{fontSize: 12, fontWeight: 400, fontFamily: 'monospace', marginTop: -4, marginBottom: 4}}>Programming tutorials</span>      
    </Link>
  );
};
