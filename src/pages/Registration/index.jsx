import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { fetchRegister, authSelector } from '../../../redux/userSlice'

export const Registration = () => {
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
			userName: '',
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
			fetchRegister({
				userName: data.userName,
				email: data.email,
				password: data.password,
			})
		)

		if (!res.payload) {
			return alert('Не удалось зарегистрироваться')
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
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label='Имя'
					fullWidth
					error={Boolean(errors.userName?.message)}
					helperText={errors.userName?.message}
					{...register('userName', { required: 'Укажите имя' })}
				/>
				<TextField
					className={styles.field}
					label='E-Mail'
					fullWidth
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type='email'
					{...register('email', { required: 'Укажите почту' })}
				/>
				<TextField
					className={styles.field}
					label='Пароль'
					fullWidth
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					type='password'
					{...register('password', { required: 'Укажите пароль' })}
				/>
				<Button
					type='submit'
					size='large'
					variant='contained'
					fullWidth
				>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	)
}
