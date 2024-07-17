import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from '../axios'

export const mainApi = createApi({
	reducerPath: 'mainApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4444' }),
	tagTypes: ['Post', 'Tag'],
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => '/posts',
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
			invalidatesTags: (result, error, id) => [
				{ type: 'Post', id },
				{ type: 'Tag', id },
			],
		}),
		refetchPostsAndTags: builder.mutation({
			queryFn: () => ({ data: null }),
			invalidatesTags: ['Post', 'Tag'],
		}),
	}),
})

export const {
	useGetPostsQuery,
	useDeletePostMutation,
	useGetPostQuery,
	useGetLastTagsQuery,
	useRefetchPostsAndTagsMutation,
} = mainApi
