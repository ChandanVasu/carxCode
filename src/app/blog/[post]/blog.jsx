"use client"
import React, { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/spinner'
import Listing from "@/components/block/listing"

const Blog = ({ baseUrl, id }) => {
    const [blogPost, setBlogPost] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPost()
    }, [])

    const fetchPost = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/posts`)
            let data = await response.json()
            data = data.filter(listing => listing._id === id)
            setBlogPost(data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        )
    }

    return (
        <div>
            {blogPost.map((item) => (
                <div className=' w-full m-auto md:w-3/4 px-4 md:mpx-0' key={item._id}>
                    <div className='my-10 text-center'>
                        <h1>{item.title}</h1>
                        <p>Date: {item.date} | Category: {item.category}</p>
                    </div>
                    {item.image && (
                        <img className='w-full image-post rounded-md' src={item.image} alt="" />
                    )}
                    <div
                        className="ck-content mt-6 px-4"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                </div>
            ))}

            <div className='px-1 md:px-20'>
                <Listing />
            </div>
        </div>
    )
}

export default Blog
