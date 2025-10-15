import api from './api'
import { Activity, ActivityFormData } from '../types/activity'

export const activityService = {
  getAll: async (): Promise<Activity[]> => {
    const response = await api.get<Activity[]>('/api/activities')
    return response.data
  },

  getById: async (id: number): Promise<Activity> => {
    const response = await api.get<Activity>(`/api/activities/${id}`)
    return response.data
  },

  create: async (activityData: ActivityFormData): Promise<Activity> => {
    const response = await api.post<Activity>('/api/activities', activityData)
    return response.data
  },

  update: async (id: number, activityData: Partial<ActivityFormData>): Promise<Activity> => {
    const response = await api.put<Activity>(`/api/activities/${id}`, activityData)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/activities/${id}`)
  },

  getByType: async (tipo: string): Promise<Activity[]> => {
    const response = await api.get<Activity[]>(`/api/activities/type/${tipo}`)
    return response.data
  },

  getByCategory: async (categoria: string): Promise<Activity[]> => {
    const response = await api.get<Activity[]>(`/api/activities/category/${categoria}`)
    return response.data
  },

  getByEquipo: async (equipo: string): Promise<Activity[]> => {
    const response = await api.get<Activity[]>(`/api/activities/equipo/${equipo}`)
    return response.data
  },

  getByDateRange: async (startDate: string, endDate: string): Promise<Activity[]> => {
    const response = await api.get<Activity[]>('/api/activities/date-range', {
      params: { startDate, endDate }
    })
    return response.data
  }
}
