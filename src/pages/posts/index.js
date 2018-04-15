import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";
import Img from "gatsby-image";

import { rhythm } from "../../utils/typography";

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const author = get(this.props, "data.site.siteMetadata.author");
    const siteUrl = get(this.props, "data.site.siteMetadata.siteUrl");
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    );
    console.log("===", get(this, "props.data.site.siteMetadata"));
    const posts = get(this, "props.data.allMarkdownRemark.edges");

    return (
      <div>
        <Helmet title={siteTitle}>
          <meta name="description" content={siteDescription} />
          <meta property="og:site_name" content={author} />
          <meta property="og:url" content={`http://maksimivanov.com/posts`} />
          <link rel="canonical" href={`http://maksimivanov.com/posts`} />
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
              <Link
                style={{ boxShadow: "none" }}
                to={node.fields.slug.replace(/\/$/, "")}
              >
                <h2
                  style={{
                    marginBottom: rhythm(1 / 3),
                    fontSize: "2rem"
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
                </small>
                {node.frontmatter.image && (
                  <Img
                    sizes={node.frontmatter.image.childImageSharp.sizes}
                    style={{ marginBottom: rhythm(1), borderRadius: 6 }}
                  />
                )}
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
