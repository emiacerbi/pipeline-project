export function sortByLikes(blogs) {
  return blogs.sort((a, b) => b.likes - a.likes)
}
