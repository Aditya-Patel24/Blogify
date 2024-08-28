import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPosts] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post)
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  return post ? (
    <div className='py-8 '>
      <Container>
        <div className='bg-white p-8 shadow-lg rounded-lg'>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className='py-8 text-center text-gray-600'>Post not found</div>
  )
}

export default EditPost
