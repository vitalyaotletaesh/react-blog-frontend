import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import 'easymde/dist/easymde.min.css'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../../axios'
import { authSelector } from '../../../redux/userSlice'
import styles from './AddPost.module.scss'

export const AddPost = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const auth = useSelector(authSelector)
	const [imageUrl, setImageUrl] = useState('')
	const [value, setValue] = useState('')
	const [name, setName] = useState('')
	const [tags, setTags] = useState('')
	const inputFileRef = useRef(null)
	const isEditMode = Boolean(id)

	useEffect(() => {
		console.log('img', imageUrl)
		if (!auth && !window.localStorage.getItem('token')) {
			redirectToHome()
		}
	}, [])

	const handleChangeFile = async (e) => {
		try {
			const formData = new FormData()
			formData.append('image', e.target.files[0])
			const { data } = await axios.post('/upload', formData)
			setImageUrl(data.url)
			console.log(data.url, ' aaaaaaaaaaaaaaaaa')
		} catch (error) {
			console.warn(error)
			alert('Ошибка при загрузке файла')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
		inputFileRef.current.value = ''
	}

	const onChange = React.useCallback((value) => {
		setValue(value)
	}, [])

	const redirectToHome = () => {
		return navigate('/')
	}

	const onSubmit = async () => {
		try {
			const fields = {
				name: name,
				text: value,
				postImg: isEditMode
					? imageUrl
					: imageUrl
					? import.meta.env.VITE_API_URL + imageUrl
					: '',
				tags: tags.split(','),
			}
			const { data } = isEditMode
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields)
			const _id = isEditMode ? id : data.post._id
			navigate(`/posts/${_id}`)
		} catch (error) {
			console.warn(error)
			isEditMode
				? alert('Не удалось обновить статью')
				: alert('Не удалось создать статью')
		}
	}

	const fetchPost = async () => {
		try {
			const { data } = await axios.get(`/posts/${id}`)
			setImageUrl(data.post.postImg)
			setValue(data.post.text)
			setTags(data.post.tags?.join(','))
			setName(data.post.name)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (isEditMode) {
			fetchPost()
		}
	}, [])

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				// uniqueId: "demo",
				delay: 1000,
			},
		}),
		[]
	)

	return (
		<Paper style={{ padding: 30 }} elevation={8}>
			<Button
				onClick={() => inputFileRef.current.click()}
				variant='outlined'
				size='large'
			>
				Загрузить превью
			</Button>
			<input
				ref={inputFileRef}
				type='file'
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<Button
					variant='contained'
					sx={{ ml: '15px' }}
					color='error'
					onClick={onClickRemoveImage}
				>
					Удалить
				</Button>
			)}
			{imageUrl && (
				<img
					className={styles.image}
					src={isEditMode ? imageUrl : `http://localhost:4444${imageUrl}`}
					alt='Uploaded'
				/>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				fullWidth
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Тэги'
				fullWidth
				value={tags}
				onChange={(e) => setTags(e.target.value)}
			/>
			<SimpleMDE
				className={styles.editor}
				value={value}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button size='large' variant='contained' onClick={onSubmit}>
					{isEditMode ? 'Сохранить' : 'Опубликовать'}
				</Button>
				<Link to='/'>
					<Button size='large'>Отмена</Button>
				</Link>
			</div>
		</Paper>
	)
}
