import React from 'react'
import BlogPost from "./blog"
const baseUrl = process.env.BASE_URL

const page = ({params}) => {
  return (
    <div>
        <BlogPost baseUrl={baseUrl} id={params.post}></BlogPost>

    </div>
  )
}

export default page