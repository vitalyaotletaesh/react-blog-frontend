import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mainApi = createApi({
	reducerPath: 'mainApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4444' }),
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => '/posts',
		}),
		getPost: builder.query({
			query: (id) => `/posts/${id}`,
		}),
	}),
})

export const { useGetPostsQuery, useGetPostQuery } = pokemonApi
