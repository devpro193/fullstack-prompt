'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"
import { useQuery } from "@tanstack/react-query"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (<PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />)
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [searchPosts, setSearchPosts] = useState([])

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt")
    const data = await response.json()
    return data
  }

  // Queries
  const { isPending, isError, data: posts, error } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })

  useEffect(() => {
    if (posts) setSearchPosts(posts?.filter(e => {
      if (e.tag.includes(searchText.toLocaleLowerCase())) return true
      if (e.creator.username.includes(searchText.toLocaleLowerCase())) return true
    }));
  }, [searchText])

  if (isPending) return <div className="mt-16 prompt_layout">
    <div className="prompt_card_empty"></div><div className="prompt_card_empty"></div><div className="prompt_card_empty"></div></div>

  if (isError) return <p>Error Occured!</p>

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer" />
      </form>

      {searchText ? <PromptCardList data={searchPosts} /> : <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />}

    </section>
  )
}

export default Feed