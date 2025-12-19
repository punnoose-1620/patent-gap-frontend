import { useState } from 'react'
import { useLoginMutation } from '../redux/services/auth/api'
import { useAppSelector } from '../redux/hooks'
import { selectIsAuthenticated, selectLoginMessage } from '../redux/modules/auth/slice'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const loginMessage = useAppSelector(selectLoginMessage)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const result = await login({ email, password }).unwrap()
      console.log('Login successful:', result)
      
      if (result.success) {
        // Redirect or show success message
        alert(`Success: ${result.message}`)
      }
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  if (isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>✅ Logged In Successfully!</h2>
          <p style={styles.message}>{loginMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Patent Gap Login</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              style={styles.input}
              disabled={isLoading}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <div style={styles.error}>
              <p>❌ {error.data?.message || 'Login failed. Please try again.'}</p>
            </div>
          )}
        </form>

        <div style={styles.info}>
          <p style={styles.infoText}>
            <strong>Test Credentials:</strong><br />
            Email: user@example.com<br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555'
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '10px'
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed'
  },
  error: {
    padding: '12px',
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '4px',
    color: '#c33',
    fontSize: '14px'
  },
  message: {
    textAlign: 'center',
    color: '#28a745',
    fontSize: '16px'
  },
  info: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    border: '1px solid #dee2e6'
  },
  infoText: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
    lineHeight: '1.6'
  }
}

