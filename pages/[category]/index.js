import Link from 'next/link'
import { StructuredText } from 'react-datocms'
import { request } from '../../lib/datocms'
import Layout from '../../components/applayout'
import styles from '../../styles/overview.module.css'

const ALL_CATEGORIES_QUERY = `
query AllCategories {
  allCategories {
    slug
  }
}

`

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

function postsByCategoryQuery(categoryId) {
  return `
  query PostQuery {
    allPosts(filter: {
      category: {
        eq: "${categoryId}"
      }
    }) {
      id
      title
      slug
      summary {
        value
      }
      category {
        name
        id
      }
    }
  }
`
}

export async function getStaticPaths() {
  const data = await request({
    query: ALL_CATEGORIES_QUERY,
  })

  const paths = data.allCategories.map((category) => {
    return {
      params: {
        category: category.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const categoryData = await request({
    query: categoryQuery(context.params.category),
  })

  const posts = await request({
    query: postsByCategoryQuery(categoryData.category.id),
  })

  return {
    props: { posts: posts.allPosts, allCategories: categoryData.allCategories },
  }
}

export default function Homepage({ allCategories, posts }) {
  // console.log(data)
  return (
    <Layout categories={allCategories}>
      <div className={styles['page-wrapper']}>
        <div className={styles['all-posts-wrapper']}>
          {posts.map((post) => {
            return (
              <article key={post.id} className={styles['post-wrapper']}>
                <h4>{post.title}</h4>
                <details>
                  <summary>Summary</summary>
                  <StructuredText data={post.summary} />
                </details>
                <Link href={`/react/${post.slug}`}>
                  <a className={styles['read-more-link']}>Read More</a>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
