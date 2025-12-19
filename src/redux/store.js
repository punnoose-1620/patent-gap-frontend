import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './services/base-api'
import authReducer from './modules/auth/slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      // RTK Query API reducer
      [baseApi.reducerPath]: baseApi.reducer,
      
      // App state slices
      auth: authReducer,
      // Add more slices here
    },
    
    // Add RTK Query middleware
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    
    // Enable Redux DevTools
    devTools: import.meta.env.MODE !== 'production'
  })
}

// Create store instance
export const store = makeStore()

