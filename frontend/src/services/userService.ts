import api from './api'
import { User, UserFormData } from '../types/user'

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/auth/users')
    return response.data
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/api/auth/users/${id}`)
    return response.data
  },

  create: async (userData: UserFormData): Promise<User> => {
    const response = await api.post<User>('/api/auth/register', userData)
    return response.data
  },

  update: async (id: number, userData: Partial<UserFormData>): Promise<User> => {
    const response = await api.put<User>(`/api/auth/users/${id}`, userData)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/auth/users/${id}`)
  }
}
