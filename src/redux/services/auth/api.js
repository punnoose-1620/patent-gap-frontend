import { baseApi } from '../base-api'
import Cookies from 'js-cookie'

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user
    getUser: builder.query({
      query: () => '/user/me/',
      providesTags: ['User']
    }),
    
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login/',
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
          Cookies.set('refresh_token', data.refresh, { 
            secure: true, 
            sameSite: 'Strict' 
          })
        } catch (err) {
          console.error('Login failed:', err)
        }
      },
      invalidatesTags: ['User']
    }),
    
    // Logout
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST'
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled
          
          // Clear cookies
          Cookies.remove('access_token')
          Cookies.remove('refresh_token')
        } catch (err) {
          console.error('Logout failed:', err)
        }
      },
      invalidatesTags: ['User']
    }),
    
    // Forgot password
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password/',
        method: 'POST',
        body: { email }
      })
    }),
    
    // Reset password
    resetPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: '/auth/reset-password/',
        method: 'POST',
        body: { password, token }
      })
    }),
    
    // Update user settings
    updateUserSettings: builder.mutation({
      query: ({ userId, settings }) => ({
        url: `/users/${userId}/settings/`,
        method: 'PATCH',
        body: settings
      }),
      invalidatesTags: ['User']
    })
  })
})

// Export hooks for use in components
export const {
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserSettingsMutation
} = api

