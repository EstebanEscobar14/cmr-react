import { Divider } from 'primereact/divider'
import { Message } from 'primereact/message'
import { ProgressBar } from 'primereact/progressbar'
import { Tag } from 'primereact/tag'
import { useEffect, useState } from 'react'
import SectionCard from '../components/SectionCard'
import StatCard from '../components/StatCard'
import type { AgendaTask, Employee } from '../types/models'

interface DashboardPageProps {
  dataError: string | null
  employees: Employee[]
  isLoading: boolean
  tasks: AgendaTask[]
}

function DashboardPage({ dataError, employees, isLoading, tasks }: DashboardPageProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)
  const nextTasks = [...pendingTasks].sort((left, right) => left.date.localeCompare(right.date))

  return (
    <div className="page">
      <section className="hero-panel">
        <div>
          <p className="hero-panel__eyebrow">Agenda basica para CRM</p>
          <h1>Seguimiento simple de equipo y actividades</h1>
          <p className="hero-panel__lead">
            Unificamos empleados, agenda y prioridades en una sola vista con
            persistencia local y navegacion estatica.
          </p>
        </div>
        <div className="hero-panel__clock">
          <span>Ultima actividad</span>
          <strong>{now.toLocaleTimeString('es-ES')}</strong>
          <small>{now.toLocaleDateString('es-ES')}</small>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard
          label="Equipo"
          value={String(employees.length)}
          helper="empleados registrados"
          icon={<i className="pi pi-users" aria-hidden="true" />}
          severity="info"
        />
        <StatCard
          label="Pendientes"
          value={String(pendingTasks.length)}
          helper="tareas por ejecutar"
          icon={<i className="pi pi-list-check" aria-hidden="true" />}
          severity="warning"
        />
        <StatCard
          label="Completadas"
          value={String(completedTasks.length)}
          helper="cierres simulados"
          icon={<i className="pi pi-check-circle" aria-hidden="true" />}
          severity="success"
        />
      </section>

      {dataError ? <Message severity="warn" text={dataError} /> : null}
      {isLoading ? <Message severity="info" text="Cargando datos de json-server..." /> : null}

      <section className="content-grid">
        <SectionCard title="Vista general" subtitle="Proximas tareas">
          {nextTasks.length === 0 ? (
            <p className="empty-copy">No hay tareas pendientes ahora mismo.</p>
          ) : (
            <ul className="timeline-list">
              {nextTasks.slice(0, 4).map((task) => (
                <li key={task.id}>
                  <div>
                    <strong>{task.title}</strong>
                    <span>{task.date}</span>
                  </div>
                  <Tag
                    value={
                      task.priority === 'high'
                        ? 'Alta'
                        : task.priority === 'medium'
                          ? 'Media'
                          : 'Baja'
                    }
                    severity={
                      task.priority === 'high'
                        ? 'danger'
                        : task.priority === 'medium'
                          ? 'warning'
                          : 'success'
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Carga del equipo" subtitle="Disponibilidad actual">
          <div className="workload-list">
            {employees.map((employee) => (
              <div key={employee.id} className="workload-item">
                <div className="workload-item__header">
                  <div className="workload-item__header-content">
                    <strong>{employee.name}</strong>
                    <span>{employee.role}</span>
                  </div>
                  <Tag
                    value={
                      employee.status === 'active'
                        ? 'Activo'
                        : employee.status === 'vacation'
                          ? 'Vacaciones'
                          : 'Offline'
                    }
                    severity={employee.status === 'active' ? 'success' : 'secondary'}
                  />
                </div>
                <ProgressBar value={employee.workload} showValue={false} />
                <small>{employee.workload}% de ocupacion simulada</small>
                <Divider />
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  )
}

export default DashboardPage
