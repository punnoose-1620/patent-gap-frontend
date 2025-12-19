import { createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/auth/api'

const initialState = {
  user: null,
  isAuthenticated: false,
  loginMessage: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action
    loggedOut: () => initialState,
    
    // Update user info locally
    updateUserInfoLocally: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    
    // Clear login message
    clearLoginMessage: (state) => {
      state.loginMessage = null
    }
  },
  
  // Handle RTK Query results
  extraReducers: (builder) => {
    builder
      // Login successful
      .addMatcher(
        api.endpoints.login.matchFulfilled,
        (state, action) => {
          state.isAuthenticated = action.payload.success
          state.loginMessage = action.payload.message
        }
      )
      // Login failed
      .addMatcher(
        api.endpoints.login.matchRejected,
        (state, action) => {
          state.isAuthenticated = false
          state.loginMessage = action.payload?.data?.message || 'Login failed'
        }
      )
      // Get user successful
      .addMatcher(
        api.endpoints.getUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload
          state.isAuthenticated = true
        }
      )
      // Get user failed
      .addMatcher(
        api.endpoints.getUser.matchRejected,
        (state) => {
          state.user = null
          state.isAuthenticated = false
        }
      )
      // Logout successful
      .addMatcher(
        api.endpoints.logout.matchFulfilled,
        () => initialState
      )
  }
})

// Export actions
export const { loggedOut, updateUserInfoLocally, clearLoginMessage } = authSlice.actions

// Export reducer
export default authSlice.reducer

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectLoginMessage = (state) => state.auth.loginMessage

