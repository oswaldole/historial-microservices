import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { reportService } from '../services/reportService'
import { BarChart3, PieChart } from 'lucide-react'

const Reports = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSummary()
  }, [])

  const loadSummary = async () => {
    try {
      const data = await reportService.getSummary()
      setSummary(data)
    } catch (error) {
      console.error('Error loading summary:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">Cargando reportes...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Reportes y Estadísticas</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Resumen General</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-600">Total Actividades</p>
              <p className="text-3xl font-bold text-blue-600">{summary?.totalActivities || 0}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-4">
              <PieChart className="text-green-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Por Tipo de Actividad</h2>
            </div>
            <div className="space-y-2">
              {summary?.activitiesByType && Object.entries(summary.activitiesByType).map(([tipo, count]) => (
                <div key={tipo} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-700">{tipo}</span>
                  <span className="text-2xl font-bold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-4">
              <PieChart className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Por Categoría</h2>
            </div>
            <div className="space-y-2">
              {summary?.activitiesByCategory && Object.entries(summary.activitiesByCategory).map(([categoria, count]) => (
                <div key={categoria} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-700">{categoria}</span>
                  <span className="text-2xl font-bold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="text-orange-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Por Equipo</h2>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {summary?.activitiesByEquipo && Object.entries(summary.activitiesByEquipo)
                .sort(([, a], [, b]) => b - a)
                .map(([equipo, count]) => (
                  <div key={equipo} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-gray-700">{equipo}</span>
                    <span className="text-xl font-bold text-gray-900">{count}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="text-red-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Por Turno</h2>
            </div>
            <div className="space-y-2">
              {summary?.activitiesByTurno && Object.entries(summary.activitiesByTurno).map(([turno, count]) => (
                <div key={turno} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-700">Turno {turno}</span>
                  <span className="text-2xl font-bold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Reports
