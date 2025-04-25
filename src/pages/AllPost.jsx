import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../component'
import appwriteService from "../appwrite/Config"

function AllPost() {
    const [Post, setPost] = useState([])

    useEffect(() => { }, [])
    appwriteService.getPost([]).then((post) => {
        if (Post) {
            setPost(Post.documents)
        }
    })
    return (
        <div className=' w-full py-8'><Container>
            <div className=' flex flex-wrap'> {Post.map((post) => (
                <div key={post.$id}>
                    <PostCard post={post} className="p-2 w-1/4"></PostCard>
                </div>
            ))}</div>
        </Container></div>
    )
}

export default AllPost;