import Posts from '../../components/posts'
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
    }, orderBy: [postIndexNumber_ASC]) {
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
      subcategory {
        id
        name
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

  console.log(paths)
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
    props: {
      posts: posts.allPosts,
      allCategories: categoryData.allCategories,
      categorySlug: categoryData.category.slug,
      categoryName: categoryData.category.name,
    },
  }
}

export default function Homepage({
  allCategories,
  posts,
  categorySlug,
  categoryName,
}) {
  const newArray = []
  posts.forEach((post) => {
    if (!newArray.includes(post.subcategory.name)) {
      newArray.push(post.subcategory.name)
    }
  })

  return (
    <Layout categories={allCategories}>
      <div className={styles['overview-page--wrapper']}>
        <h2 className={styles['main-category-title']}>
          {categoryName} Explained
        </h2>
        {newArray.map((subCategoryName) => {
          const allPosts = posts.filter(
            (post) => post.subcategory.name === subCategoryName
          )
          return (
            <div key={subCategoryName}>
              <h3 className={styles['subcategory-title']}>{subCategoryName}</h3>
              <Posts posts={allPosts} categorySlug={categorySlug} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
