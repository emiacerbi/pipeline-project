/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import BlogForm from './BlogForm'

describe('blog form component', () => {
	test('inputs update correctly and reset on submit', async () => {
		const createBlog = jest.fn()

		render(<BlogForm createBlog={createBlog} />)

		const title = screen.getByLabelText('title')
		const author = screen.getByLabelText('author')
		const url = screen.getByLabelText('url')
		const submit = screen.getByText('create')

		await userEvent.type(title, 'Fullstack rocks')
		await userEvent.type(author, 'Emi')
		await userEvent.type(url, 'fullstackopen.com')

		expect(title.value).toBe('Fullstack rocks')
		expect(author.value).toBe('Emi')
		expect(url.value).toBe('fullstackopen.com')

		await userEvent.click(submit)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe('Fullstack rocks')
	})
})
