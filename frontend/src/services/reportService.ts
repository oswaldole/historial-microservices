import api from './api'
import { ReportSummary } from '../types/report'

export const reportService = {
  getSummary: async (): Promise<ReportSummary> => {
    const response = await api.get<ReportSummary>('/api/reports/summary')
    return response.data
  },

  getByEquipo: async (equipo: string) => {
    const response = await api.get(`/api/reports/equipo/${equipo}`)
    return response.data
  },

  getByType: async (tipo: string) => {
    const response = await api.get(`/api/reports/type/${tipo}`)
    return response.data
  }
}
