import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";
import Img from "gatsby-image";

import { rhythm } from "../../utils/typography";

const colorsByCat = cat => {
  switch (cat.toLowerCase()) {
    case "react":
      return {
        backgroundColor: "#282c34",
        color: "#61dafb"
      };
    case "javascript":
      return {
        backgroundColor: "#ecdb54",
        color: "#000"
      };
    case "html":
      return {
        backgroundColor: "#f16529",
        color: "#fff"
      };
    case "git":
      return {
        backgroundColor: "#dd4132",
        color: "#fff"
      };
    case "ethereum":
      return {
        backgroundColor: "#5f658b",
        color: "#fff"
      };
    case "reactnative":
      return {
        backgroundColor: "#05a5d1",
        color: "#fff"
      };
    case "programming":
      return {
        backgroundColor: "#010301",
        color: "#15d709"
      };
    case "typescript":
      return {
        backgroundColor: "#0074c1",
        color: "#fff"
      };
    default:
      return {
        backgroundColor: "#ce3175",
        color: "#fff"
      };
  }
};

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const author = get(this.props, "data.site.siteMetadata.author");
    const siteUrl = get(this.props, "data.site.siteMetadata.siteUrl");
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    );
    const posts = get(this, "props.data.allMarkdownRemark.edges");
    const image = "https://starflow.com/images/Maksim_Ivanov.jpg";

    return (
      <div>
        <Helmet title={siteTitle}>
          <link rel="canonical" href={`https://maksimivanov.com/posts/`} />
          <meta name="description" content={siteDescription} />
          <meta property="og:site_name" content={author} />
          <meta property="og:type" content="blog" />
          <meta property="og:url" content={`https://maksimivanov.com/posts`} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="satansdeer" />
          <meta name="twitter:title" content="Maksim Ivanov" />
          <meta name="twitter:creator" content="satansdeer" />
          <meta name="twitter:description" content={siteDescription} />
        </Helmet>
        {posts.map(({ node }) => {
          if (!node.frontmatter.title) {
            return;
          }
          const title = get(node, "frontmatter.title") || node.fields.slug;
          return (
            <div
              key={node.fields.slug}
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                <h2
                  style={{
                    marginBottom: rhythm(1 / 2),
                    fontSize: "30px"
                  }}
                >
                  {title}
                </h2>
                <small
                  style={{
                    marginBottom: rhythm(1),
                    display: "block",
                    color: "#aaa"
                  }}
                >
                  {node.frontmatter.date}
                  {" · "}
                  <span
                    style={{
                      borderRadius: "6px",
                      padding: "5px 10px",
                      textShadow: "none",
                      ...colorsByCat(node.frontmatter.categories)
                    }}
                  >
                    {node.frontmatter.categories}
                  </span>
                </small>
                {/* {node.frontmatter.image && (
                  <Img
                    sizes={node.frontmatter.image.childImageSharp.sizes}
                    style={{ marginBottom: rhythm(1), borderRadius: 6 }}
                  />
                )} */}
              </Link>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            categories
            image {
              childImageSharp {
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
