const path = require(`path`)
const transliteration = require('transliteration')

// Create a slug for each article and set it as a field on the node.
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `node__article`) {
        const slugFragment = transliteration.slugify(node.title)
        const slug = `/article/${slugFragment}/`
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const biosTemplate = path.resolve(`src/templates/bio-page.js`)
        // Query for recipe nodes to use in creating pages.
        resolve(
            graphql(
                `
          {
            allNodeArticle(filter: {relationships: {field_article: {elemMatch: {name: {eq: "Bios"}}}}}) {
              edges {
                node {
                  title
                  fields {
                    slug
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

                // Create pages for each article.
                result.data.allNodeArticle.edges.forEach(({ node }) => {
                    createPage({
                        path: node.fields.slug,
                        component: biosTemplate,
                        context: {
                            slug: node.fields.slug,
                        },
                    })
                })
            })
        )
    })
}