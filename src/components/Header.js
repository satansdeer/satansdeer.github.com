import React from "react";
import Link from "gatsby-link";
import { rhythm, scale } from "../utils/typography";
import Logo from "./Logo";
import Navbar from "./Navbar";

export default () => {
  return (
    <div
      style={{
        minHeight: "56px",
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        top: 0,
        backgroundColor: "#ffe900",
        width: "100%",
        left: 0,
        zIndex: 100,
        boxShadow: '0px 0px 6px -4px rgba(0, 0, 0, 0.35)'
      }}
    >
      <div
        style={{
          padding: "0 50px 0 50px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <Logo />
        <Navbar />
      </div>
    </div>
  );
};
