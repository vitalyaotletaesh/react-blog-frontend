import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts, fetchLastTags } from '../../redux/postSlice'
import { CommentsBlock } from '../components/CommentsBlock'
import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'

export const Home = () => {
	const dispatch = useDispatch()
	const { posts, status, tags } = useSelector((store) => store.posts)
	const user = useSelector((store) => store.users.user)

	React.useEffect(() => {
		dispatch(fetchAllPosts())
		dispatch(fetchLastTags())
	}, [])

	React.useEffect(() => {
		dispatch(fetchAllPosts())
	}, [])

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label='basic tabs example'
			>
				<Tab label='Новые' />
				<Tab label='Популярные' />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{posts && status === 'fulfilled'
						? posts.map((post) => (
								<Post
									key={post._id}
									id={post._id}
									name={post.name}
									createdAt={post.createdAt}
									postImg={post.postImg ? post.postImg : ''}
									user={post.user}
									viewsCount={post.viewsCount}
									commentsCount={5}
									tags={post.tags}
									isFullPost={false}
									isLoading={status === 'fulfilled' ? false : true}
									isEditable={user?._id === post.user._id}
								/>
						  ))
						: [...Array(3)].map((_, i) => (
								<Post
									key={i}
									isLoading={true}
								/>
						  ))}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock
						items={tags}
						isLoading={status === 'fulfilled' ? false : true}
					/>
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Вася Пупкин',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'Это тестовый комментарий',
							},
							{
								user: {
									fullName: 'Иван Иванов',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
								},
								text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
							},
						]}
						isLoading={status === 'fulfilled' ? false : true}
					/>
				</Grid>
			</Grid>
		</>
	)
}
