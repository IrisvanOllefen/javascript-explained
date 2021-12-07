import { request } from '../lib/datocms'
import Posts from '../components/posts'
import Layout from '../components/applayout'
import Search from '../components/search'
import styles from '../styles/overview.module.css'

function queryForSearching(searchingValue) {
  return `
  query SearchQuery {
    allCategories {
      name
      slug
    }
    allPosts(filter: {
      content: {
        matches: {
          pattern: "${searchingValue}"
        }
      }
    }) {
      id
      title
      slug
      summary {
        value
      }
      category {
        slug
        name
      }
      content {
        value
      }
    }
  }
`
}

export async function getServerSideProps(context) {
  const data = await request({
    query: queryForSearching(context.query.search),
  })

  return {
    props: {
      data,
    },
  }
}

export default function Homepage({ data }) {
  return (
    <Layout categories={data.allCategories}>
      <div className={styles['page-wrapper']}>
        <Search />
        <Posts posts={data.allPosts} />
      </div>
    </Layout>
  )
}
