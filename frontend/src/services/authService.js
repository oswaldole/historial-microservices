import api from './api'

export const authService = {
  login: async (numFicha, cedula) => {
    const response = await api.post('/api/auth/login', { numFicha, cedula })
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData)
    return response.data
  },

  validateToken: async (token) => {
    const response = await api.post('/api/auth/validate', { token })
    return response.data
  }
}
