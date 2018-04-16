import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import get from "lodash/get";
import rehypeReact from "rehype-react";
import SignUpForm from "../components/SignUpForm";
import Img from "gatsby-image";
import ReactDisqusComments from "react-disqus-comments";

import { rhythm, scale } from "../utils/typography";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "sign-up-form": SignUpForm, image: Img }
}).Compiler;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const siteUrl = get(this.props, "data.site.siteMetadata.siteUrl");
    const author = get(this.props, "data.site.siteMetadata.author");
    const { previous, next } = this.props.pathContext;
    const slug = post.fields.slug.replace(/\/$/, "");
    const image = post.frontmatter.image
      ? `http://maksimivanov.com${
          post.frontmatter.image.childImageSharp.sizes.src
        }`
      : "http://starflow.com/images/Maksim_Ivanov.jpg";

    return (
      <div>
        <Helmet>
          <title>{post.frontmatter.title || siteTitle}</title>
          <meta name="description" content={post.excerpt} />
          <link rel="canonical" href={`http://maksimivanov.com${slug}`} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={author} />
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1920" />
          <meta property="og:image:height" content="1080" />
          <meta property="og:url" content={`http://maksimivanov.com${slug}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="satansdeer" />
          <meta name="twitter:title" content="Maksim Ivanov" />
          <meta name="twitter:creator" content="satansdeer" />
          <meta name="twitter:description" content={post.excerpt} />
          <meta
            name="twitter:image:src"
            content={`http://maksimivanov.com${image}`}
          />
        </Helmet>
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: "block",
            marginBottom: rhythm(1),
            marginTop: rhythm(1)
          }}
        >
          {post.frontmatter.date}
        </p>
        <div>{renderAst(post.htmlAst)}</div>
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
            padding: 0
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug.replace(/\/$/, "")} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug.replace(/\/$/, "")} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
        {false && (
          <ReactDisqusComments
            identifier={slug}
            url={`http://maksimivanov.com${slug}`}
            shortname="maksimivanov-com"
          />
        )}
      </div>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      fields {
        slug
      }
      htmlAst
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
`;
