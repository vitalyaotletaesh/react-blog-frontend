import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllPosts = createAsyncThunk(
	'posts/fetchAllPosts',
	async () => {
		try {
			const response = await axios.get('http://localhost:4444/posts/')
			return response.data
		} catch (error) {
			console.log('Ошибка при запросе всех постов')
		}
	}
)

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
	try {
		const response = await axios.delete(`http://localhost:4444/posts/${id}`, {
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTNhNDJlMDJmNWJmMTk2Y2RmODVhMiIsImlhdCI6MTcyMDk3ODIwNCwiZXhwIjoxNzIzNTcwMjA0fQ.L0oS-EO8RHcNk3749iwRMfH0NfOJpab4CsoH1q0sNNA',
			},
		})
		return response.data
	} catch (error) {
		console.log('Ошибка при удалении поста')
	}
})

export const fetchLastTags = createAsyncThunk(
	'posts/fetchLastTags',
	async () => {
		try {
			const response = await axios.get('http://localhost:4444/posts/tags')
			return response.data
		} catch (error) {
			console.log('Ошибка при запросе последних тэгов')
		}
	}
)

const initialState = {
	posts: [],
	status: 'pending',
	tags: [],
}

export const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllPosts.pending, (state) => {
				state.posts = []
				state.status = 'pending'
			})
			.addCase(fetchAllPosts.fulfilled, (state, action) => {
				state.posts = action.payload.posts
				state.status = 'fulfilled'
			})
			.addCase(fetchAllPosts.rejected, (state) => {
				state.status = 'error'
			}),
			builder
				.addCase(deletePost.pending, (state) => {
					state.status = 'pending'
				})
				.addCase(deletePost.fulfilled, (state, action) => {
					state.posts = action.payload.posts
					state.status = 'fulfilled'
				})
				.addCase(deletePost.rejected, (state) => {
					state.status = 'error'
				}),
			builder
				.addCase(fetchLastTags.pending, (state) => {
					state.status = 'pending'
				})
				.addCase(fetchLastTags.fulfilled, (state, action) => {
					state.tags = action.payload.tags
					state.status = 'fulfilled'
				})
				.addCase(fetchLastTags.rejected, (state) => {
					state.status = 'error'
				})
	},
})

export const {  } = postSlice.actions

export default postSlice.reducer
