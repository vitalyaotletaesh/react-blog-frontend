import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authSelector, login } from '../../../redux/userSlice'
import styles from './Login.module.scss'

export const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const auth = useSelector(authSelector)
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const redirectToHome = () => {
		return navigate('/')
	}

	const onSubmit = async (data) => {
		const res = await dispatch(
			login({ email: data.email, password: data.password })
		)

		if (!res.payload) {
			return alert('Не удалось авторизоваться')
		}
		if ('token' in res.payload) {
			window.localStorage.setItem('token', res.payload.token)
		}
	}

	useEffect(() => {
		auth && redirectToHome()
	}, [auth])

	return (
		<Paper classes={{ root: styles.root }} elevation={8}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label='E-Mail'
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type='email'
					{...register('email', { required: 'Укажите почту' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label='Пароль'
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					type='password'
					{...register('password', { required: 'Укажите пароль' })}
					fullWidth
				/>
				<Button type='submit' size='large' variant='contained' fullWidth>
					Войти
				</Button>
			</form>
		</Paper>
	)
}
