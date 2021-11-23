import Head from 'next/head'
import Header from './appheader'
import Footer from './appfooter'
import styles from './layout.module.css'

export default function Layout({ children }) {

    return (
        <div>
            <Head>
                <title>JavaScript Explained</title>
            </Head>
            <div className={styles['app-wrapper']}>
                <Header/>
                    <main className={styles['app-content']}>{ children }</main>
                <Footer/>
            </div>
        </div>
    )
}