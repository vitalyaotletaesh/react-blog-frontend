import Button from '@mui/material/Button'
import React from 'react'

import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authSelector, logout } from '../../../redux/userSlice'
import styles from './Header.module.scss'

export const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isAuth = useSelector(authSelector)

	const onClickLogout = () => {
		if (window.confirm('Вы действительно хотите выйти?')) {
			dispatch(logout())
			window.localStorage.removeItem('token')
			navigate('/login')
		}
	}

	return (
		<div className={styles.root}>
			<Container maxWidth='lg'>
				<div className={styles.inner}>
					<Link className={styles.logo} to='/'>
						<div>React Blog</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to='/posts/create'>
									<Button variant='contained'>Написать статью</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant='contained'
									color='error'
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to='/login'>
									<Button variant='outlined'>Войти</Button>
								</Link>
								<Link to='/register'>
									<Button variant='contained'>Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	)
}
