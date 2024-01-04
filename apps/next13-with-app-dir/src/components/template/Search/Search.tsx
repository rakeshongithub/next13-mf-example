import React from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'

export const revalidate = 60

//Module federation is not working in app router RSC throwing error: "Module not found: Can't resolve 'app/app'"
const BlogApp = dynamic(() => import('app/app'))

const getStaticProps = async () => {
  const res = await axios('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
  const dataRes = res.data
  return dataRes
}

async function SearchPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const dataRes = await getStaticProps()
  return (
    <>
      <BlogApp />
      <div>Testing search page - {dataRes.datetime}</div>
    </>
  )
}

export default SearchPage
