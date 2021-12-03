import { StructuredText } from 'react-datocms'

export default function SearchResults(props) {
  // const posts = props.allPosts
  return (
    <div>
      <h1>hi!</h1>
      {/* {posts.map((post) => {
        return (
          <article key={post.id}>
            <h3>{post.category.name}</h3>
            <h4>{post.title}</h4>
            <details>
              <summary>Summary</summary>
              <StructuredText data={post.summary} />
            </details>
          </article>
        )
      })} */}
    </div>
  )
}
