import React from "react"
import Layout from "../../components/Layout"
import { StaticQuery, graphql } from "gatsby"
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";
import typography from "../../utils/typography"
import {colorsByCat} from "../../utils/categories"

class BlogIndex extends React.Component {
  render() {
    return (
      <Layout>
        <StaticQuery
          query={graphql`
            query IndexQuery {
              site {
                siteMetadata {
                  title
                  description
                  author
                }
              }
              allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
              ) {
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
          `}
          render={data => {
            const siteTitle = get(data, "site.siteMetadata.title")
            const author = get(data, "site.siteMetadata.author")
            const siteDescription = get(
              data,
              "site.siteMetadata.description"
            )
            const posts = get(data, "allMarkdownRemark.edges")
            const image = "https://starflow.com/images/Maksim_Ivanov.jpg"

            return (
              <div>
                <Helmet title={siteTitle}>
                  <link
                    rel="canonical"
                    href={`https://maksimivanov.com/posts/`}
                  />
                  <meta name="description" content={siteDescription} />
                  <meta property="og:site_name" content={author} />
                  <meta property="og:type" content="blog" />
                  <meta
                    property="og:url"
                    content={`https://maksimivanov.com/posts`}
                  />
                  <meta property="og:image" content={image} />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:site" content="satansdeer" />
                  <meta name="twitter:title" content="Maksim Ivanov" />
                  <meta name="twitter:creator" content="satansdeer" />
                  <meta name="twitter:description" content={siteDescription} />
                </Helmet>
                {posts.map(({ node }) => {
                  if (!node.frontmatter.title) {
                    return null
                  }
                  const title =
                    get(node, "frontmatter.title") || node.fields.slug
                  return (
                    <div
                      key={node.fields.slug}
                      style={{
                        borderBottom: "1px solid #ccc",
                        marginBottom: "30px",
                      }}
                    >
                      <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                        <h2
                          style={{
                            marginBottom: typography.rhythm(1 / 2),
                            fontSize: "30px",
                          }}
                        >
                          {title}
                        </h2>
                        <small
                          style={{
                            marginBottom: typography.rhythm(1),
                            display: "block",
                            color: "#aaa",
                          }}
                        >
                          {node.frontmatter.date}
                          {" · "}
                          <span
                            style={{
                              padding: "5px 10px",
                              paddingLeft: "10px",
                              color: "#222",
                              fontWeight: 600,
                              backgroundRepeat: "no-repeat",
                              backgroundPositionY: "center",
                              ...colorsByCat(node.frontmatter.categories),
                            }}
                          >
                            {node.frontmatter.categories}
                          </span>
                        </small>
                      </Link>
                      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                    </div>
                  )
                })}
              </div>
            )
          }}
        />
      </Layout>
    )
  }
}

export default BlogIndex
