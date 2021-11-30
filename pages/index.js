import { useState } from 'react'
import { useRouter } from 'next/router'
import { request } from '../lib/datocms'
import Layout from '../components/applayout'

function queryForSearching(searchingValue) {
  return `
  query SearchQuery {
    allPosts(filter: {
        title: {
            matches: {
              pattern: "${searchingValue}"
            }
        }
    }) {
      title
      slug
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
    <Layout>
      <form onSubmit={submit}>
        <input type="text" value={searchValue} onChange={changeSearchValue} />
        <button type="submit">search</button>
      </form>
      {data.allPosts.map((post) => {
        return (
          <article className="container" key={post.id}>
            <h2>{post.title}</h2>
            <h3>{post.slug}</h3>
          </article>
        )
      })}
    </Layout>
  )
}
