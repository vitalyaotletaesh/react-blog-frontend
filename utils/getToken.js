import { useSelector } from 'react-redux'

export const getToken = () => {
	// return useSelector(store => store.users?.user?.token) || ''
	return window.localStorage.getItem('token')
}