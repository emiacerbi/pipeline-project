import axios from 'axios'
import { BASE_URL } from '../constants'
const baseUrl = BASE_URL + '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject)
	return response.data
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = axios.delete(`${baseUrl}/${id}`, config)
	return response
}

export const blogServices = {
	getAll,
	create,
	update,
	setToken,
	remove,
}
