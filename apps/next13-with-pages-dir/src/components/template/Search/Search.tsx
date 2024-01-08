import type { GetStaticProps } from 'next'
import React from 'react'
import axios from 'axios'
import { i18nConfig } from '@/i18nConfig'
import BlogApp from './Blog'

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
