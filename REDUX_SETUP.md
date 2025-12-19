# Redux Toolkit Setup - Complete ✅

This project has been configured with Redux Toolkit and RTK Query for state management and API calls.

## 📦 Installed Packages

- `@reduxjs/toolkit` - Redux core with RTK Query
- `react-redux` - React bindings for Redux
- `async-mutex` - Token refresh race condition handling
- `js-cookie` - Cookie management for authentication

## 📁 Folder Structure

```
src/
├── redux/
│   ├── store.js                    # Redux store configuration
│   ├── hooks.js                    # Custom Redux hooks
│   ├── provider.jsx                # Redux Provider wrapper
│   ├── modules/                    # State slices (app state)
│   │   └── auth/
│   │       └── slice.js           # Auth slice
│   └── services/                   # RTK Query APIs (server data)
│       ├── base-api.js            # Base API with auth & refresh
│       └── auth/
│           └── api.js             # Auth API endpoints
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root with:

```env
VITE_API_URL=http://localhost:8000/api
```

**Note:** For Vite projects, environment variables must be prefixed with `VITE_`

### Features Included

✅ Automatic token refresh on 401 errors  
✅ Request deduplication  
✅ Cache management with tags  
✅ Authentication state management  
✅ Cookie-based token storage  
✅ CSRF token support  
✅ Redux DevTools integration  

## 🚀 Usage Examples

### 1. Using Auth Hooks in Components

```javascript
import { useLoginMutation, useGetUserQuery } from '@/redux/services/auth/api'
import { useAppSelector } from '@/redux/hooks'
import { selectCurrentUser } from '@/redux/modules/auth/slice'

function LoginForm() {
  const [login, { isLoading }] = useLoginMutation()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({ username, password }).unwrap()
      // Navigate to dashboard
    } catch (err) {
      console.error('Login failed:', err)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

### 2. Accessing Redux State

```javascript
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { selectCurrentUser, loggedOut } from '@/redux/modules/auth/slice'

function UserProfile() {
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  
  const handleLogout = () => {
    dispatch(loggedOut())
  }
  
  return <div>Welcome, {user?.fullName}</div>
}
```

### 3. Creating New API Endpoints

Create a new API file (e.g., `src/redux/services/products/api.js`):

```javascript
import { baseApi } from '../base-api'

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products/',
      providesTags: ['Products']
    }),
    
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/products/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Products']
    })
  })
})

export const { useGetProductsQuery, useCreateProductMutation } = productsApi
```

Don't forget to add 'Products' to the `tagTypes` array in `base-api.js`!

### 4. Creating New State Slices

Create a new slice (e.g., `src/redux/modules/cart/slice.js`):

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
      state.total += action.payload.price
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload)
      if (index !== -1) {
        state.total -= state.items[index].price
        state.items.splice(index, 1)
      }
    },
    clearCart: () => initialState
  }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => state.cart.total
```

Then add it to the store in `store.js`:

```javascript
import cartReducer from './modules/cart/slice'

// In the reducer object:
reducer: {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  cart: cartReducer, // Add this
}
```

## 🔐 Authentication Flow

1. User logs in via `useLoginMutation()`
2. Tokens are stored in cookies (secure, httpOnly recommended for production)
3. All API requests automatically include the access token
4. On 401 error, the refresh token is used automatically
5. If refresh succeeds, the original request is retried
6. If refresh fails, tokens are cleared

## 📝 Available Auth Endpoints

- `useGetUserQuery()` - Get current user info
- `useLoginMutation()` - Login user
- `useLogoutMutation()` - Logout user
- `useForgotPasswordMutation()` - Request password reset
- `useResetPasswordMutation()` - Reset password with token
- `useUpdateUserSettingsMutation()` - Update user settings

## 🎯 Next Steps

1. Update `VITE_API_URL` in `.env` to match your backend
2. Adjust API endpoints in `src/redux/services/auth/api.js` to match your backend routes
3. Add more tag types to `base-api.js` as needed
4. Create additional API services for your features
5. Create additional slices for local state management

## 📚 Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [RTK Query Docs](https://redux-toolkit.js.org/rtk-query/overview)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)

---

**Setup completed on:** December 19, 2025  
**Branch:** feature/rtk-setup

