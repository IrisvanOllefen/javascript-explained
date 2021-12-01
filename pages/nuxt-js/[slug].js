import { StructuredText } from 'react-datocms'
import Layout from '../../components/applayout'
import { request } from '../../lib/datocms'

const POST_QUERY = (slug) => {
  return `
query NuxtPost {
  allCategories {
    name
    slug
  }
    post(filter: {slug: { eq: "${slug}"}}) {
        title
        slug
        content {
            value
        }
    }
}
`
}

export async function getStaticPaths() {
  const data = await request({ query: `{ allPosts { slug } }` })
  return {
    paths: data.allPosts.map((post) => `/nuxt-js/${post.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  const data = await request({ query: POST_QUERY(slug) })
  return {
    props: { data },
  }
}

export default function Post({ data }) {
  console.log(data)

  return (
    <Layout categories={data.allCategories}>
      <h2>{data.post.title}</h2>
      <StructuredText data={data.post.content.value} />
    </Layout>
  )
}
