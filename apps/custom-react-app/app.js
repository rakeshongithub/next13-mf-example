import React, { createContext, useContext } from 'react'
import './styles.css'

const posts = [
  { title: 'First Post', content: 'This is the content of the first post.' },
  { title: 'Second Post', content: 'This is the content of the second post.' },
]
const Context = createContext(null)
const ContextProvider = ({ children }) => {
  return <Context.Provider value={{ posts }}>{children}</Context.Provider>
}

const Posts = () => {
  // If you uncomment this useContext line app will break in both app and page router.
  // const { posts } = useContext(Context)

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="blog-post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
const App = () => {
  return (
    <ContextProvider>
      <Posts />
    </ContextProvider>
  )
}

export default App
