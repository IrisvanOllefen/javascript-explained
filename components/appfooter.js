import Link from 'next/link'
import styles from './layout.module.css'

export default function Footer(props) {
  const categories = props.categories
  console.log(categories)

  return (
    <div className={styles['app-footer']}>
      <ul className={styles['app-footer__link-list']}>
        {categories.map((category) => {
          return (
            <li className={styles['app-footer__link']} key={category.name}>
              <Link href={`/${category.slug}`}>
                <a className={styles['app-footer__link-text']}>
                  {category.name} Explained
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
