import Link from 'next/link'
import { StructuredText } from 'react-datocms'
import styles from '../styles/overview.module.css'

export default function Post({ post, href, showCategoryTitle = false }) {
  return (
    <div className={styles['all-posts-overview-wrapper']}>
      <article className={styles['single-post-overview-wrapper']}>
        {showCategoryTitle ? (
          <div className={styles['subcat-title-wrapper']}>
            <h3 className={styles['subcategory-title-in']}>In:</h3>
            <h3 className={styles['subcategory-title']}>
              {post.category.name}
            </h3>
          </div>
        ) : null}
        <h4>{post.title}</h4>
        <details>
          <summary>Summary</summary>
          <StructuredText />
        </details>
        <Link href={href}>
          <a className={styles['read-more-link']}>Read More</a>
        </Link>
      </article>
    </div>
  )
}
