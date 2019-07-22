const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const categories = [
  "react",
  "javascript",
  "vscode",
  "html",
  "git",
  "ethereum",
  "reactnative",
  "graphql",
  "random",
  "programming",
  "typescript",
  "markdown",
]

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const categoriesTemplate = path.resolve("src/templates/categories.js")

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js")
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? false : posts[index + 1].node
          const next = index === 0 ? false : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        categories.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoriesTemplate,
            context: {
              category,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
