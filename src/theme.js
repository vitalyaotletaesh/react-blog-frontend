import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	shadows: Array(25).fill('none'),
	palette: {
		primary: {
			main: '#4361ee',
		},
	},
	typography: {
		button: {
			textTransform: 'none',
			fontWeight: 400,
		},
	},
	components: {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: '#4361ee',
						color: '#fff',
						"&:hover": {
						  backgroundColor: '#4361ee',
						  color: '#fff'
						}
					},
				},
			},
		},
	},
})
