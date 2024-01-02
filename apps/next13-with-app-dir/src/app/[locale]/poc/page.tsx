// `app` directory

import { MMDDYYYY } from "../../../utils/dateTime"

async function getPosts() {
  console.log('============> init getPosts data call')
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, { next: { revalidate: 60 } })
  const data = await res.json()
  console.log(MMDDYYYY, '222222============> init getPosts data call')
  
  return {
      postsData: data,
      dataTime: MMDDYYYY
  }
}
  
export default async function Poc() {
  console.log('============> init POC Page')
  const response = await getPosts();
  const {postsData, dataTime} = response;
  
  return postsData && postsData.map((post: any) => <div key={post.title}>{dataTime} - {post.title}</div>)
}