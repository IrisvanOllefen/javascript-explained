import { request } from '../lib/datocms'

const HOMEPAGE_QUERY = `
  query HomePage {
    allPosts {
      title
    }
  }`

console.log(HOMEPAGE_QUERY)

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
        return post.title
      })}
    </div>
  )
}