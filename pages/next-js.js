import Link from 'next/link'
import { StructuredText } from 'react-datocms'
import { request } from '../lib/datocms'
import Layout from '../components/applayout'
import styles from '../styles/overview.module.css'

const NEXT_QUERY = `
query NextPage {
  allPosts(filter: {
    category: {
      eq: 76436892
    }
  }, orderBy: [postIndexNumber_ASC]) {
    id
    title
    category {
      id
      name
    }
    subcategory {
      id
      name
    }
    content {
      value
    }
    slug
    summary {
      value
    }
  }
}`

export async function getStaticProps() {
  const data = await request({
    query: NEXT_QUERY,
  })
  return {
    props: { data },
  }
}

export default function Nextpage({ data }) {
  const subCatArray = []
  data.allPosts.forEach((post) => {
    if (!subCatArray.includes(post.subcategory.name)) {
      subCatArray.push(post.subcategory.name)
    }
  })

  return (
    <Layout>
      <h2 className={styles['main-category-title']}>
        {data.allPosts[0].category.name} Explained
      </h2>
      {subCatArray.map((subCategoryName) => {
        const subCatPosts = data.allPosts.filter(
          (post) => post.subcategory.name === subCategoryName
        )
        return (
          <>
            <h3 className={styles['subcategory-title']}>{subCategoryName}</h3>
            {subCatPosts.map((post) => {
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
          </>
        )
      })}
    </Layout>
  )
}
