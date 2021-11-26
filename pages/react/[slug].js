import { StructuredText } from 'react-datocms'
import Layout from '../../components/applayout'
import { request } from '../../lib/datocms'
import styles from '../../styles/post.module.css'

const POST_QUERY = (slug) => { 
return `
query ReactPosts {
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
        paths: data.allPosts.map((post) => `/react/${post.slug}`),
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug
    const data = await request({ query: POST_QUERY(slug) })
    return {
        props: { data },
    }
}


export default function Post({ data }) {

    console.log(data)
    
    return (
        <Layout>
                <h1 className={styles['main-post-title']}>{data.post.title}</h1>
                <article className={styles['post-wrapper']}>
                    <StructuredText data={data.post.content.value} />
                </article>
        </Layout>
    )
}