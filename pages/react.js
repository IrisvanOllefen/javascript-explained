import Link from 'next/link'
import { StructuredText } from 'react-datocms'
import { request } from '../lib/datocms'
import Layout from '../components/applayout'
import styles from '../styles/overview.module.css'

const REACT_QUERY = `
query ReactPage {
  allPosts(filter: {
    category: {
      eq: 76436891
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
    query: REACT_QUERY
  })
  return {
    props: { data },
  }
}

export default function Reactpage({ data }) {

  const newArr1 = []
  data.allPosts.forEach((post) => {
    if (!newArr1.includes(post.subcategory.name)) {
      newArr1.push(post.subcategory.name)
    }
    })

  return (
    <Layout>
      <h2 className={styles['main-category-title']}>{data.allPosts[0].category.name} Explained</h2>
      {newArr1.map((categoryName) => {
        const posts = data.allPosts.filter((post) => post.subcategory.name === categoryName )
        return <>
          <h3 className={styles['subcategory-title']}>{categoryName}</h3>
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
        </>
      })}
    </Layout>
  )
}