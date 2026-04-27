import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Employee, EmployeeStatus } from '../types/models'

interface EmployeeFormDialogProps {
  employee?: Employee | undefined
  open: boolean
  onClose: () => void
  onSave: (employee: Employee) => void
}

const statusOptions: Array<{ label: string; value: EmployeeStatus }> = [
  { label: 'Activo', value: 'active' },
  { label: 'Vacaciones', value: 'vacation' },
  { label: 'Desconectado', value: 'offline' },
]

function EmployeeFormDialog({
  employee,
  open,
  onClose,
  onSave,
}: EmployeeFormDialogProps) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [status, setStatus] = useState<EmployeeStatus>(employee?.status ?? 'active')
  const [workload, setWorkload] = useState<number>(employee?.workload ?? 50)

  useEffect(() => {
    if (!formRef.current) {
      return
    }

    setStatus(employee?.status ?? 'active')
    setWorkload(employee?.workload ?? 50)

    if (!open) {
      return
    }

    formRef.current.reset()
  }, [employee, open])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    onSave({
      id: employee?.id ?? crypto.randomUUID(),
      name: String(formData.get('name') ?? '').trim(),
      role: String(formData.get('role') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      status,
      workload,
    })
  }

  return (
    <Dialog
      visible={open}
      onHide={onClose}
      header={employee ? 'Editar empleado' : 'Nuevo empleado'}
      className="crud-dialog"
      modal
    >
      <form ref={formRef} className="crud-form" onSubmit={handleSubmit}>
        <label>
          <span>Nombre</span>
          <InputText name="name" defaultValue={employee?.name} required />
        </label>
        <label>
          <span>Puesto</span>
          <InputText name="role" defaultValue={employee?.role} required />
        </label>
        <label>
          <span>Email</span>
          <InputText name="email" defaultValue={employee?.email} type="email" required />
        </label>
        <label>
          <span>Estado</span>
          <Dropdown
            options={statusOptions}
            value={status}
            onChange={(event) => setStatus(event.value as EmployeeStatus)}
            optionLabel="label"
            optionValue="value"
          />
          <input type="hidden" name="status" value={status} />
        </label>
        <label>
          <span>Carga de trabajo</span>
          <InputNumber
            value={workload}
            onValueChange={(event) => setWorkload(event.value ?? 0)}
            min={0}
            max={100}
            suffix="%"
            useGrouping={false}
          />
          <input type="hidden" name="workload" value={workload} />
        </label>
        <div className="crud-form__actions">
          <Button type="button" label="Cancelar" text onClick={onClose} />
          <Button
            type="submit"
            label={employee ? 'Guardar cambios' : 'Crear empleado'}
            outlined
          />
        </div>
      </form>
    </Dialog>
  )
}

export default EmployeeFormDialog
