import Link from 'next/link'
import styles from './layout.module.css'

export default function Header(props) {
  const categories = props.categories

  return (
    <div className={styles['app-header']}>
      <Link href="/" className={styles['app-header__home-link']}>
        <a className={styles['app-header__home-link-text']}>
          JavaScript Explained
        </a>
      </Link>

      <nav className={styles['app-header__nav']}>
        <ul className={styles['app-header__nav-list']}>
          {categories.map((category) => {
            return (
              <li
                className={styles['app-header__nav-link']}
                key={category.name}
              >
                <Link href={`/${category.slug}`}>
                  <a className={styles['app-header__nav-link-text']}>
                    {category.name} Explained
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
