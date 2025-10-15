import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { authService } from '../services/authService'

interface User {
  numFicha: string
  nombre: string
  apellido: string
  tipo: string  // This comes from the login response as lowercase 'tipo'
}

interface AuthContextType {
  user: User | null
  login: (numFicha: string, cedula: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
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

  const login = async (numFicha: string, cedula: string) => {
    try {
      const response = await authService.login(numFicha, cedula)

      if (!response.error) {
        const userData: User = {
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

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
