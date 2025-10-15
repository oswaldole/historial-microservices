export interface Activity {
  id?: number
  tipo: 'FALLA' | 'RUTINA' | 'TRABAJO_TALLER'
  categoria: 'ZONA_CALIENTE' | 'ZONA_FRIA' | 'TALLER' | 'OTROS'
  equipo: string
  tecnico: string
  numFicha: string
  turno: string
  descripcion: string
  createdAt?: string
}

export interface ActivityStats {
  total: number
  fallas: number
  rutinas: number
  trabajos: number
}

export interface ActivityFormData {
  tipo: 'FALLA' | 'RUTINA' | 'TRABAJO_TALLER'
  categoria: 'ZONA_CALIENTE' | 'ZONA_FRIA' | 'TALLER' | 'OTROS'
  equipo: string
  tecnico: string
  numFicha: string
  turno: string
  descripcion: string
}
