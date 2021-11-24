import Link from 'next/link'
import { StructuredText } from 'react-datocms'
import { request } from '../lib/datocms'
import Layout from '../components/applayout'

const NEXT_QUERY = `
query NextPage {
  allPosts(filter: {
    category: {
      eq: 76436892
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
    query: NEXT_QUERY
  })
  return {
    props: { data },
  }
}

export default function Nextpage({ data }) {
  return (
    <Layout>
      <h2>{data.allPosts[0].category.name} Explained</h2>
      {data.allPosts.map((post) => { 
        return (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <StructuredText data={post.content} />
            <Link href={`/next-js/${post.slug}`}>
              <a>Read More</a>
            </Link>
          </article>
        )
      })}
    </Layout>
  )
}