import { baseApi } from '../base-api'

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getUser: builder.query({
      query: () => '/profile',
      providesTags: ['User']
    }),

    // Login - session-based authentication
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['User']
    }),
    
    // Logout
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
      invalidatesTags: ['User']
    }),
  })
})

// Export hooks for use in components
export const {
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
} = api


