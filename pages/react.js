import Link from 'next/link'
import { StructuredText } from 'react-datocms'
import { request } from '../lib/datocms'
import Layout from '../components/applayout'

const REACT_QUERY = `
query ReactPage {
  allPosts(filter: {
    category: {
      eq: 76436891
    }
  }) {
    id
    title
    content {
      value
    }
    category {
      id
      name
    }
    slug
  }
}`

export async function getStaticProps() {
  const data = await request({
    query: REACT_QUERY
  })
  return {
    props: { data },
  }
}

export default function Reactpage({ data }) {
  return (
    <Layout>
      <h2>{data.allPosts[0].category.name} Explained</h2>
      {data.allPosts.map((post) => { 
        return (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <StructuredText data={post.content} />
            <Link href={`/react/${post.slug}`}>
              <a>Read More</a>
            </Link>
          </article>
        )
      })}
    </Layout>
  )
}