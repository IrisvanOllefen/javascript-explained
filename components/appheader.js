import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { useState } from 'react'
import styles from './layout.module.css'

export default function Header() {

    return (
        <div className={styles['app-header']}>
            <Link href="/" className={styles['app-header__home-link']}> 
                <a className={styles['app-header__home-link-text']}>JavaScript Explained</a>
            </Link>
            <nav className={styles['app-header__nav']}>
                <ul className={styles['app-header__nav-list']}>
                    <li className={styles['app-header__nav-link']}>
                        <Link href='/react'>
                            <a className={styles['app-header__nav-link-text']}>React Explained</a>
                        </Link>
                    </li>
                    <li className={styles['app-header__nav-link']}>
                        <Link href='/next-js'>
                            <a className={styles['app-header__nav-link-text']}>Next.js Explained</a>
                        </Link>
                    </li>
                    <li className={styles['app-header__nav-link']}>
                        <Link href='/vue-js'>
                            <a className={styles['app-header__nav-link-text']}>Vue.js Explained</a>
                        </Link>
                    </li>
                    <li className={styles['app-header__nav-link']}>
                        <Link href='/nuxt-js'>
                            <a className={styles['app-header__nav-link-text']}>Nuxt.js Explained</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}