# Redux Toolkit - Quick Start Guide 🚀

## ✅ What's Been Set Up

Your project now has a complete Redux Toolkit setup with:

- ✅ Redux Toolkit & RTK Query installed
- ✅ Complete folder structure created
- ✅ Base API with automatic token refresh
- ✅ Authentication slice and API endpoints
- ✅ Redux Provider integrated into the app
- ✅ Custom hooks for type-safe usage
- ✅ Environment variables configured

## 📋 Next Steps

### 1. Create Environment File (REQUIRED)

Create a `.env` file in the project root:

```bash
# Copy this into .env file
VITE_API_URL=http://localhost:8000/api
```

> **Important:** Replace `http://localhost:8000/api` with your actual backend API URL.

### 2. Restart Development Server

After creating the `.env` file, restart your dev server:

```bash
npm run dev
```

### 3. Test the Setup

Create a simple component to test Redux:

```javascript
// src/components/TestRedux.jsx
import { useAppSelector } from '../redux/hooks'
import { selectIsAuthenticated } from '../redux/modules/auth/slice'

export default function TestRedux() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  return (
    <div>
      <h2>Redux Status: {isAuthenticated ? '✅ Connected' : '⚠️ Not Authenticated'}</h2>
    </div>
  )
}
```

## 🎯 Common Use Cases

### Login Example

```javascript
import { useLoginMutation } from './redux/services/auth/api'

function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation()
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ 
        username: 'user@example.com', 
        password: 'password123' 
      }).unwrap()
      console.log('Login successful!', result)
    } catch (err) {
      console.error('Login failed:', err)
    }
  }
  
  return (
    <form onSubmit={handleLogin}>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.data?.message}</p>}
    </form>
  )
}
```

### Get Current User

```javascript
import { useGetUserQuery } from './redux/services/auth/api'

function UserProfile() {
  const { data: user, isLoading, error } = useGetUserQuery()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading user</div>
  if (!user) return <div>Please log in</div>
  
  return <div>Welcome, {user.fullName}!</div>
}
```

### Access Redux State

```javascript
import { useAppSelector } from './redux/hooks'
import { selectCurrentUser, selectIsAuthenticated } from './redux/modules/auth/slice'

function Header() {
  const user = useAppSelector(selectCurrentUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  return (
    <header>
      {isAuthenticated ? (
        <span>Hello, {user?.fullName}</span>
      ) : (
        <span>Please log in</span>
      )}
    </header>
  )
}
```

## 📁 Project Structure

```
src/
├── redux/
│   ├── store.js              # Redux store configuration
│   ├── hooks.js              # useAppDispatch, useAppSelector
│   ├── provider.jsx          # Redux Provider wrapper
│   ├── modules/              # State slices
│   │   └── auth/
│   │       └── slice.js      # Auth state management
│   └── services/             # API endpoints
│       ├── base-api.js       # Base API config
│       └── auth/
│           └── api.js        # Auth endpoints
```

## 🔧 Customization

### Update API Endpoints

Edit `src/redux/services/auth/api.js` to match your backend routes:

```javascript
// Change these URLs to match your backend
login: builder.mutation({
  query: (credentials) => ({
    url: '/auth/login/',  // ← Update this
    method: 'POST',
    body: credentials
  })
})
```

### Add New API Services

1. Create a new file: `src/redux/services/products/api.js`
2. Use the pattern from `auth/api.js`
3. Add tag types to `base-api.js`

### Add New State Slices

1. Create a new file: `src/redux/modules/cart/slice.js`
2. Use the pattern from `auth/slice.js`
3. Add reducer to `store.js`

## 🐛 Troubleshooting

### "Cannot find module '@reduxjs/toolkit'"
- Run: `npm install`

### Environment variables not working
- Make sure `.env` file exists in project root
- Variables must start with `VITE_`
- Restart dev server after creating/editing `.env`

### API calls failing
- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check browser console for errors
- Use Redux DevTools to inspect state

## 📚 Documentation

- Full setup details: `REDUX_SETUP.md`
- Environment variables: `ENV_SETUP.md`
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [RTK Query Docs](https://redux-toolkit.js.org/rtk-query/overview)

## 🎉 You're Ready!

Your Redux Toolkit setup is complete. Start building your features!

---

**Branch:** `feature/rtk-setup`  
**Setup Date:** December 19, 2025

