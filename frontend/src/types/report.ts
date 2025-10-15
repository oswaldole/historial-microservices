export interface ReportSummary {
  totalActivities: number
  activitiesByType: Record<string, number>
  activitiesByCategory: Record<string, number>
  activitiesByEquipo: Record<string, number>
  activitiesByTurno: Record<string, number>
}
