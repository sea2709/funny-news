import React from 'react'
import Masonry from 'react-masonry-component';
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview/article-preview'
import PlayView from '../components/play-view/play-view'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulPost.edges')

    return (
      <Layout location={this.props.location}>
        <div className="content">
          <div className="heading">
            <h3>#FUN</h3>
            <h5>Hope you feel relaxed while browsing these news!</h5>
          </div>

          <Masonry className="article-list" elementType="ul">
            {posts.map(article => {
              return (
                <li key={article.node.id}>
                  <ArticlePreview title={article.node.title} link={article.node.link} 
                    image={article.node.image.file.url} description={article.node.shortDescription.shortDescription}></ArticlePreview>
                </li>
              )
            })}
          </Masonry>
        </div>
        
        <div className="play-zone-wrapper">
          <PlayView />
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulPost(sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          id
          title
          shortDescription {
            shortDescription
          }
          image {
            file {
              url
            }
          }
          link
        }
      }
    }
  }
`
