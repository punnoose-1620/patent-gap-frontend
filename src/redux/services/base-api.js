import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import Cookies from 'js-cookie'

const mutex = new Mutex()

// Base query with auth headers
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers) => {
    headers.set('accept', '*/*')
    
    // Add auth token from cookies
    const token = Cookies.get('access_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})

// Base query with automatic token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Wait if a refresh is already in progress
  await mutex.waitForUnlock()
  
  let result = await baseQuery(args, api, extraOptions)

  // Handle 401 Unauthorized - refresh token
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      
      try {
        const refreshToken = Cookies.get('refresh_token')
        
        if (refreshToken) {
          // Try to refresh the token
          const refreshResult = await baseQuery(
            {
              url: '/token/refresh/',
              method: 'POST',
              body: { refresh: refreshToken }
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            // Store new access token
            Cookies.set('access_token', refreshResult.data.access)
            
            // Retry the original query
            result = await baseQuery(args, api, extraOptions)
          } else {
            // Refresh failed - clear tokens
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
          }
        }
      } finally {
        release()
      }
    } else {
      // Wait for the refresh to complete, then retry
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

// Create base API
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Auth',
    'Products',
    'Orders',
    // Add your tag types here
  ],
  endpoints: () => ({})
})


