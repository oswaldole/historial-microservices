import { useEffect, useState, FormEvent } from 'react'
import Layout from '../components/Layout'
import { userService } from '../services/userService'
import { useAuth } from '../context/AuthContext'
import { Plus, Trash2, Edit, Search, Users as UsersIcon } from 'lucide-react'
import { User, UserFormData } from '../types/user'

const Users = () => {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'ALL' | 'ADMIN' | 'USUARIO'>('ALL')

  const [formData, setFormData] = useState<UserFormData>({
    numFicha: '',
    cedula: '',
    nombre: '',
    apellido: '',
    role: 'USUARIO'
  })

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    filterUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, searchTerm, filterType])

  const loadUsers = async () => {
    try {
      const data = await userService.getAll()
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
      alert('Error al cargar usuarios')
    }
  }

  const filterUsers = () => {
    let filtered = users

    if (filterType !== 'ALL') {
      filtered = filtered.filter(u => u.role === filterType)
    }

    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.numFicha.includes(searchTerm) ||
        (u.cedula && u.cedula.includes(searchTerm))
      )
    }

    setFilteredUsers(filtered)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await userService.update(editingUser.id!, formData)
      } else {
        await userService.create(formData)
      }
      setShowForm(false)
      setEditingUser(null)
      resetForm()
      loadUsers()
    } catch (error) {
      console.error('Error saving user:', error)
      alert('Error al guardar el usuario')
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      numFicha: user.numFicha,
      cedula: user.cedula || '',
      nombre: user.nombre,
      apellido: user.apellido,
      role: user.role
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number | undefined) => {
    if (!id) return
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        await userService.delete(id)
        loadUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Error al eliminar el usuario')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      numFicha: '',
      cedula: '',
      nombre: '',
      apellido: '',
      tipo: 'user'
    })
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingUser(null)
    resetForm()
  }

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <UsersIcon className="text-gray-700" size={24} />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Administración de Usuarios</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Nuevo Usuario</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número de Ficha <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.numFicha}
                    onChange={(e) => setFormData({ ...formData, numFicha: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Ej: 12345"
                    pattern="[0-9]{1,20}"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cédula <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cedula}
                    onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Ej: 12345678"
                    pattern="[0-9]{1,20}"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Nombre del usuario"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Apellido del usuario"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de Usuario <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserFormData['role'] })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    required
                  >
                    <option value="USUARIO">Usuario</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingUser ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre, apellido, ficha o cédula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="ALL">Todos</option>
              <option value="ADMIN">Administradores</option>
              <option value="USUARIO">Usuarios</option>
            </select>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ficha</th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cédula</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Creación</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{user.numFicha}</td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.cedula || 'N/A'}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {user.nombre}
                      <span className="md:hidden block text-xs text-gray-500">{user.apellido}</span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.apellido}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'ADMIN' ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        {user.numFicha !== currentUser?.numFicha && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 py-8">No hay usuarios que mostrar</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <UsersIcon className="text-blue-600 mt-0.5" size={20} />
            <div>
              <h3 className="text-sm font-semibold text-blue-900">Información</h3>
              <p className="text-sm text-blue-700 mt-1">
                Total de usuarios: <strong>{users.length}</strong>
                {' '}| Administradores: <strong>{users.filter(u => u.role === 'ADMIN').length}</strong>
                {' '}| Usuarios: <strong>{users.filter(u => u.role === 'USUARIO').length}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users
