import api from './api'

interface LoginResponse {
  token: string
  numFicha: string
  nombre: string
  apellido: string
  tipo: string
  error?: boolean
  message?: string
}

interface UserData {
  numFicha: string
  cedula: string
  nombre: string
  apellido: string
  tipo: string
}

export const authService = {
  login: async (numFicha: string, cedula: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/auth/login', { numFicha, cedula })
    return response.data
  },

  register: async (userData: UserData) => {
    const response = await api.post('/api/auth/register', userData)
    return response.data
  },

  validateToken: async (token: string) => {
    const response = await api.post('/api/auth/validate', { token })
    return response.data
  }
}
