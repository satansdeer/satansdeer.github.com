import React from "react";
import Link from "gatsby-link";
import { Container } from "react-responsive-grid";
import { rhythm, scale } from "../utils/typography";
import "../utils/typography";

import "prismjs/themes/prism-okaidia.css";

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    let header;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit"
            }}
            to={"/"}
          >
            Maksim Ivanov
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: 0,
            marginBottom: rhythm(-1)
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit"
            }}
            to={"/"}
          >
            Maksim Ivanov
          </Link>
        </h3>
      );
    }
    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        {header}
        {children()}
      </Container>
    );
  }
}

export default Template;
