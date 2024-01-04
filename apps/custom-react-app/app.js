import React from 'react'
import './styles.css'

const posts = [
  { title: 'First Post', content: 'This is the content of the first post.' },
  { title: 'Second Post', content: 'This is the content of the second post.' },
]

const App = () => (
  <div>
    {posts.map((post, index) => (
      <div key={index} className="blog-post">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    ))}
  </div>
)

export default App
