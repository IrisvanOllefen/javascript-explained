import Link from 'next/link'
import styles from './layout.module.css'

export default function Footer() {
    return (
    <div className={styles['app-footer']}>
        <ul className={styles['app-footer__link-list']}>
            <li className={styles['app-footer__link']}>
                <Link href='/react'>
                    <a className={styles['app-footer__link-text']}>React Explained</a>
                </Link>
            </li>
            <li className={styles['app-footer__link']}>
                <Link href='/next-js'>
                    <a className={styles['app-footer__link-text']}>Next.js Explained</a>
                </Link>
            </li>
            <li className={styles['app-footer__link']}>
                <Link href='/vue-js'>
                    <a className={styles['app-footer__link-text']}>Vue.js Explained</a>
                </Link>
            </li>
            <li className={styles['app-footer__link']}>
                <Link href='/nuxt-js'>
                    <a className={styles['app-footer__link-text']}>Nuxt.js Explained</a>
                </Link>
            </li>
        </ul>
    </div>
    )
}