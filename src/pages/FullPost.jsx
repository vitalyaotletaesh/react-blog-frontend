import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import { useGetPostQuery } from '../../services/mainApi'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { Post } from '../components/Post'

export const FullPost = () => {
	const { id } = useParams()
	const { data, error, isLoading } = useGetPostQuery(id)

	if (isLoading) {
		return <Post isLoading={true} isFullPost={true} />
	}
	if (!data) {
		return <div>Статья не существует</div>
	}
	if (error) {
		return <div>Ошибка при получении статьи</div>
	}

	return (
		<>
			<Post
				id={1}
				name={data.post.name}
				postImg={data.post.postImg ? data.post.postImg : ''}
				user={{
					avatarUrl: data.post.user?.avatarUrl || '',
					userName: data.post.user?.userName,
				}}
				createdAt={data.post.createdAt}
				viewsCount={data.post.viewsCount}
				commentsCount={3}
				tags={data.post?.tags || []}
				isFullPost={true}
			>
				<ReactMarkdown children={data.post.text} />
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
