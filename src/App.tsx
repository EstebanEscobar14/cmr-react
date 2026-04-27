import { PrimeReactProvider } from 'primereact/api'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import AgendaPage from './pages/AgendaPage'
import DashboardPage from './pages/DashboardPage'
import EmployeesPage from './pages/EmployeesPage'
import { seedEmployees, seedTasks } from './data/seed'
import {
  createEmployee,
  createTask,
  deleteEmployee,
  deleteTasksByEmployee,
  deleteTask,
  fetchEmployees,
  fetchTasks,
  updateEmployee,
  updateTask,
} from './lib/api'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import type { AgendaTask, Employee } from './types/models'
import './App.css'

function App() {
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees)
  const [tasks, setTasks] = useState<AgendaTask[]>(seedTasks)
  const [isLoading, setIsLoading] = useState(true)
  const [dataError, setDataError] = useState<string | null>(null)
  const [themeMode, setThemeMode] = useLocalStorageState<'light' | 'dark'>(
    'crm-react-theme-mode',
    'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
  }, [themeMode])

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [employeesResponse, tasksResponse] = await Promise.all([
          fetchEmployees(),
          fetchTasks(),
        ])
        setEmployees(employeesResponse)
        setTasks(tasksResponse)
        setDataError(null)
      } catch {
        setDataError(
          'No se pudo conectar con json-server. Se muestran los datos semilla del proyecto.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadData()
  }, [])

  const handleSaveEmployee = async (employee: Employee) => {
    const exists = employees.some((currentEmployee) => currentEmployee.id === employee.id)
    const savedEmployee = exists
      ? await updateEmployee(employee.id, employee)
      : await createEmployee(employee)

    setEmployees((currentEmployees) => {
      if (exists) {
        return currentEmployees.map((currentEmployee) =>
          currentEmployee.id === savedEmployee.id ? savedEmployee : currentEmployee,
        )
      }

      return [...currentEmployees, savedEmployee]
    })
  }

  const handleDeleteEmployee = async (employeeId: string) => {
    await deleteTasksByEmployee(employeeId)
    await deleteEmployee(employeeId)
    setEmployees((currentEmployees) =>
      currentEmployees.filter((employee) => employee.id !== employeeId),
    )
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.employeeId !== employeeId),
    )
  }

  const handleSaveTask = async (task: AgendaTask) => {
    const exists = tasks.some((currentTask) => currentTask.id === task.id)
    const savedTask = exists ? await updateTask(task.id, task) : await createTask(task)

    setTasks((currentTasks) => {
      if (exists) {
        return currentTasks.map((currentTask) =>
          currentTask.id === savedTask.id ? savedTask : currentTask,
        )
      }

      return [...currentTasks, savedTask]
    })
  }

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId)
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  const handleToggleTask = async (taskId: string) => {
    const taskToToggle = tasks.find((task) => task.id === taskId)

    if (!taskToToggle) {
      return
    }

    const updatedTask = await updateTask(taskId, {
      ...taskToToggle,
      completed: !taskToToggle.completed,
    })

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    )
  }

  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                employees={employees}
                tasks={tasks}
                themeMode={themeMode}
                setThemeMode={setThemeMode}
              />
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <DashboardPage
                  employees={employees}
                  tasks={tasks}
                  isLoading={isLoading}
                  dataError={dataError}
                />
              }
            />
            <Route
              path="employees"
              element={
                <EmployeesPage
                  employees={employees}
                  isLoading={isLoading}
                  dataError={dataError}
                  onDeleteEmployee={handleDeleteEmployee}
                  onSaveEmployee={handleSaveEmployee}
                  tasks={tasks}
                />
              }
            />
            <Route
              path="agenda"
              element={
                <AgendaPage
                  employees={employees}
                  dataError={dataError}
                  isLoading={isLoading}
                  onDeleteTask={handleDeleteTask}
                  onSaveTask={handleSaveTask}
                  onToggleTask={handleToggleTask}
                  tasks={tasks}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
