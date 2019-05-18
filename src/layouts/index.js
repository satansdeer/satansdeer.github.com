import React from "react";
import Link from "gatsby-link";
import { Container } from "react-responsive-grid";
import { rhythm, scale } from "../utils/typography";
import Header from "../components/Header";
import "../utils/typography";

import "prism-themes/themes/prism-ghcolors.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    let header;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "0",
            height: "550px",
            background:
              "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAD0lEQVQImWNgQAX/yeAAAIHCA/0RE2WAAAAAAElFTkSuQmCC) repeat",
            transform: "skewY(-5deg)",
            width: "100%",
            zIndex: "-1"
          }}
        />
        <Container
          style={{
            maxWidth: rhythm(24),
            padding: `${rhythm(3 / 4)}`,
            backgroundColor: "#f7f7f7",
            marginTop: "110px",
            boxShadow: "4px 4px #c3c3c3",
            borderRadius: "5px",
            border: "1px solid #c3c3c3",
            marginBottom: '50px'
          }}
        >
          <Header />
          {children()}
        </Container>
      </div>
    );
  }
}

export default Template;
