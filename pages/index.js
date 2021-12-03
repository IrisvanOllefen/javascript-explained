import { useState } from 'react'
import { useRouter } from 'next/router'
import { request } from '../lib/datocms'
import Post from '../components/post'
import Layout from '../components/applayout'
import styles from '../styles/overview.module.css'

function queryForSearching(searchingValue) {
  return `
  query SearchQuery {
    allCategories {
      name
      slug
    }
    allPosts(filter: {
        title: {
            matches: {
              pattern: "${searchingValue}"
            }
        }
    }) {
      id
      title
      slug
      summary {
        value
      }
    }
  }
`
}

export async function getServerSideProps(context) {
  const data = await request({
    query: queryForSearching(context.query.search),
  })
  return {
    props: { data },
  }
}

export default function Homepage({ data }) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  function changeSearchValue(event) {
    setSearchValue(event.target.value)
  }

  function submit(event) {
    event.preventDefault()
    router.push(`/?search=${searchValue}`)
  }

  return (
    <Layout categories={data.allCategories}>
      <div className={styles['page-wrapper']}>
        <h2>Search for a specific post:</h2>
        <form onSubmit={submit} className={styles['search-form']}>
          <input
            type="text"
            value={searchValue}
            onChange={changeSearchValue}
            className={styles['text-input']}
          />
          <button type="submit" className={styles['search-button']}>
            search
          </button>
        </form>
        <Post posts={data.allPosts} />
      </div>
    </Layout>
  )
}
