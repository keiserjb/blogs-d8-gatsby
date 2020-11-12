import React from "react"
import { Link } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
import Img from "gatsby-image"



const BiosTeaser = ({articleTitle, articleDate, articleAuthor, articleIssue, imgFluid, recipeSlug}) => (

        <div>
            <Link to={recipeSlug}>
            <h2>{articleTitle}</h2>
            </Link>
            <Img
                style={{
                    maxWidth: '600px',
                }}
                fluid={imgFluid}
            />
            <br />
            <p>Author: {articleAuthor}</p>
            <p>Magazine issue: {articleIssue}</p>
            <p>{articleDate}</p>
            <br />
        </div>


)



export default BiosTeaser