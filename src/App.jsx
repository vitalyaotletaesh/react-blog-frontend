import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { getMe } from '../redux/userSlice'
import { Header } from './components'
import { AddPost, FullPost, Home, Login, NotFound, Registration } from './pages'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMe())
	}, [])

	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/posts/:id' element={<FullPost />} />
					<Route path='/posts/:id/edit' element={<AddPost />} />
					<Route path='/posts/create' element={<AddPost />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Container>
		</>
	)
}

export default App
