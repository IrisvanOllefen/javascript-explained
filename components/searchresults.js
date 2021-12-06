import Link from 'next/link'
import { StructuredText } from 'react-datocms'
import styles from '../styles/overview.module.css'

export default function SearchResults(props) {
  const posts = props.posts
  return (
    <div className={styles['all-posts-wrapper']}>
      {posts.map((post) => {
        return (
          <article key={post.id} className={styles['post-wrapper']}>
            <div className={styles['subcategory-wrapper']}>
              <h3 className={styles['subcategory-title-in']}>In: </h3>
              <h3 className={styles['subcategory-title']}>
                {post.category.name}
              </h3>
            </div>
            <h4>{post.title}</h4>
            <details>
              <summary>Summary</summary>
              <StructuredText data={post.summary.value} />
            </details>
            <Link href={`/${post.category.slug}/${post.slug}`}>
              <a className={styles['read-more-link']}>Read More</a>
            </Link>
          </article>
        )
      })}
    </div>
  )
}
