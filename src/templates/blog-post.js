import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import get from "lodash/get";
import Layout from '../components/Layout'
import Share from '../components/Share'
import SignUpForm from '../components/SignUpForm'
import { graphql } from 'gatsby'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const siteUrl = get(this.props, "data.site.siteMetadata.siteUrl");
    const author = get(this.props, "data.site.siteMetadata.author");
    const twitterHandle = get(
      this.props,
      "data.site.siteMetadata.twitterHandle"
    );
    const { previous, next } = this.props.pageContext;
    const slug = post.fields.slug === "/" ? "" : post.fields.slug;
    const { title, categories } = post.frontmatter;
    const image = post.frontmatter.image
      ? `https://maksimivanov.com${
          post.frontmatter.image.childImageSharp.sizes.src
        }`
      : "https://starflow.com/images/Maksim_Ivanov.jpg";

    return (
      <Layout>
        <Helmet>
          <title>{post.frontmatter.title || siteTitle}</title>
          <meta name="description" content={post.excerpt} />
          <link rel="canonical" href={`https://maksimivanov.com${slug}`} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={author} />
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1920" />
          <meta property="og:image:height" content="1080" />
          <meta property="og:url" content={`https://maksimivanov.com${slug}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="satansdeer" />
          <meta name="twitter:title" content="Maksim Ivanov" />
          <meta name="twitter:creator" content="satansdeer" />
          <meta name="twitter:description" content={post.excerpt} />
          <meta name="twitter:image:src" content={image} />
        </Helmet>
        {post.frontmatter.title && <h1>{post.frontmatter.title}</h1>}
        <p
          style={{
            // ...scale(-1 / 5),
            display: "block",
            // marginBottom: rhythm(1),
            // marginTop: rhythm(1)
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Share
          socialConfig={{
            twitterHandle,
            config: {
              url: `${siteUrl}${slug}`,
              title
            }
          }}
          tags={[categories]}
        />
        <hr
          style={{
            // marginTop: rhythm(1),
            // marginBottom: rhythm(1)
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
        <SignUpForm/>
      </Layout>
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
        twitterHandle
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        slug
      }
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
        categories
      }
    }
  }
`;
