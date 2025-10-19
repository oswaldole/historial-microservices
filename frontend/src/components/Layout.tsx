import { ReactNode, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home, FileText, BarChart3, Users, LogOut, Menu, X } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-win11-gray-bg">
      {/* Windows 11 style navigation bar */}
      <nav className="bg-white border-b border-win11-gray-border shadow-win11">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg md:text-xl font-semibold text-win11-gray-text">Historial</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
              >
                <Home size={18} />
                <span className="text-sm font-medium">Inicio</span>
              </Link>
              <Link
                to="/activities"
                className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
              >
                <FileText size={18} />
                <span className="text-sm font-medium">Actividades</span>
              </Link>
              {user?.tipo === 'admin' && (
                <>
                  <Link
                    to="/reports"
                    className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
                  >
                    <BarChart3 size={18} />
                    <span className="text-sm font-medium">Reportes</span>
                  </Link>
                  <Link
                    to="/users"
                    className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
                  >
                    <Users size={18} />
                    <span className="text-sm font-medium">Usuarios</span>
                  </Link>
                </>
              )}
            </div>

            {/* Desktop User Info and Logout */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-win11-gray-text">{user?.nombre} {user?.apellido}</p>
                <p className="text-xs text-win11-gray-muted">{user?.tipo}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-win11-sm hover:bg-win11-gray-bg text-win11-gray-text transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-3 space-y-1 border-t border-win11-gray-border mt-1 pt-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
              >
                <Home size={18} />
                <span className="text-sm font-medium">Inicio</span>
              </Link>
              <Link
                to="/activities"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
              >
                <FileText size={18} />
                <span className="text-sm font-medium">Actividades</span>
              </Link>
              {user?.tipo === 'admin' && (
                <>
                  <Link
                    to="/reports"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
                  >
                    <BarChart3 size={18} />
                    <span className="text-sm font-medium">Reportes</span>
                  </Link>
                  <Link
                    to="/users"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
                  >
                    <Users size={18} />
                    <span className="text-sm font-medium">Usuarios</span>
                  </Link>
                </>
              )}
              <div className="border-t border-win11-gray-border pt-2 mt-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-win11-gray-text">{user?.nombre} {user?.apellido}</p>
                  <p className="text-xs text-win11-gray-muted">{user?.tipo}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleLogout()
                  }}
                  className="w-full flex items-center space-x-2 text-win11-gray-text hover:bg-win11-gray-bg px-3 py-2 rounded-win11-sm transition-colors"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Salir</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 max-w-7xl">
        {children}
      </main>

      <footer className="bg-white border-t border-win11-gray-border text-center py-4 mt-8">
        <p className="text-xs sm:text-sm text-win11-gray-muted">Intendencia de Sistemas Electricos y Electronicos</p>
      </footer>
    </div>
  )
}

export default Layout
