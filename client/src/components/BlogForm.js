import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [blogInput, setBlogInput] = useState({
		title: '',
		author: '',
		url: '',
	})

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setBlogInput({
			...blogInput,
			[name]: value,
		})
	}

	const handleCreate = (e) => {
		e.preventDefault()
		createBlog(blogInput)

		setBlogInput({
			title: '',
			author: '',
			url: '',
		})
	}

	return (
		<form onSubmit={handleCreate}>
			<h2>create new</h2>

			<div>
        title:
				<input
					onChange={handleChange}
					aria-label="title"
					name="title"
					value={blogInput.title}
				/>
			</div>
			<div>
        author:
				<input
					aria-label="author"
					onChange={handleChange}
					name="author"
					value={blogInput.author}
				/>
			</div>
			<div>
        url:
				<input
					aria-label="url"
					onChange={handleChange}
					name="url"
					value={blogInput.url}
				/>
			</div>

			<button id="create-blog-button" type="submit">
        create
			</button>
		</form>
	)
}

export default BlogForm
