/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('blog component', () => {
  let component
  let blog = {
    title: 'Testing Blog',
    author: 'Emi',
    url: 'https://emi.com',
    likes: 23,
  }

  let mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} handleLike={mockHandler} />)
  })

  // eslint-disable-next-line quotes
  test("doesn't show url and likes by default", () => {
    const container = component.container
    expect(container).toHaveTextContent(blog.author)
    expect(container).toHaveTextContent(blog.title)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
  })

  test('should show likes and url after clicking the view button', async () => {
    const container = component.container
    await userEvent.click(component.getByText('view'))
    expect(container).toHaveTextContent(blog.likes)
    expect(container).toHaveTextContent(blog.url)
  })

  test('like button should trigger twice if clicked twice', async () => {
    const viewButton = component.getByText('view')
    await userEvent.click(viewButton)
    const likeButton = component.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
