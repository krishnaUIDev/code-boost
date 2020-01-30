import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

const Topics = () => {
  const data = useStaticQuery(graphql`
    {
      allTopicsJson {
        edges {
          node {
            name
            slug
            image {
              childImageSharp {
                fluid(maxWidth: 240, maxHeight: 240) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)
  let topics = data.allTopicsJson.edges

  return (
    <div className="Topics">
      {topics.map(({ node: item }) => (
        <Topic
          key={item.name}
          name={item.name}
          slug={item.slug}
          image={item.image}
        />
      ))}
    </div>
  )
}
const Topic = ({ name, slug, image }) => {
  return (
    <Link to="/javascript" className="Topic">
      <div>
        <Image
          className="Topic__image"
          fluid={image.childImageSharp.fluid}
          alt={name}
        />
        <h3 className="Topic__name">{name}</h3>
      </div>
    </Link>
  )
}
export default Topics
