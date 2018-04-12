import React from "react";
import Link from "gatsby-link";
import { Container } from "react-responsive-grid";
import { rhythm, scale } from "../utils/typography";
import Header from "../components/Header";
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

    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <Header />
        {children()}
      </Container>
    );
  }
}

export default Template;
