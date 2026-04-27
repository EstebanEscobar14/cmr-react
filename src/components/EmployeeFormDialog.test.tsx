import { fireEvent, render, screen } from '@testing-library/react'
import EmployeeFormDialog from './EmployeeFormDialog'

vi.mock('primereact/dialog', () => ({
  Dialog: ({
    children,
    visible,
    header,
  }: {
    children: React.ReactNode
    visible: boolean
    header: string
  }) => (visible ? <section aria-label={header}>{children}</section> : null),
}))

vi.mock('primereact/button', () => ({
  Button: ({
    label,
    type = 'button',
    onClick,
    disabled,
  }: {
    label: string
    type?: 'button' | 'submit'
    onClick?: () => void
    disabled?: boolean
  }) => (
    <button type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  ),
}))

vi.mock('primereact/inputtext', () => ({
  InputText: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
}))

vi.mock('primereact/dropdown', () => ({
  Dropdown: ({
    options,
    value,
    onChange,
  }: {
    options: Array<{ label: string; value: string }>
    value: string
    onChange: (event: { value: string }) => void
  }) => (
    <select
      aria-label="Estado"
      value={value}
      onChange={(event) => onChange({ value: event.target.value })}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}))

vi.mock('primereact/inputnumber', () => ({
  InputNumber: ({
    value,
    onValueChange,
  }: {
    value: number
    onValueChange: (event: { value: number }) => void
  }) => (
    <input
      aria-label="Carga de trabajo"
      type="number"
      value={value}
      onChange={(event) => onValueChange({ value: Number(event.target.value) })}
    />
  ),
}))

describe('EmployeeFormDialog', () => {
  it('submits the employee payload with current field values', () => {
    const onSave = vi.fn()
    vi.stubGlobal('crypto', { randomUUID: () => 'generated-id' })

    render(
      <EmployeeFormDialog
        open
        onClose={vi.fn()}
        onSave={onSave}
      />,
    )

    fireEvent.change(screen.getByRole('textbox', { name: /nombre/i }), {
      target: { value: 'Valeria Soto' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /puesto/i }), {
      target: { value: 'Business Developer' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'valeria@crm.local' },
    })
    fireEvent.change(screen.getByLabelText('Estado'), {
      target: { value: 'vacation' },
    })
    fireEvent.change(screen.getByLabelText('Carga de trabajo'), {
      target: { value: '73' },
    })

    fireEvent.click(screen.getByRole('button', { name: /crear empleado/i }))

    expect(onSave).toHaveBeenCalledWith({
      id: 'generated-id',
      name: 'Valeria Soto',
      role: 'Business Developer',
      email: 'valeria@crm.local',
      status: 'vacation',
      workload: 73,
    })
  })
})
