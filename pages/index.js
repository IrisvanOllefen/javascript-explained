import { request } from '../lib/datocms'
import Layout from '../components/applayout'
import Search from '../components/search'
import Post from '../components/post'
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
        {data.allPosts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              href={`${post.category.slug}/${post.slug}`}
              showCategoryTitle={true}
            />
          )
        })}
      </div>
    </Layout>
  )
}
