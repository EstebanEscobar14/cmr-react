import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Tag } from 'primereact/tag'
import { useState } from 'react'
import EmployeeFormDialog from '../components/EmployeeFormDialog'
import SectionCard from '../components/SectionCard'
import type { AgendaTask, Employee } from '../types/models'

interface EmployeesPageProps {
  employees: Employee[]
  isLoading: boolean
  dataError: string | null
  onDeleteEmployee: (employeeId: string) => Promise<void>
  onSaveEmployee: (employee: Employee) => Promise<void>
  tasks: AgendaTask[]
}

function EmployeesPage({
  employees,
  isLoading,
  dataError,
  onDeleteEmployee,
  onSaveEmployee,
  tasks,
}: EmployeesPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>()

  const handleCreate = () => {
    setEditingEmployee(undefined)
    setDialogOpen(true)
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setDialogOpen(true)
  }

  const handleDelete = async (employeeId: string) => {
    await onDeleteEmployee(employeeId)
  }

  const handleSave = async (employeeToSave: Employee) => {
    await onSaveEmployee(employeeToSave)
    setDialogOpen(false)
  }

  return (
    <div className="page">
      <SectionCard
        title="CRUD de empleados"
        subtitle="Equipo comercial"
        action={
          <Button label="Nuevo empleado" icon="pi pi-plus" outlined onClick={handleCreate} />
        }
      >
        <p className="section-copy">
          Gestion basica de empleados con formulario no controlado y persistencia en
          json-server.
        </p>
        {dataError ? <Message severity="warn" text={dataError} /> : null}
        {isLoading ? <Message severity="info" text="Cargando empleados..." /> : null}

        {employees.length === 0 ? (
          <Message
            severity="warn"
            text="No hay empleados registrados. Crea uno nuevo para continuar."
          />
        ) : (
          <div className="employee-grid">
            {employees.map((employee) => {
              const assignedTasks = tasks.filter((task) => task.employeeId === employee.id).length

              return (
                <article key={employee.id} className="employee-card">
                  <div className="employee-card__header">
                    <div>
                      <h3>{employee.name}</h3>
                      <p>{employee.role}</p>
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
                  <ul className="meta-list">
                    <li>
                      <i className="pi pi-envelope" aria-hidden="true" />
                      {employee.email}
                    </li>
                    <li>
                      <i className="pi pi-chart-bar" aria-hidden="true" />
                      {employee.workload}% de carga
                    </li>
                    <li>
                      <i className="pi pi-briefcase" aria-hidden="true" />
                      {assignedTasks} tareas asignadas
                    </li>
                  </ul>
                  <div className="card-actions">
                    <Button
                      type="button"
                      label="Editar"
                      icon="pi pi-pencil"
                      outlined
                      onClick={() => handleEdit(employee)}
                    />
                    <Button
                      type="button"
                      label="Eliminar"
                      icon="pi pi-trash"
                      severity="danger"
                      outlined
                      onClick={() => void handleDelete(employee.id)}
                    />
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </SectionCard>

      <EmployeeFormDialog
        employee={editingEmployee}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}

export default EmployeesPage
