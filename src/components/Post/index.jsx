import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import IconButton from '@mui/material/IconButton'
import clsx from 'clsx'
import React from 'react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost } from '../../../redux/postSlice'
import { UserInfo } from '../UserInfo'
import styles from './Post.module.scss'
import { PostSkeleton } from './Skeleton'

export const Post = ({
	id,
	name,
	createdAt,
	postImg,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
}) => {
	if (isLoading) {
		return <PostSkeleton />
	}

	const dispatch = useDispatch()

	const onClickRemove = (id) => {
		dispatch(deletePost(id))
	}

	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color='primary'>
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={() => onClickRemove(id)} color='secondary'>
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{postImg && (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={postImg}
					alt={name}
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo {...user} additionalText={createdAt} />
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? name : <Link to={`/posts/${id}`}>{name}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map((name) => (
							<li key={name}>
								<Link to={`/tag/${name}`}>#{name}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
