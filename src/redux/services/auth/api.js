import { baseApi } from '../base-api'
import Cookies from 'js-cookie'

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user
    getUser: builder.query({
      query: () => '/profile',
      providesTags: ['User']
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          
          // Save tokens to cookies
          Cookies.set('access_token', data.access, { 
            secure: true, 
            sameSite: 'Strict' 
          })
        } catch (err) {
          console.error('Login failed:', err)
        }
      },
      invalidatesTags: ['User']
    }),
    



  })
})

// Export hooks for use in components
export const {
  useGetUserQuery,
  useLoginMutation,
} = api


