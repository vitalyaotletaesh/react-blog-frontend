import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import axios from '../../axios'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { Post } from '../components/Post'

export const FullPost = () => {
	const { id } = useParams()
	const [post, setPost] = useState()

	const fetchPost = async () => {
		const { data } = await axios.get(`/posts/${id}`)
		setPost(data.post)
	}

	useEffect(() => {
		setPost({})
		fetchPost()
	}, [])

	if (!post) {
		return <Post isLoading={true} isFullPost={true} />
	}

	return (
		<>
			<Post
				id={1}
				name={post.name}
				postImg={post?.postImg ? post.postImg : ''}
				user={{
					avatarUrl: post.user?.avatarUrl || '',
					userName: post.user?.userName,
				}}
				createdAt={post.createdAt}
				viewsCount={post.viewsCount}
				commentsCount={3}
				tags={post?.tags || []}
				isFullPost={true}
			>
				<ReactMarkdown children={post.text} />
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: 'Вася Пупкин',
							avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
						},
						text: 'Это тестовый комментарий 555555',
					},
					{
						user: {
							fullName: 'Иван Иванов',
							avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
						},
						text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
					},
				]}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
		</>
	)
}
