'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Form from "@components/Form";

const CretePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })

  const router = useRouter()
  const { data: session } = useSession()

  const craetePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const reponse = await fetch('/api/prompt/new', {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if (reponse.ok) router.push('/')
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={craetePrompt} />
  )
}


export default CretePrompt