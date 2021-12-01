import Head from 'next/head'
import Header from './appheader'
import Footer from './appfooter'
import styles from './layout.module.css'

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>JavaScript Explained</title>
      </Head>
      <div className={styles['app-wrapper']}>
        <Header categories={props.categories} />
        <main className={styles['app-content']}>{props.children}</main>
        <Footer categories={props.categories} />
      </div>
    </div>
  )
}
