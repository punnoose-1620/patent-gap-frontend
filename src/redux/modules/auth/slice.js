import { createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/auth/api'

const initialState = {
  user: null,
  isAuthenticated: false,
  loginMessage: null,
  sessionToken: null,
  email: null
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
    },
    
    // Set session from stored data (for persistence)
    setSession: (state, action) => {
      state.user = action.payload.user || null
      state.email = action.payload.email || null
      state.sessionToken = action.payload.sessionToken || null
      state.isAuthenticated = !!action.payload.user || !!action.payload.email
    }
  },
  
  // Handle RTK Query results
  extraReducers: (builder) => {
    builder
      // Login successful
      .addMatcher(
        api.endpoints.login.matchFulfilled,
        (state, action) => {
          const payload = action.payload
          state.isAuthenticated = payload.success || true
          state.loginMessage = payload.message || 'Login successful'
          
          // Store user data if provided
          if (payload.user) {
            state.user = payload.user
          }
          if (payload.email) {
            state.email = payload.email
          } else if (payload.user?.email) {
            state.email = payload.user.email
          }
          
          // Store session token if provided
          if (payload.token) {
            state.sessionToken = payload.token
          } else if (payload.sessionToken) {
            state.sessionToken = payload.sessionToken
          }
          
          // If no user object but login was successful, create minimal user
          if (!state.user && state.email) {
            state.user = {
              email: state.email,
              ...(payload.user || {})
            }
          }
        }
      )
      // Login failed
      .addMatcher(
        api.endpoints.login.matchRejected,
        (state, action) => {
          state.isAuthenticated = false
          state.user = null
          state.email = null
          state.sessionToken = null
          state.loginMessage = action.payload?.data?.message || action.payload?.data?.error || 'Login failed'
        }
      )
      // Get user successful
      .addMatcher(
        api.endpoints.getUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload
          state.isAuthenticated = true
          if (action.payload.email) {
            state.email = action.payload.email
          }
        }
      )
      // Get user failed
      .addMatcher(
        api.endpoints.getUser.matchRejected,
        (state) => {
          state.user = null
          state.isAuthenticated = false
          state.email = null
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
export const { loggedOut, updateUserInfoLocally, clearLoginMessage, setSession } = authSlice.actions

// Export reducer
export default authSlice.reducer

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectLoginMessage = (state) => state.auth.loginMessage
export const selectSessionToken = (state) => state.auth.sessionToken
export const selectUserEmail = (state) => state.auth.email || state.auth.user?.email

