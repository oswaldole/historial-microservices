export interface User {
  id?: number
  numFicha: string
  cedula?: string
  nombre: string
  apellido: string
  role: 'ADMIN' | 'USUARIO'
  isActive?: boolean
  createdAt?: string
}

export interface UserFormData {
  numFicha: string
  cedula: string
  nombre: string
  apellido: string
  role: 'ADMIN' | 'USUARIO'
}
