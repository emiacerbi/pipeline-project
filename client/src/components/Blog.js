import React, { useState } from 'react'
import { blogServices } from '../services/blogs'

const Blog = ({ blog, handleLike, setBlogs, setMessage }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  const handleRemove = async (id) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const response = await blogServices.remove(id)
        console.log(response)
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
        setMessage({
          text: `${blog.title} by ${blog.author} removed succesfully`,
          isError: false,
        })
      }
    } catch (error) {
      setMessage({
        text: 'You are not allowed the remove this blog',
        isError: true,
      })
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        <span>{blog.title}</span>
        <span> {blog.author} </span>
        <button id="view-button" onClick={handleClick}>
          {isVisible ? 'hide' : 'view'}
        </button>
        {isVisible && (
          <div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}{' '}
              <button id="like-button" onClick={() => handleLike(blog.likes)}>
                like
              </button>
            </div>
            <div>{blog.author} </div>

            <button onClick={() => handleRemove(blog.id)}>remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
