import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from '../redux/store.js'
import App from './App.jsx'
import './index.scss'
import { theme } from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	</>
)
