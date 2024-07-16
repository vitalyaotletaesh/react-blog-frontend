import axios from 'axios'
import { getToken } from './utils/getToken'

const instance = axios.create({
	baseURL: 'http://localhost:4444',
	headers: {
		Authorization: `Bearer ${getToken()}`,
	},
})

// Второй вариант вшить токен
// instance.interceptors.request.use((config) => {
// 	config.headers.Authorization = window.localStorage.getItem('token')
// 	return config
// })

export default instance
