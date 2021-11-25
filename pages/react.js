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
    category {
      id
      name
    }
    subcategory {
      id
      name
    }
    content {
      value
    }
    slug
    summary {
      value
    }
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

  const ReactBasics = data.allPosts.filter((post) => post.subcategory.name === "React Basics" )
  const ReactConcepts = data.allPosts.filter((post) => post.subcategory.name === "React Concepts" )
  const ReactHooks = data.allPosts.filter((post) => post.subcategory.name === "React Hooks" )
  const ReactDeepDive = data.allPosts.filter((post) => post.subcategory.name === "Deep Dive" )

  return (
    <Layout>
      <h2>{data.allPosts[0].category.name} Explained</h2>
      <h3 className="subcat-title">{ReactBasics[0].subcategory.name}</h3>
      {ReactBasics.map((post) => { 
        return (
          <article key={post.id}>
            <h4 className="post-title">{post.title}</h4>
            <details> 
              <summary>Summary</summary> 
              <StructuredText data={post.summary} /> 
            </details>
            <Link href={`/react/${post.slug}`}>
              <a className="more-link">Read More</a>
            </Link>
          </article>
        )
      })}
      <h3 className="subcat-title">{ReactConcepts[0].subcategory.name}</h3>
      {ReactConcepts.map((post) => { 
        return (
          <article key={post.id}>
            <h4 className="post-title">{post.title}</h4>
            <details> 
              <summary>Summary</summary> 
              <StructuredText data={post.summary} /> 
            </details>
            <Link href={`/react/${post.slug}`}>
              <a className="more-link">Read More</a>
            </Link>
          </article>
        )
      })}
      <h3 className="subcat-title">{ReactHooks[0].subcategory.name}</h3>
      {ReactHooks.map((post) => { 
        return (
          <article key={post.id}>
            <h4 className="post-title">{post.title}</h4>
            <details> 
              <summary>Summary</summary> 
              <StructuredText data={post.summary} /> 
            </details>
            <Link href={`/react/${post.slug}`}>
              <a className="more-link">Read More</a>
            </Link>
          </article>
        )
      })}
      <h3 className="subcat-title">{ReactDeepDive[0].subcategory.name}</h3>
      {ReactDeepDive.map((post) => { 
        return (
          <article key={post.id}>
            <h4 className="post-title">{post.title}</h4>
            <details> 
              <summary>Summary</summary> 
              <StructuredText data={post.summary} /> 
            </details>
            <Link href={`/react/${post.slug}`}>
              <a className="more-link">Read More</a>
            </Link>
          </article>
        )
      })}
    </Layout>
  )
}