import React from "react"
import { withPrefix } from 'gatsby'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"

const BioPage = ({ data }) => (
    <Layout>
        <article>
            <h1>{data.nodeArticle.title}</h1>
            {<i><p className="publication-date">{data.nodeArticle.created}</p></i>}
            <Img
                style={{
                    maxWidth: '500px',
                }}
                fluid={data.nodeArticle.relationships.field_featured_image.relationships.field_media_image.localFile.childImageSharp.fluid}
            />
            <div class="details" style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1em 0',
            }}>

                <span>Author: {data.nodeArticle.relationships.field_author.name}</span>
                <span>Magazine Issue: {data.nodeArticle.relationships.field_issue.name}</span>

            </div>

            <span dangerouslySetInnerHTML={{__html: data.nodeArticle.body.processed}}></span>
        </article>
    </Layout>
)

export const query = graphql`
  query($slug: String!) {
    nodeArticle (fields: { slug: { eq: $slug } }) {
      id
      title
      body {
          processed
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
              id
              filename
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500) {
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
`

export default BioPage
