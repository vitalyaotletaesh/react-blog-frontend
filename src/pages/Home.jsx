import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { useGetLastTagsQuery, useGetPostsQuery } from '../../services/mainApi'
import { CommentsBlock } from '../components/CommentsBlock'
import { CustomTabs } from '../components/CustomTabs'
import { PostsList } from '../components/Lists/PostsList'
import { TagsBlock } from '../components/TagsBlock'

const filters = [
	JSON.stringify({ sort: { createdAt: -1 } }),
	JSON.stringify({ sort: { viewsCount: -1 } }),
]

export const Home = () => {
	const [tag, setTag] = useState()
	const [sort, setSort] = useState(filters[0])
	const [tab, setTab] = useState('Новые')
	const { data, error, isLoading } = useGetPostsQuery({ tag, sort })
	const { data: tags, isLoading: tagsIsLoading } = useGetLastTagsQuery()
	const user = useSelector((store) => store.users.user)

	const handleTagSelected = (selectedTag) => {
		if (tag === selectedTag) {
			setTag(undefined)
		} else {
			setTag(selectedTag)
		}
	}

	const handleTabClick = (tab) => {
		setTab(tab)
		tab === 'Новые' ? setSort(filters[0]) : setSort(filters[1])
	}

	return (
		<>
			<CustomTabs
				tabs={['Новые', 'Популярные']}
				onClick={handleTabClick}
				selectedIndex={tab}
			/>
			<Grid container spacing={4}>
				<PostsList
					data={data}
					error={error}
					isLoading={isLoading}
					user={user}
				/>
				<Grid xs={4} item>
					<TagsBlock
						items={tags?.tags}
						isLoading={tagsIsLoading}
						onClick={handleTagSelected}
						selectedTag={tag}
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
						isLoading={isLoading}
					/>
				</Grid>
			</Grid>
		</>
	)
}
