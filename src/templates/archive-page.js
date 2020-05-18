import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Trending from "../components/trending"
import Topics from "../components/topics"
import Card from "../components/card"
import Sidebar from "../components/sidebar"
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa"

const PageContainer = styled.div`
  display: flex;
  padding-top: 20px;
  .pageContent {
    max-width: 1040px;
    @media (max-width: 1200px) {
      max-width: 100%;
    }
  }

  & .paginationLinks {
    width: 420px;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 600px) {
      width: 92%;
    }
  }

  & .paginationLinks a:hover {
    transform: translateY(2px);
  }
  & .paginationDisabled {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.32), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
    color: ${props => props.theme.mediumLight};
    padding: 14px 22px;
    font-size: 17px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`

class Archive extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { numPages, limit, skip, currentPage } = pageContext
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle} pageType="Home">
        <PageContainer>
          <div className="pageContent">
            <SEO
              title="Code-Boost Tutorials"
              canonical={`https://www.code-boost.com/`}
            />
            <h2>Tutorials</h2>
            <div className="Cards-layout">
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <Card
                    key={node.fields.slug}
                    title={title}
                    slug={node.fields.slug}
                    datePublished={node.frontmatter.datePublished}
                    description={node.frontmatter.description}
                    excerpt={node.excerpt}
                    frontmatter={node.frontmatter}
                  />
                )
              })}
            </div>
            <div className="paginationLinks">
              {currentPage === 1 && (
                <div to="/archive" disabled className="paginationDisabled">
                  <FaAngleDoubleLeft />
                  <span>Previous</span>
                </div>
              )}
              {currentPage === 2 && (
                <Link to="/archive" className="paginationLink">
                  <FaAngleDoubleLeft />
                  <span>Previous</span>
                </Link>
              )}
              {currentPage > 2 && (
                <Link
                  to={`/archive/${currentPage - 1}`}
                  className="paginationLink"
                >
                  <FaAngleDoubleLeft />
                  <span>Previous</span>
                </Link>
              )}
              {currentPage < numPages && (
                <Link
                  to={`/archive/${currentPage + 1}`}
                  className="paginationLink"
                >
                  <span>Next</span>
                  <FaAngleDoubleRight />
                </Link>
              )}
            </div>
            {}
          </div>
          {/* <Sidebar /> */}
        </PageContainer>
      </Layout>
    )
  }
}

export default Archive

export const pageQuery = graphql`
  query archiveQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___datePublished], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            datePublished(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            category
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
