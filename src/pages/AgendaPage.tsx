import { startTransition, useDeferredValue, useState } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message'
import SectionCard from '../components/SectionCard'
import TaskFormDialog from '../components/TaskFormDialog'
import type { AgendaTask, Employee } from '../types/models'

interface AgendaPageProps {
  dataError: string | null
  employees: Employee[]
  isLoading: boolean
  onDeleteTask: (taskId: string) => Promise<void>
  onSaveTask: (task: AgendaTask) => Promise<void>
  onToggleTask: (taskId: string) => Promise<void>
  tasks: AgendaTask[]
}

type StatusFilter = 'all' | 'pending' | 'completed'

const statusOptions: Array<{ label: string; value: StatusFilter }> = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Completadas', value: 'completed' },
]

function AgendaPage({
  dataError,
  employees,
  isLoading,
  onDeleteTask,
  onSaveTask,
  onToggleTask,
  tasks,
}: AgendaPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<AgendaTask | undefined>()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const deferredSearch = useDeferredValue(search)

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      status === 'all' ||
      (status === 'pending' && !task.completed) ||
      (status === 'completed' && task.completed)

    const matchesSearch =
      task.title.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      task.description.toLowerCase().includes(deferredSearch.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const handleCreate = () => {
    setEditingTask(undefined)
    setDialogOpen(true)
  }

  const handleEdit = (task: AgendaTask) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  const handleSave = async (taskToSave: AgendaTask) => {
    await onSaveTask(taskToSave)
    setDialogOpen(false)
  }

  const handleDelete = async (taskId: string) => {
    await onDeleteTask(taskId)
  }

  const handleToggle = async (taskId: string) => {
    await onToggleTask(taskId)
  }

  return (
    <div className="page">
      <SectionCard
        title="Agenda"
        subtitle="Tareas y seguimiento"
        action={
          <Button label="Nueva tarea" icon="pi pi-plus" outlined onClick={handleCreate} />
        }
      >
        {dataError ? <Message severity="warn" text={dataError} /> : null}
        {isLoading ? <Message severity="info" text="Cargando tareas..." /> : null}
        <div className="toolbar-row">
          <InputText
            value={search}
            onChange={(event) => {
              const nextValue = event.target.value

              startTransition(() => {
                setSearch(nextValue)
              })
            }}
            placeholder="Buscar por titulo o descripcion"
          />
          <Dropdown
            value={status}
            options={statusOptions}
            onChange={(event) => setStatus(event.value as StatusFilter)}
            optionLabel="label"
            optionValue="value"
          />
        </div>

        {employees.length === 0 ? (
          <p className="empty-copy">
            Antes de crear tareas necesitas al menos un empleado disponible.
          </p>
        ) : null}

        {filteredTasks.length === 0 ? (
          <p className="empty-copy">No hay tareas que coincidan con el filtro actual.</p>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => {
              const assignedEmployee = employees.find(
                (employee) => employee.id === task.employeeId,
              )

              return (
                <article key={task.id} className="task-card">
                  <div className="task-card__top">
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                    <span
                      className={`priority-badge priority-badge--${task.priority}`}
                    >
                      {task.priority === 'high'
                        ? 'Alta'
                        : task.priority === 'medium'
                          ? 'Media'
                          : 'Baja'}
                    </span>
                  </div>
                  <ul className="meta-list">
                    <li>
                      <i className="pi pi-calendar" aria-hidden="true" />
                      {task.date}
                    </li>
                    <li>
                      <i className="pi pi-user" aria-hidden="true" />
                      {assignedEmployee?.name ?? 'Sin responsable'}
                    </li>
                  </ul>
                  <div className="card-actions">
                    <Button
                      type="button"
                      label={task.completed ? 'Completada' : 'Pendiente'}
                      icon={task.completed ? 'pi pi-check-circle' : 'pi pi-clock'}
                      severity={task.completed ? 'success' : 'secondary'}
                      outlined
                      onClick={() => void handleToggle(task.id)}
                    />
                    <div className="card-actions__cluster">
                      <Button
                        type="button"
                        icon="pi pi-pencil"
                        rounded
                        outlined
                        aria-label="Editar tarea"
                        onClick={() => handleEdit(task)}
                      />
                      <Button
                        type="button"
                        icon="pi pi-trash"
                        rounded
                        outlined
                        severity="danger"
                        aria-label="Eliminar tarea"
                        onClick={() => void handleDelete(task.id)}
                      />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </SectionCard>

      <TaskFormDialog
        employees={employees}
        open={dialogOpen}
        task={editingTask}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}

export default AgendaPage
