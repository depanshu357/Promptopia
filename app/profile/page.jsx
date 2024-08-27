'use client'

import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Profile from '@components/Profile'

const profile = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [posts, setPosts] = useState([])
  useEffect(() => {
    // console.log("running", session?.user.id)
    if(!session?.user.id) return;
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts();
  }, [session])
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if(hasConfirmed){
      try{
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })
        setPosts(posts.filter((p) => p._id !== post._id))
      }catch(err){
        console.log(err)
      }
    }
  }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data = {posts}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
    />
  )
}

export default profile
