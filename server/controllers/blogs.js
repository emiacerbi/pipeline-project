const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (blog) {
      return response.json(blog)
    }
    return response.status(404).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  try {
    if (!body.title || !body.url)
      return response.status(400).json({ error: 'title or url is missing' })

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const user = request.user

  try {
    const blog = await Blog.findById(id)

    if (blog && blog.user.toString() === user.id) {
      const deletedBlog = await Blog.findByIdAndRemove(id)
      response.status(200).json(deletedBlog)
    } else {
      // eslint-disable-next-line quotes
      response.status(404).json({ error: "that blog doesn't exist" })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        author,
        url,
        likes,
      },
      { new: true, runValidators: true, context: 'query' }
    )
    response.status(200).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
