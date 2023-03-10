const dummy = (blogs) => {
	return Number(blogs + 1)
}

const totalLikes = (blogs) => {
	return blogs.reduce((acc, blog) => (acc += blog.likes), 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((acc, blog) => (acc.likes > blog.likes ? acc : blog))
}

const mostBlogs = (blogs) => {
	const authorCount = []
	blogs.forEach((blog) => {
		const duplicate = authorCount.find(({ author }) => author === blog.author)
		if (duplicate) {
			duplicate.blogs++
			return
		}

		authorCount.push({
			author: blog.author,
			blogs: 1,
		})
	})

	const result = authorCount.reduce((acc, el) =>
		acc.blogs > el.blogs ? acc : el
	)

	return result
}

const mostLikes = (blogs) => {
	const authorCount = []
	blogs.forEach((blog) => {
		const duplicate = authorCount.find(({ author }) => author === blog.author)
		if (duplicate) {
			duplicate.likes += blog.likes
			return
		}

		authorCount.push({
			author: blog.author,
			likes: blog.likes,
		})
	})

	const result = authorCount.reduce((acc, el) =>
		acc.likes > el.likes ? acc : el
	)

	return result
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
