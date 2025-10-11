import api from './api'

export const reportService = {
  getSummary: async () => {
    const response = await api.get('/api/reports/summary')
    return response.data
  },

  getByEquipo: async (equipo) => {
    const response = await api.get(`/api/reports/equipo/${equipo}`)
    return response.data
  },

  getByType: async (tipo) => {
    const response = await api.get(`/api/reports/type/${tipo}`)
    return response.data
  }
}
