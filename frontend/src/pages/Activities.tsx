import { useEffect, useState, FormEvent } from 'react'
import Layout from '../components/Layout'
import { activityService } from '../services/activityService'
import { useAuth } from '../context/AuthContext'
import { Plus, Trash2, Search } from 'lucide-react'
import { Activity, ActivityFormData } from '../types/activity'

const Activities = () => {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'ALL' | 'FALLA' | 'RUTINA' | 'TRABAJO_TALLER'>('ALL')

  const [formData, setFormData] = useState<ActivityFormData>({
    tipo: 'FALLA',
    categoria: 'ZONA_CALIENTE',
    equipo: '',
    tecnico: user?.nombre + ' ' + user?.apellido || '',
    numFicha: user?.numFicha || '',
    turno: '',
    descripcion: ''
  })

  useEffect(() => {
    loadActivities()
  }, [])

  useEffect(() => {
    filterActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, searchTerm, filterType])

  const loadActivities = async () => {
    try {
      const data = await activityService.getAll()
      setActivities(data)
    } catch (error) {
      console.error('Error loading activities:', error)
    }
  }

  const filterActivities = () => {
    let filtered = activities

    if (filterType !== 'ALL') {
      filtered = filtered.filter(a => a.tipo === filterType)
    }

    if (searchTerm) {
      filtered = filtered.filter(a =>
        a.equipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredActivities(filtered)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await activityService.create(formData)
      setShowForm(false)
      setFormData({
        tipo: 'FALLA',
        categoria: 'ZONA_CALIENTE',
        equipo: '',
        tecnico: user?.nombre + ' ' + user?.apellido || '',
        numFicha: user?.numFicha || '',
        turno: '',
        descripcion: ''
      })
      loadActivities()
    } catch (error) {
      console.error('Error creating activity:', error)
      alert('Error al crear la actividad')
    }
  }

  const handleDelete = async (id: number | undefined) => {
    if (!id) return
    if (window.confirm('¿Está seguro de eliminar esta actividad?')) {
      try {
        await activityService.delete(id)
        loadActivities()
      } catch (error) {
        console.error('Error deleting activity:', error)
        alert('Error al eliminar la actividad')
      }
    }
  }

  return (
    <Layout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-win11-gray-text">Actividades</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center space-x-2 bg-win11-blue-accent text-white px-4 py-2.5 rounded-win11-sm hover:bg-win11-blue-dark transition-colors shadow-win11"
          >
            <Plus size={18} />
            <span className="font-medium">Nueva Actividad</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-5 rounded-win11 shadow-win11 border border-win11-gray-border">
            <h2 className="text-lg font-semibold text-win11-gray-text mb-5">Nueva Actividad</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-win11-gray-text mb-1.5">Tipo</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as ActivityFormData['tipo'] })}
                    className="w-full px-3 py-2 border border-win11-gray-border rounded-win11-sm text-win11-gray-text focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent"
                    required
                  >
                    <option value="FALLA">Falla</option>
                    <option value="RUTINA">Rutina</option>
                    <option value="TRABAJO_TALLER">Trabajo de Taller</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-win11-gray-text mb-1.5">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value as ActivityFormData['categoria'] })}
                    className="w-full px-3 py-2 border border-win11-gray-border rounded-win11-sm text-win11-gray-text focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent"
                    required
                  >
                    <option value="ZONA_CALIENTE">Zona Caliente</option>
                    <option value="ZONA_FRIA">Zona Fría</option>
                    <option value="TALLER">Taller</option>
                    <option value="OTROS">Otros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-win11-gray-text mb-1.5">Equipo</label>
                  <input
                    type="text"
                    value={formData.equipo}
                    onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
                    className="w-full px-3 py-2 border border-win11-gray-border rounded-win11-sm text-win11-gray-text focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-win11-gray-text mb-1.5">Turno</label>
                  <select
                    value={formData.turno}
                    onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
                    className="w-full px-3 py-2 border border-win11-gray-border rounded-win11-sm text-win11-gray-text focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent"
                    required
                  >
                    <option value="">Seleccione</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="Z">Z</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-win11-gray-text mb-1.5">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-win11-gray-border rounded-win11-sm text-win11-gray-text focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-win11-gray-border rounded-win11-sm text-win11-gray-text hover:bg-win11-gray-bg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-win11-blue-accent text-white rounded-win11-sm hover:bg-win11-blue-dark transition-colors shadow-win11"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white p-5 rounded-win11 shadow-win11 border border-win11-gray-border">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 text-win11-gray-muted" size={18} />
              <input
                type="text"
                placeholder="Buscar por equipo o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-win11-gray-border rounded-win11-sm text-win11-gray-text focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="w-full sm:w-auto px-4 py-2 border border-win11-gray-border rounded-win11-sm text-win11-gray-text focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent"
            >
              <option value="ALL">Todos</option>
              <option value="FALLA">Fallas</option>
              <option value="RUTINA">Rutinas</option>
              <option value="TRABAJO_TALLER">Trabajos Taller</option>
            </select>
          </div>

          <div className="overflow-x-auto -mx-5 sm:mx-0">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-win11-gray-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-win11-gray-muted uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-win11-gray-muted uppercase tracking-wider">Equipo</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold text-win11-gray-muted uppercase tracking-wider">Técnico</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-win11-gray-muted uppercase tracking-wider">Turno</th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-win11-gray-muted uppercase tracking-wider">Descripción</th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-win11-gray-muted uppercase tracking-wider">Fecha</th>
                  {user?.tipo === 'admin' && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-win11-gray-muted uppercase tracking-wider">Acciones</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-win11-gray-border">
                {filteredActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-win11-gray-light transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-win11-sm ${
                        activity.tipo === 'FALLA' ? 'bg-win11-red/10 text-win11-red' :
                        activity.tipo === 'RUTINA' ? 'bg-win11-green/10 text-win11-green' :
                        'bg-win11-purple/10 text-win11-purple'
                      }`}>
                        {activity.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-win11-gray-text font-medium">{activity.equipo}</td>
                    <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap text-sm text-win11-gray-text">{activity.tecnico}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-win11-gray-text">{activity.turno}</td>
                    <td className="hidden lg:table-cell px-4 py-3 text-sm text-win11-gray-muted max-w-md truncate">{activity.descripcion}</td>
                    <td className="hidden sm:table-cell px-4 py-3 whitespace-nowrap text-sm text-win11-gray-muted">
                      {activity.createdAt && new Date(activity.createdAt).toLocaleDateString()}
                    </td>
                    {user?.tipo === 'admin' && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className="p-1.5 text-win11-red hover:bg-win11-red/10 rounded-win11-sm transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredActivities.length === 0 && (
            <p className="text-center text-win11-gray-muted py-12">No hay actividades que mostrar</p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Activities
