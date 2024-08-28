import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  const mystyle={
    color: "#5ce1e6",
    fontFamily: "Arial",
   
}
  return (
    <div className='py-8 '>
      <Container>
        <div className='bg-white p-8 shadow-lg rounded-lg'>
      <div className="text-center mb-10">
          <h1 className="text-4xl font-bold "style={mystyle}>Add Post</h1>
        </div>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost
