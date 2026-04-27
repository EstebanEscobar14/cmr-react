import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import type { AgendaTask, Employee, TaskPriority } from '../types/models'

interface TaskFormDialogProps {
  employees: Employee[]
  open: boolean
  task?: AgendaTask | undefined
  onClose: () => void
  onSave: (task: AgendaTask) => void
}

const priorityOptions: Array<{ label: string; value: TaskPriority }> = [
  { label: 'Alta', value: 'high' },
  { label: 'Media', value: 'medium' },
  { label: 'Baja', value: 'low' },
]

function TaskFormDialog({
  employees,
  open,
  task,
  onClose,
  onSave,
}: TaskFormDialogProps) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [employeeId, setEmployeeId] = useState<string>(task?.employeeId ?? employees[0]?.id ?? '')
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'medium')
  const [date, setDate] = useState<Date>(task ? new Date(task.date) : new Date())
  const [completed, setCompleted] = useState<boolean>(task?.completed ?? false)

  useEffect(() => {
    if (!formRef.current) {
      return
    }

    setEmployeeId(task?.employeeId ?? employees[0]?.id ?? '')
    setPriority(task?.priority ?? 'medium')
    setDate(task ? new Date(task.date) : new Date())
    setCompleted(task?.completed ?? false)

    if (!open) {
      return
    }

    formRef.current.reset()
  }, [employees, open, task])

  const handleSubmit = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    onSave({
      id: task?.id ?? crypto.randomUUID(),
      title: String(formData.get('title') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      employeeId,
      priority,
      date: date.toISOString().slice(0, 10),
      completed,
    })
  }

  return (
    <Dialog
      visible={open}
      onHide={onClose}
      header={task ? 'Editar tarea' : 'Nueva tarea'}
      className="crud-dialog"
      modal
    >
      <form ref={formRef} className="crud-form" onSubmit={handleSubmit}>
        <label>
          <span>Titulo</span>
          <InputText name="title" defaultValue={task?.title} required />
        </label>
        <label>
          <span>Descripcion</span>
          <InputTextarea
            name="description"
            defaultValue={task?.description}
            rows={4}
            autoResize
            required
          />
        </label>
        <label>
          <span>Responsable</span>
          <Dropdown
            options={employees}
            value={employeeId}
            onChange={(event) => setEmployeeId(String(event.value))}
            optionLabel="name"
            optionValue="id"
            placeholder="Selecciona un empleado"
            required
          />
        </label>
        <label>
          <span>Prioridad</span>
          <Dropdown
            options={priorityOptions}
            value={priority}
            onChange={(event) => setPriority(event.value as TaskPriority)}
            optionLabel="label"
            optionValue="value"
          />
        </label>
        <label>
          <span>Fecha</span>
          <Calendar
            value={date}
            onChange={(event) => setDate(event.value as Date)}
            dateFormat="yy-mm-dd"
            showIcon
            required
          />
        </label>
        <label className="crud-form__checkbox">
          <Checkbox
            inputId="completed"
            checked={completed}
            onChange={(event) => setCompleted(Boolean(event.checked))}
          />
          <span>Tarea completada</span>
        </label>
        <div className="crud-form__actions">
          <Button type="button" label="Cancelar" text onClick={onClose} />
          <Button
            type="submit"
            label={task ? 'Guardar cambios' : 'Crear tarea'}
            outlined
            disabled={employees.length === 0}
          />
        </div>
      </form>
    </Dialog>
  )
}

export default TaskFormDialog
