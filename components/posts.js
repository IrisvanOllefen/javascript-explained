import Link from 'next/link'
import { StructuredText } from 'react-datocms'
import styles from '../styles/overview.module.css'

export default function Posts(props) {
  const posts = props.posts
  const categorySlug = props.categorySlug
  return (
    <div className={styles['all-posts-wrapper']}>
      {posts.map((post) => {
        return (
          <article key={post.id} className={styles['post-wrapper']}>
            <h4>{post.title}</h4>
            <details>
              <summary>Summary</summary>
              <StructuredText data={post.summary} />
            </details>
            <Link href={`/${categorySlug}/${post.slug}`}>
              <a className={styles['read-more-link']}>Read More</a>
            </Link>
          </article>
        )
      })}
    </div>
  )
}