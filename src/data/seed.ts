import type { AgendaTask, Employee } from '../types/models'

export const seedEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Lucia Torres',
    role: 'Account Manager',
    email: 'lucia.torres@crm.local',
    status: 'active',
    workload: 78,
  },
  {
    id: 'emp-2',
    name: 'Mateo Ruiz',
    role: 'Sales Ops',
    email: 'mateo.ruiz@crm.local',
    status: 'vacation',
    workload: 24,
  },
  {
    id: 'emp-3',
    name: 'Noa Delgado',
    role: 'Customer Success',
    email: 'noa.delgado@crm.local',
    status: 'active',
    workload: 61,
  },
]

export const seedTasks: AgendaTask[] = [
  {
    id: 'task-1',
    title: 'Preparar demo de onboarding',
    description: 'Revisar el guion comercial y dejar el material listo para la reunion.',
    date: '2026-04-28',
    priority: 'high',
    employeeId: 'emp-1',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Actualizar forecast semanal',
    description: 'Ajustar pipeline y comprobar oportunidades con cierre estimado.',
    date: '2026-04-29',
    priority: 'medium',
    employeeId: 'emp-2',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Llamada de seguimiento con cliente',
    description: 'Validar incidencias abiertas y proponer siguiente accion.',
    date: '2026-04-27',
    priority: 'low',
    employeeId: 'emp-3',
    completed: true,
  },
]
