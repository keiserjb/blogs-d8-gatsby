import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import BiosTeaser from "../components/bios-teaser";

const BiosListing = ({ data }) => (
  <Layout>
      <SEO title="Bios Listing" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Bios</h1>
      { data.allNodeArticle.edges.map((article) => (
          <BiosTeaser
              key={article.node.id}
              articleDate={article.node.created}
              articleTitle={article.node.title}
              articleAuthor={article.node.relationships.field_author.name}
              articleIssue={article.node.relationships.field_issue.name}
              imgFluid={article.node.relationships.field_featured_image.relationships.field_media_image.localFile.childImageSharp.fluid}
              recipeSlug={article.node.fields.slug}

          />
      ) )}

  </Layout>
)

export const query = graphql`
  {
    allNodeArticle(filter: {relationships: {field_article: {elemMatch: {name: {eq: "Bios"}}}}}, sort: {fields: [created], order:DESC}) {
      edges {
        node {
          id
          title
          fields {
            slug
          } 
          created(formatString: "MMMM Do, YYYY")
          relationships {
            field_author {
              name
            }
            field_issue {
              name
            }
            field_featured_image {
              relationships {
                field_media_image {
                  localFile {
                    childImageSharp {
                      fluid (maxWidth: 600) {
                        ...GatsbyImageSharpFluid
                      }  
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default BiosListing
