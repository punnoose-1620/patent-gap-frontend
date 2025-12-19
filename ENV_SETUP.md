# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in the project root directory with the following content:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api
```

## Important Notes

1. **Vite Prefix Required**: All environment variables in Vite must be prefixed with `VITE_` to be exposed to your client-side code.

2. **Security**: Never commit your `.env` file to version control. Add it to `.gitignore` if not already present.

3. **Usage in Code**: Access environment variables using:
   ```javascript
   import.meta.env.VITE_API_URL
   ```

4. **Development vs Production**: 
   - For development: Use `.env` or `.env.development`
   - For production: Use `.env.production`
   - For local overrides: Use `.env.local` (this is gitignored by default)

## Example .env File

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api

# Add more variables as needed
# VITE_APP_NAME=Patent Gap
# VITE_ENABLE_ANALYTICS=false
```

## Updating .gitignore

Make sure your `.gitignore` includes:

```
# Environment variables
.env
.env.local
.env.*.local
```

## After Creating .env

1. Restart your development server for changes to take effect
2. The API URL will be automatically used by Redux Toolkit's base API configuration

