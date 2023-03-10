import axios from 'axios'
import { BASE_URL } from '../constants'
const baseUrl = BASE_URL + '/api/login'

const login = async (credentials) => {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

export const loginServices = {
	login,
}
