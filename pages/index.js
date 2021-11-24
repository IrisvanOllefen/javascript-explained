import { StructuredText } from 'react-datocms'
import { request } from '../lib/datocms'
import Layout from '../components/applayout'

const HOMEPAGE_QUERY = `
  query HomePage {
    allPosts {
      id
      title
      content {
        value
      }
      category {
        name
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
    <Layout>
      {data.allPosts.map((post) => { 
        return (
          <article className="container" key={post.id}>
            <h2>{post.title}</h2>
            <h3>{post.category.name}</h3>
            {/* <StructuredText data={post.content} /> */}
          </article>
        )
      })}
    </Layout>
  )
}