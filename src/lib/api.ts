import type { AgendaTask, Employee } from '../types/models'

const API_BASE_URL = 'http://localhost:3001'

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function fetchEmployees() {
  return request<Employee[]>('/employees')
}

export function fetchTasks() {
  return request<AgendaTask[]>('/tasks')
}

export function createEmployee(employee: Employee) {
  return request<Employee>('/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
  })
}

export function updateEmployee(employeeId: string, employee: Employee) {
  return request<Employee>(`/employees/${employeeId}`, {
    method: 'PUT',
    body: JSON.stringify(employee),
  })
}

export function deleteEmployee(employeeId: string) {
  return request<void>(`/employees/${employeeId}`, {
    method: 'DELETE',
  })
}

export function createTask(task: AgendaTask) {
  return request<AgendaTask>('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export function updateTask(taskId: string, task: AgendaTask) {
  return request<AgendaTask>(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  })
}

export function deleteTask(taskId: string) {
  return request<void>(`/tasks/${taskId}`, {
    method: 'DELETE',
  })
}

export async function deleteTasksByEmployee(employeeId: string) {
  const tasks = await request<AgendaTask[]>(`/tasks?employeeId=${employeeId}`)

  await Promise.all(
    tasks.map((task) =>
      request<void>(`/tasks/${task.id}`, {
        method: 'DELETE',
      }),
    ),
  )
}
