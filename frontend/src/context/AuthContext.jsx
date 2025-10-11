import { createContext, useState, useContext, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (numFicha, cedula) => {
    try {
      const response = await authService.login(numFicha, cedula)

      if (!response.error) {
        const userData = {
          numFicha: response.numFicha,
          nombre: response.nombre,
          apellido: response.apellido,
          tipo: response.tipo
        }

        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      } else {
        return { success: false, message: response.message || 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
