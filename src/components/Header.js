import React from "react";
import Link from "gatsby-link";
import { rhythm, scale } from "../utils/typography";
import Logo from "./Logo";
import Navbar from "./Navbar";

export default () => {
  return (
    <div
      style={{
        minHeight: 56,
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        flexWrap: "wrap"
      }}
    >
      <Logo />
      <Navbar />
    </div>
  );
};
