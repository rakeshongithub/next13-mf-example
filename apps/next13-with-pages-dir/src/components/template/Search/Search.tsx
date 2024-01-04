import type { GetStaticProps } from 'next'
import React, { lazy, LazyExoticComponent } from 'react'
import axios from 'axios'
import { i18nConfig } from '@/i18nConfig'

export const getStaticPaths = async () => {
  const paths = i18nConfig.locales.map((locale) => ({
    params: {
      locale,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = (async (context) => {
  const res = await axios('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
  const dataRes = res.data
  return {
    props: {
      dataRes,
      params: {
        locale: context.params?.locale,
      },
    },
    revalidate: 60,
  }
}) satisfies GetStaticProps<any>

// Define BlogApp as a variable that could be either a LazyExoticComponent or a function returning null
let BlogApp: LazyExoticComponent<any> | (() => null)

// Check if the code is running in a browser environment
if (process.browser) {
  // If yes, use React's lazy function to load the 'app/app' module lazily
  BlogApp = React.lazy(() => {
    return import('app/app')
  })
} else {
  // If not, define a NullComponent that renders nothing and assign it to BlogApp
  const NullComponent = () => null
  // Assign a displayName to NullComponent for debugging purposes
  NullComponent.displayName = 'NullComponent'
  BlogApp = NullComponent
}

const SearchPage = ({
  params: { locale },
  dataRes,
}: {
  params: { locale: string }
  dataRes: any
}) => {
  return (
    <>
      <BlogApp />
      <div>Testing search page - {dataRes.datetime}</div>
    </>
  )
}

export default SearchPage
