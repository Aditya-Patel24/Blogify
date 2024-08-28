import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import spinner from '../assets/spinner1.gif';
function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await appwriteService.getPosts([])
        if (postsResponse) {
          setPosts(postsResponse.documents)
        }
      } catch (error) {
        console.error("Failed to fetch posts", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])
   const mystyle={
    color: "#5ce1e6",
    fontFamily: "Arial",
   
}
  return (
    <div className='w-full py-8 '>
      <Container>
      <div className="text-center mb-10">
          <h1 className="text-4xl font-bold "style={mystyle}>All Posts</h1>
          <p className="text-lg text-gray-500 mt-2">Browse through our latest posts.</p>
        </div>
        {loading ? (
            <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900'>
          <img src={spinner} alt="Loading..." className="w-64 h-64" />
          </div>
        ) : (
          <div className='flex flex-wrap'>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.$id} className='p-4 w-full sm:w-1/2 lg:w-1/3'>
                  <PostCard
                    slug={post.slug}
                    title={post.title}
                    feturedImage={post.feturedImage}
                    handleImageError={(e) => {
                      e.target.src = '/fallback-image.jpg'
                      console.error("Image failed to load:", e)
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 w-full">No posts found</div>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
