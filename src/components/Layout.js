import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import typography from "../utils/typography"
import Header from "./Header"

import "../utils/typography"

import "prism-themes/themes/prism-ghcolors.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import { categories, colorsByCat } from "../utils/categories"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
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
            zIndex: "-1",
          }}
        />
        <Header />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start"
          }}
        >
          <aside
            style={{
              maxWidth: typography.rhythm(8),
              padding: `${typography.rhythm(3 / 4)}`,
              backgroundColor: "#f7f7f7",
              marginTop: "110px",
              marginRight: "30px",
              boxShadow: "4px 4px #c3c3c3",
              borderRadius: "5px",
              border: "1px solid #c3c3c3",
              flexGrow: 0,
            }}
          >
            <h2>Categories</h2>
            <div style={{ display: "flex", flexFlow: "wrap" }}>
              {categories.map(cat => (
                <Link
                  style={{
                    padding: "5px 10px",
                    paddingLeft: "10px",
                    color: "#191919",
                    fontSize: "16px",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "center",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                    ...colorsByCat(cat),
                  }}
                  to={`categories/${cat}`}
                >{`${cat}  `}</Link>
              ))}
            </div>
          </aside>
          <main
            style={{
              maxWidth: typography.rhythm(24),
              padding: `${typography.rhythm(3 / 4)}`,
              backgroundColor: "#f7f7f7",
              marginTop: "110px",
              boxShadow: "4px 4px #c3c3c3",
              borderRadius: "5px",
              border: "1px solid #c3c3c3",
              marginBottom: "50px",
            }}
          >
            {children}
          </main>
        </div>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
