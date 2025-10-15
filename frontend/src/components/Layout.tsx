import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home, FileText, BarChart3, Users, LogOut } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">Historial</h1>
              <div className="flex space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded">
                  <Home size={20} />
                  <span>Inicio</span>
                </Link>
                <Link to="/activities" className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded">
                  <FileText size={20} />
                  <span>Actividades</span>
                </Link>
                {user?.tipo === 'admin' && (
                  <>
                    <Link to="/reports" className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded">
                      <BarChart3 size={20} />
                      <span>Reportes</span>
                    </Link>
                    <Link to="/users" className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded">
                      <Users size={20} />
                      <span>Usuarios</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {user?.nombre} {user?.apellido} ({user?.tipo})
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
              >
                <LogOut size={20} />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p className="text-sm">Intendencia de Sistemas Electricos y Electronicos</p>
      </footer>
    </div>
  )
}

export default Layout
