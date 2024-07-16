import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { register } from '../../../redux/userSlice'
import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom'

export const Registration = () => {
	const disptach = useDispatch()
  const navigate = useNavigate()
	const [userName, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const user = useSelector((store) => store.users.user)

  const redirectToHome = () => {return navigate('/')}

  useEffect(() => {
		if (user?.token) {
      window.localStorage.setItem('token', user.token)
			redirectToHome()
		}
	}, [user])

	const handleClickRegister = () => {
		disptach(register({userName, email, password}))
	}

	return (
		<Paper classes={{ root: styles.root }} elevation={8}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<TextField
				className={styles.field}
				label='Имя'
				fullWidth
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>
			<TextField
				className={styles.field}
				label='E-Mail'
				fullWidth
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				className={styles.field}
				label='Пароль'
				fullWidth
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button
				size='large'
				variant='contained'
				fullWidth
				onClick={handleClickRegister}
			>
				Зарегистрироваться
			</Button>
		</Paper>
	)
}
