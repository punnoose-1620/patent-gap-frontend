import { createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/auth/api'
import Cookies from 'js-cookie'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Manual token update
    tokenReceived: (state, action) => {
      state.token = action.payload.access
      state.isAuthenticated = true
    },
    
    // Logout action
    loggedOut: () => initialState,
    
    // Update user info locally
    updateUserInfoLocally: (state, action) => {
      if (state.user) {
        state.user.fullName = action.payload.fullName
        state.user.email = action.payload.email
      }
    }
  },
  
  // Handle RTK Query results
  extraReducers: (builder) => {
    builder
      // Login successful
      .addMatcher(
        api.endpoints.login.matchFulfilled,
        (state, action) => {
          state.token = action.payload.access
          state.isAuthenticated = true
        }
      )
      // Login failed
      .addMatcher(
        api.endpoints.login.matchRejected,
        (state) => {
          state.isAuthenticated = false
        }
      )
      // Get user successful
      .addMatcher(
        api.endpoints.getUser.matchFulfilled,
        (state, action) => {
          state.token = Cookies.get('access_token')
          state.user = action.payload
          state.isAuthenticated = true
        }
      )
      // Get user failed
      .addMatcher(
        api.endpoints.getUser.matchRejected,
        (state, action) => {
          if (action.payload?.status === 401) {
            state.isAuthenticated = false
          } else {
            state.user = null
            state.token = null
            state.isAuthenticated = false
          }
        }
      )
  }
})

// Export actions
export const { tokenReceived, loggedOut, updateUserInfoLocally } = authSlice.actions

// Export reducer
export default authSlice.reducer

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthToken = (state) => state.auth.token

