import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from '../axios'

export const mainApi = createApi({
	reducerPath: 'mainApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4444' }),
	tagTypes: ['Post', 'Tag'],
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: (filters) => ({
				url: `/posts`,
				params: { tag: filters?.tag, sort: filters?.sort },
			}),
			providesTags: (result) =>
				result
					? [
							result?.posts.map(({ id }) => ({ type: 'Post', id })),
							{ type: 'Post', id: 'LIST' },
					  ]
					: [{ type: 'Post', id: 'LIST' }],
		}),
		getPost: builder.query({
			query: (id) => `/posts/${id}`,
			providesTags: (result, error, id) => [{ type: 'Post', id }],
		}),
		getLastTags: builder.query({
			query: () => '/posts/tags',
			providesTags: (result) =>
				result
					? [
							result.tags.map(({ id }) => ({ type: 'Tag', id })),
							{ type: 'Tag', id: 'LIST' },
					  ]
					: [{ type: 'Tag', id: 'LIST' }],
		}),
		deletePost: builder.mutation({
			queryFn: async (id) => {
				try {
					const { data } = await axios.delete(`/posts/${id}`)
					return { data }
				} catch (error) {
					return { error }
				}
			},
			invalidatesTags: ['Post', 'Tag'],
		}),
		createPost: builder.mutation({
			queryFn: async (body) => {
				try {
					const { data } = await axios.post(`/posts`, body)
					return { data }
				} catch (error) {
					return { error }
				}
			},
			invalidatesTags: ['Post', 'Tag'],
		}),
		updatePost: builder.mutation({
			queryFn: async ({ fields, id }) => {
				try {
					const { data } = await axios.patch(`/posts/${id}`, fields)
					return { data }
				} catch (error) {
					return { error }
				}
			},
			invalidatesTags: ['Post', 'Tag'],
		}),
		uploadPostImg: builder.mutation({
			queryFn: async (body) => {
				try {
					const { data } = await axios.post('/upload', body)
					return { data }
				} catch (error) {
					return { error }
				}
			},
		}),
	}),
})

export const {
	useGetPostsQuery,
	useDeletePostMutation,
	useGetPostQuery,
	useGetLastTagsQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useUploadPostImgMutation,
} = mainApi
