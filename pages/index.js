import { request } from '../lib/datocms'
import Layout from '../components/applayout'
import Search from '../components/search'
import SearchResults from '../components/searchresults'

const ALL_CATEGORIES_QUERY = `
query AllCategories {
  allCategories {
    id
    name
    slug
  }
}
`

function getAllPosts(categoryId) {
  return `
    query AllPosts {
      allPosts(filter: {
        category: {
          eq: "${categoryId}"
        }
      }, orderBy: [postIndexNumber_ASC]) {
        id
        title
        slug
        summary {
          value
        }
        category {
          name
        }
        subcategory {
          name
        }
      }
    }
  `
}

export async function getStaticProps() {
  const data = await request({
    query: ALL_CATEGORIES_QUERY,
  })

  // data.allCategories.forEach((category) => {
  //   console.log(category.id)
  //   return category.id
  // })

  console.log(data.allCategories)

  const allPosts = await request({
    query: getAllPosts(8104893),
  })

  return {
    props: { data, allPosts },
  }
}

export default function Homepage({ data, allPosts }) {
  // const newArray = []
  // allPosts.forEach((post) => {
  //   if (!newArray.includes(post.subcategory.name)) {
  //     newArray.push(post.subcategory.name)
  //   }
  // })
  return (
    <Layout categories={data.allCategories}>
      <h1>hi</h1>
      <Search />
      <SearchResults posts={allPosts} />
    </Layout>
  )
}
