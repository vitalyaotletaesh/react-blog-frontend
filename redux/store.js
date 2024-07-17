import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { mainApi } from '../services/mainApi.js'
import userSlice from './userSlice.js'

export const store = configureStore({
	reducer: {
		users: userSlice,
		[mainApi.reducerPath]: mainApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(mainApi.middleware),
})

setupListeners(store.dispatch)
