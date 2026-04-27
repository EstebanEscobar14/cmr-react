export type EmployeeStatus = 'active' | 'vacation' | 'offline'

export type TaskPriority = 'high' | 'medium' | 'low'

export interface Employee {
  id: string
  name: string
  role: string
  email: string
  status: EmployeeStatus
  workload: number
}

export interface AgendaTask {
  id: string
  title: string
  description: string
  date: string
  priority: TaskPriority
  employeeId: string
  completed: boolean
}
