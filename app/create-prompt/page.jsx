'use client'

import {useState} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Form from '@components/Form'
import { Router } from 'next/router'

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false)
    const {data: session} = useSession()
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    const router = useRouter()
    const CreatePrompt = async (e) => {

        e.preventDefault();

        setSubmitting(true);
        try{
            const res  = await fetch('/api/prompt/new',{
                method:"POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                })
            })
            if(res.ok){
                router.push('/')
            }
        }catch(err){
            console.log(err)
        } finally{
            setSubmitting(false)
        }
    }
  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={CreatePrompt}
    />
  )
}

export default CreatePrompt
