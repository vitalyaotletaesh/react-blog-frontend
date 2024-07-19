import { Grid } from '@mui/material'

import { Post } from '../../Post'

export const PostsList = ({ data, error, isLoading, user }) => {
	return (
		<Grid xs={8} item>
			{!error ? (
				data?.posts && !isLoading ? (
					data?.posts.map((post) => (
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
							isLoading={isLoading}
							isEditable={user?._id === post.user._id}
						/>
					))
				) : (
					[...Array(3)].map((_, i) => <Post key={i} isLoading={true} />)
				)
			) : (
				<div>Ошибка при получении статей {error}</div>
			)}
		</Grid>
	)
}
