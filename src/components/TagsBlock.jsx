import TagIcon from '@mui/icons-material/Tag'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

import { SideBlock } from './SideBlock'

export const TagsBlock = ({
	items,
	isLoading = true,
	onClick,
	selectedTag = null,
}) => {
	return (
		<SideBlock title='Тэги'>
			<List>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<ListItem key={i} disablePadding onClick={() => onClick(name)}>
						<ListItemButton selected={name === selectedTag}>
							<ListItemIcon>
								<TagIcon />
							</ListItemIcon>
							{isLoading ? (
								<Skeleton width={100} />
							) : (
								<ListItemText primary={name} />
							)}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</SideBlock>
	)
}
