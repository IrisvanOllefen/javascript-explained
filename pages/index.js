import { StructuredText } from 'react-datocms'
import { request } from '../lib/datocms'

const HOMEPAGE_QUERY = `
  query HomePage {
    allPosts {
      id
      title
      content {
        value
      }
    }
  }`

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY
  })
  return {
    props: { data },
  }
}

export default function Homepage({ data }) {
  return (
    <div>
      {data.allPosts.map((post) => { 
        return (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <StructuredText data={post.content} />
          </article>
        )
      })}
    </div>
  )
}