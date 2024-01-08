'use client'
import { lazy, LazyExoticComponent, Suspense } from 'react'
const Blog = () => {
  // Define BlogApp as a variable that could be either a LazyExoticComponent or a function returning null
  let BlogApp: LazyExoticComponent<any> | (() => null)

  // Check if the code is running in a browser environment
  if (process.browser) {
    // If yes, use React's lazy function to load the 'app/app' module lazily
    BlogApp = lazy(() => {
      return import('app/app')
    })
  } else {
    // If not, define a NullComponent that renders nothing and assign it to BlogApp
    const NullComponent = () => null
    // Assign a displayName to NullComponent for debugging purposes
    NullComponent.displayName = 'NullComponent'
    BlogApp = NullComponent
  }

  return (
    <>
      <Suspense fallback="loading.....">
        <BlogApp />
      </Suspense>
    </>
  )
}

export default Blog
