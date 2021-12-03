import { request } from '../lib/datocms'
import SearchResults from '../components/searchresults'
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
        title: {
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
    }
  }
`
}

function categoryQuery(slug) {
  return `
  query CategoryQuery {
    allCategories {
      name
      slug
    }
    category(filter:
      {
        slug: {
          eq: "${slug}"
        }
      }) {
      name
      slug
      id
    }
  }
  `
}

export async function getServerSideProps(context) {
  const data = await request({
    query: queryForSearching(context.query.search),
  })
  const categoryData = await request({
    query: categoryQuery(context.params.category),
  })

  console.log(context)
  return {
    props: {
      data,
      categorySlug: categoryData.category.slug,
    },
  }
}

export default function Homepage({ data }) {
  return (
    <Layout categories={data.allCategories}>
      <div className={styles['page-wrapper']}>
        <Search />
        {/* <SearchResults posts={data.allPosts} /> */}
      </div>
    </Layout>
  )
}
