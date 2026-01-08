import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import Cookies from 'js-cookie'

const mutex = new Mutex()

// Base query with auth headers
const baseQuery = fetchBaseQuery({
  baseUrl: '/api', // Use proxy to avoid CORS issues
  credentials: 'include', // Important for session-based auth
  prepareHeaders: (headers) => {
    headers.set('accept', '*/*')
    headers.set('Content-Type', 'application/json')
    
    return headers
  }
})

// Base query with session handling
const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // Handle 401 Unauthorized - redirect to login
  if (result.error && result.error.status === 401) {
    // Session expired or not authenticated
    console.log('Session expired or not authenticated')
    // You can dispatch a logout action here if needed
  }

  return result
}

// Create base API
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'User',
    'Auth',
    'Cases',
    'Patents',
    'Alerts',
    // Add your tag types here
  ],
  endpoints: () => ({})
})


