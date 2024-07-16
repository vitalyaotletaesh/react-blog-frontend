import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

export const login = createAsyncThunk('users/login', async (data) => {
	try {
		const response = await axios.post('/auth/login', data)
		return response.data
	} catch (error) {
		console.log('Ошибка при входе в аккаунт')
	}
})

export const register = createAsyncThunk('users/register', async (data) => {
	try {
		const response = await axios.post(
			'/auth/register',
			data
		)
		return response.data
	} catch (error) {
		console.log('Ошибка при регистрации')
	}
})

export const getMe = createAsyncThunk('users/getMe', async () => {
	try {
		const response = await axios.get('/auth/me')
		return response.data
	} catch (error) {
		console.log('Ошибка при аутентификации')
	}
})

const initialState = {
	user: null,
	status: 'pending',
}

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'pending'
				state.user = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload
				state.status = 'fulfilled'
			})
			.addCase(login.rejected, (state) => {
				state.status = 'error'
			}),
			builder
				.addCase(getMe.pending, (state) => {
					state.status = 'pending'
					state.user = null
				})
				.addCase(getMe.fulfilled, (state, action) => {
					state.user = action.payload
					state.status = 'fulfilled'
				})
				.addCase(getMe.rejected, (state) => {
					state.status = 'error'
				}),
			builder
				.addCase(register.pending, (state) => {
					state.status = 'pending'
					state.user = null
				})
				.addCase(register.fulfilled, (state, action) => {
					console.log(action.payload)
					state.user = action.payload
					state.status = 'fulfilled'
				})
				.addCase(register.rejected, (state) => {
					state.status = 'error'
				})
	},
})

export const authSelector = (state) => Boolean(state.users.user)

export const { logout } = userSlice.actions

export default userSlice.reducer
