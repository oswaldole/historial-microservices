import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { activityService } from '../services/activityService'
import { FileText, Wrench, Clock } from 'lucide-react'

const Dashboard = () => {
  const [recentActivities, setRecentActivities] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    fallas: 0,
    rutinas: 0,
    trabajos: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const activities = await activityService.getAll()
      setRecentActivities(activities.slice(0, 5))

      setStats({
        total: activities.length,
        fallas: activities.filter(a => a.tipo === 'FALLA').length,
        rutinas: activities.filter(a => a.tipo === 'RUTINA').length,
        trabajos: activities.filter(a => a.tipo === 'TRABAJO_TALLER').length
      })
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Actividades</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <FileText className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Fallas</p>
                <p className="text-3xl font-bold text-red-600">{stats.fallas}</p>
              </div>
              <FileText className="text-red-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Rutinas</p>
                <p className="text-3xl font-bold text-green-600">{stats.rutinas}</p>
              </div>
              <Clock className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Trabajos Taller</p>
                <p className="text-3xl font-bold text-purple-600">{stats.trabajos}</p>
              </div>
              <Wrench className="text-purple-500" size={40} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Actividades Recientes</h2>
          </div>
          <div className="p-6">
            {recentActivities.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay actividades registradas</p>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{activity.equipo}</p>
                        <p className="text-sm text-gray-600">{activity.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.tecnico} - Turno {activity.turno}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        activity.tipo === 'FALLA' ? 'bg-red-100 text-red-800' :
                        activity.tipo === 'RUTINA' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.tipo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
