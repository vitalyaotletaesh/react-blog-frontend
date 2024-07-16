import { configureStore } from '@reduxjs/toolkit'
import postSlice from './postSlice.js'
import userSlice from './userSlice.js'

export const store = configureStore({
	reducer: {
		posts: postSlice,
		users: userSlice,
	},
})
