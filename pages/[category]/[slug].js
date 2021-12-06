import { StructuredText } from 'react-datocms'
import Image from 'next/image'
import Layout from '../../components/applayout'
import { request } from '../../lib/datocms'
import styles from '../../styles/post.module.css'

const POST_QUERY = (slug) => {
  return `
query NextPost {
    allCategories {
        name
        slug
      }
    post(filter: {slug: { eq: "${slug}"}}) {
        title
        slug
        content {
            value
            blocks {
              __typename
              ... on ImageBlockRecord {
                id
                image { 
                  url
                  alt
                  width
                  height
                }
              }
            }
        }
    }
}
`
}

export async function getStaticPaths() {
  const data = await request({
    query: `query AllPosts {
      allPosts(first: 100) {
        slug,
        category {
          slug
        }
      }
    }`,
  })

  return {
    paths: data.allPosts.map((post) => {
      return {
        params: {
          category: post.category.slug,
          slug: post.slug,
        },
      }
    }),
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
  return (
    <Layout categories={data.allCategories}>
      <div className={styles['complete-post-wrapper']}>
        <h2 className={styles['main-post-title']}>{data.post.title}</h2>
        <div className={styles['post-wrapper']}>
          <StructuredText
            data={data.post.content}
            renderBlock={({ record }) => {
              switch (record.__typename) {
                case 'ImageBlockRecord':
                  return (
                    <Image
                      src={record.image.url}
                      alt={record.image.alt}
                      width={record.image.width}
                      height={record.image.height}
                    />
                  )
                default:
                  return null
              }
            }}
          />
        </div>
      </div>
    </Layout>
  )
}
