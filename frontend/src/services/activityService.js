import api from './api'

export const activityService = {
  getAll: async () => {
    const response = await api.get('/api/activities')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/api/activities/${id}`)
    return response.data
  },

  create: async (activityData) => {
    const response = await api.post('/api/activities', activityData)
    return response.data
  },

  update: async (id, activityData) => {
    const response = await api.put(`/api/activities/${id}`, activityData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/api/activities/${id}`)
    return response.data
  },

  getByType: async (tipo) => {
    const response = await api.get(`/api/activities/type/${tipo}`)
    return response.data
  },

  getByCategory: async (categoria) => {
    const response = await api.get(`/api/activities/category/${categoria}`)
    return response.data
  },

  getByEquipo: async (equipo) => {
    const response = await api.get(`/api/activities/equipo/${equipo}`)
    return response.data
  },

  getByDateRange: async (startDate, endDate) => {
    const response = await api.get('/api/activities/date-range', {
      params: { startDate, endDate }
    })
    return response.data
  }
}
