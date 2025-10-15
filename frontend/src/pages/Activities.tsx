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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Actividades</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Nueva Actividad</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Nueva Actividad</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as ActivityFormData['tipo'] })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    required
                  >
                    <option value="FALLA">Falla</option>
                    <option value="RUTINA">Rutina</option>
                    <option value="TRABAJO_TALLER">Trabajo de Taller</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value as ActivityFormData['categoria'] })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    required
                  >
                    <option value="ZONA_CALIENTE">Zona Caliente</option>
                    <option value="ZONA_FRIA">Zona Fría</option>
                    <option value="TALLER">Taller</option>
                    <option value="OTROS">Otros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Equipo</label>
                  <input
                    type="text"
                    value={formData.equipo}
                    onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Turno</label>
                  <select
                    value={formData.turno}
                    onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
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
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por equipo o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="ALL">Todos</option>
              <option value="FALLA">Fallas</option>
              <option value="RUTINA">Rutinas</option>
              <option value="TRABAJO_TALLER">Trabajos Taller</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Técnico</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turno</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  {user?.tipo === 'admin' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activity.tipo === 'FALLA' ? 'bg-red-100 text-red-800' :
                        activity.tipo === 'RUTINA' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.equipo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.tecnico}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.turno}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{activity.descripcion.substring(0, 50)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.createdAt && new Date(activity.createdAt).toLocaleDateString()}
                    </td>
                    {user?.tipo === 'admin' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredActivities.length === 0 && (
            <p className="text-center text-gray-500 py-8">No hay actividades que mostrar</p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Activities
