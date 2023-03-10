import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import { blogServices } from './services/blogs'
import './index.css'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import { sortByLikes } from './helpers/sortByLikes'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState({
		text: '',
		isError: false,
	})

	const noteFormRef = useRef()

	const fetchBlogs = async () => {
		const blogs = await blogServices.getAll()
		setBlogs(blogs)
	}

	useEffect(() => {
		fetchBlogs()
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('blogListUser')

		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogServices.setToken(user.token)
		}
	}, [])

	const handleLogout = () => {
		setUser(null)
		window.localStorage.clear()
	}

	const handleLike = async (blog) => {
		const newBlog = {
			...blog,
			likes: blog.likes + 1,
		}

		const response = await blogServices.update(blog.id, newBlog)

		setBlogs((prevBlogs) =>
			prevBlogs.map((blog) =>
				blog.id === response.id ? { ...blog, likes: blog.likes + 1 } : blog
			)
		)
	}

	const createBlog = async (blogInput) => {
		try {
			noteFormRef.current.toggleVisibility()
			const response = await blogServices.create(blogInput)
			setBlogs((prevBlogs) => prevBlogs.concat(response))

			setMessage({
				text: `a new blog ${response.title} added`,
				isError: false,
			})
		} catch (error) {
			setMessage({
				text: 'URL or Author missing',
				isError: true,
			})
		} finally {
			setTimeout(() => {
				setMessage({
					text: '',
					isError: false,
				})
			}, 3000)
		}
	}

	if (user === null) {
		return (
			<div>
				<h1>Bloglist app</h1>
				<Togglable buttonLabel="log in">
					<Login setUser={setUser} message={message} setMessage={setMessage} />
				</Togglable>
			</div>
		)
	}

	return (
		<div>
			<h1>Bloglist app</h1>

			<div>
				<span>{user.name} logged in</span>{' '}
				<button onClick={handleLogout}>logout</button>
			</div>

			<Notification message={message} />

			<Togglable buttonLabel="new blog" ref={noteFormRef}>
				<BlogForm
					createBlog={createBlog}
					setBlogs={setBlogs}
					setMessage={setMessage}
				/>
			</Togglable>

			{sortByLikes(blogs).map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					setBlogs={setBlogs}
					handleLike={() => handleLike(blog)}
					setMessage={setMessage}
				/>
			))}
		</div>
	)
}

export default App
