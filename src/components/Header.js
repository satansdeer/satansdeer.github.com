import React from "react";
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
        boxShadow: "0px 0px 6px -4px rgba(0, 0, 0, 0.35)"
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
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            style={{
              marginRight: "20px",
              backgroundColor: "#f2dd00",
              border: "1px solid #c3c3c3",
              borderRadius: "5px",
              padding: "0 20px"
            }}
          />
          <Navbar />
        </div>
      </div>
    </div>
  );
};
