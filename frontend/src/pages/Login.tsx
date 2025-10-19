import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [numFicha, setNumFicha] = useState('')
  const [cedula, setCedula] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(numFicha, cedula)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message || 'Invalid credentials')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-win11-blue to-win11-blue-dark px-4">
      <div className="max-w-md w-full">
        {/* Windows 11 Acrylic-style card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-win11 shadow-win11-lg border border-white/20 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-win11-blue-accent rounded-win11 mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-win11-gray-text mb-2">
              Historial
            </h2>
            <p className="text-sm text-win11-gray-muted">
              Sistemas Electronicos y Electronicos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="numFicha" className="block text-sm font-medium text-win11-gray-text mb-1.5">
                Número de Ficha
              </label>
              <input
                type="text"
                id="numFicha"
                value={numFicha}
                onChange={(e) => setNumFicha(e.target.value)}
                className="w-full px-4 py-2.5 border border-win11-gray-border rounded-win11-sm text-win11-gray-text bg-white focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent transition-all"
                placeholder="Ingrese su número de ficha"
                required
                pattern="[0-9]{1,20}"
              />
            </div>

            <div>
              <label htmlFor="cedula" className="block text-sm font-medium text-win11-gray-text mb-1.5">
                Cédula
              </label>
              <input
                type="password"
                id="cedula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                className="w-full px-4 py-2.5 border border-win11-gray-border rounded-win11-sm text-win11-gray-text bg-white focus:outline-none focus:ring-2 focus:ring-win11-blue-accent focus:border-transparent transition-all"
                placeholder="Ingrese su cédula"
                required
                pattern="[0-9]{1,20}"
              />
            </div>

            {error && (
              <div className="bg-win11-red/10 border border-win11-red/20 text-win11-red px-4 py-3 rounded-win11-sm text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-win11-sm text-sm font-semibold text-white bg-win11-blue-accent hover:bg-win11-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-win11-blue-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-win11"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/80 text-xs mt-6">
          Intendencia de Sistemas Electricos y Electronicos
        </p>
      </div>
    </div>
  )
}

export default Login
