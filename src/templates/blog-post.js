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
    const { previous, next } = this.props.pathContext;
    const { slug } = post.fields;
    console.log("-----", slug);

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
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
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
        <ReactDisqusComments
          identifier={slug}
          url={`http://maksimivanov.com${slug}`}
          shortname="maksimivanov-com"
        />
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
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      htmlAst
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
