import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { activityService } from '../services/activityService'
import { FileText, Wrench, Clock } from 'lucide-react'
import { Activity, ActivityStats } from '../types/activity'

const Dashboard = () => {
  const [recentActivities, setRecentActivities] = useState<Activity[]>([])
  const [stats, setStats] = useState<ActivityStats>({
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
      <div className="space-y-5">
        <h1 className="text-2xl sm:text-3xl font-semibold text-win11-gray-text">Panel de Control</h1>

        {/* Stats Cards - Windows 11 Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-win11 shadow-win11 border border-win11-gray-border hover:shadow-win11-hover transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-win11-gray-muted text-xs font-medium uppercase tracking-wide">Total Actividades</p>
                <p className="text-3xl font-semibold text-win11-gray-text mt-2">{stats.total}</p>
              </div>
              <div className="bg-win11-blue/10 p-3 rounded-win11">
                <FileText className="text-win11-blue-accent" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-win11 shadow-win11 border border-win11-gray-border hover:shadow-win11-hover transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-win11-gray-muted text-xs font-medium uppercase tracking-wide">Fallas</p>
                <p className="text-3xl font-semibold text-win11-red mt-2">{stats.fallas}</p>
              </div>
              <div className="bg-win11-red/10 p-3 rounded-win11">
                <FileText className="text-win11-red" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-win11 shadow-win11 border border-win11-gray-border hover:shadow-win11-hover transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-win11-gray-muted text-xs font-medium uppercase tracking-wide">Rutinas</p>
                <p className="text-3xl font-semibold text-win11-green mt-2">{stats.rutinas}</p>
              </div>
              <div className="bg-win11-green/10 p-3 rounded-win11">
                <Clock className="text-win11-green" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-win11 shadow-win11 border border-win11-gray-border hover:shadow-win11-hover transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-win11-gray-muted text-xs font-medium uppercase tracking-wide">Trabajos Taller</p>
                <p className="text-3xl font-semibold text-win11-purple mt-2">{stats.trabajos}</p>
              </div>
              <div className="bg-win11-purple/10 p-3 rounded-win11">
                <Wrench className="text-win11-purple" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities - Windows 11 Style */}
        <div className="bg-white rounded-win11 shadow-win11 border border-win11-gray-border">
          <div className="px-5 py-4 border-b border-win11-gray-border">
            <h2 className="text-lg font-semibold text-win11-gray-text">Actividades Recientes</h2>
          </div>
          <div className="p-5">
            {recentActivities.length === 0 ? (
              <p className="text-win11-gray-muted text-center py-12">No hay actividades registradas</p>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 rounded-win11 border border-win11-gray-border hover:bg-win11-gray-light transition-colors"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-win11-gray-text truncate">{activity.equipo}</p>
                        <p className="text-sm text-win11-gray-muted mt-1 line-clamp-2">{activity.descripcion}</p>
                        <p className="text-xs text-win11-gray-muted mt-2">
                          {activity.tecnico} • Turno {activity.turno}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-win11-sm whitespace-nowrap ${
                          activity.tipo === 'FALLA'
                            ? 'bg-win11-red/10 text-win11-red'
                            : activity.tipo === 'RUTINA'
                            ? 'bg-win11-green/10 text-win11-green'
                            : 'bg-win11-purple/10 text-win11-purple'
                        }`}
                      >
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
