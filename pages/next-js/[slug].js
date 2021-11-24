import { StructuredText } from 'react-datocms'
import Layout from '../../components/applayout'
import { request } from '../../lib/datocms'

const POST_QUERY = `
query NextPosts {
    allPosts {
        title
        slug
        content {
            value
        }
    }
}
`

export async function getStaticPaths() {
    const data = await request({ query: `{ allPosts { slug } }` })
    return {
        paths: data.allPosts.map((post) => `/next-js/${post.slug}`),
        fallback: false,
    }
}

export async function getStaticProps() {
    const data = await request({
        query: POST_QUERY
    })
    return {
        props: { data },
    }
}


export default function Post({ data }) {

    return (
        <Layout>
            <h2>{data.allPosts[0].title}</h2>
            <StructuredText data={data.allPosts[0].content.value} />
        </Layout>
    )
}