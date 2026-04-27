import { fireEvent, render, screen } from '@testing-library/react'
import AgendaPage from './AgendaPage'
import type { AgendaTask, Employee } from '../types/models'

vi.mock('primereact/button', () => ({
  Button: ({
    label,
    icon,
    onClick,
    ariaLabel,
    'aria-label': ariaLabelProp,
  }: {
    label?: string
    icon?: string
    onClick?: () => void
    ariaLabel?: string
    'aria-label'?: string
  }) => (
    <button
      type="button"
      aria-label={ariaLabel ?? ariaLabelProp ?? label ?? icon}
      onClick={onClick}
    >
      {label ?? icon}
    </button>
  ),
}))

vi.mock('primereact/dropdown', () => ({
  Dropdown: ({
    value,
    options,
    onChange,
  }: {
    value: string
    options: Array<{ label: string; value: string }>
    onChange: (event: { value: string }) => void
  }) => (
    <select
      aria-label="Filtro de estado"
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

vi.mock('primereact/inputtext', () => ({
  InputText: ({
    value,
    onChange,
    placeholder,
  }: {
    value: string
    onChange: (event: { target: { value: string } }) => void
    placeholder?: string
  }) => (
    <input
      aria-label={placeholder}
      value={value}
      onChange={(event) => onChange({ target: { value: event.target.value } })}
    />
  ),
}))

vi.mock('primereact/message', () => ({
  Message: ({ text }: { text: string }) => <div>{text}</div>,
}))

vi.mock('../components/TaskFormDialog', () => ({
  default: () => null,
}))

const employees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Lucia Torres',
    role: 'Account Manager',
    email: 'lucia@crm.local',
    status: 'active',
    workload: 78,
  },
]

const tasks: AgendaTask[] = [
  {
    id: 'task-1',
    title: 'Preparar demo',
    description: 'Revisar flujo comercial',
    date: '2026-05-02',
    priority: 'high',
    employeeId: 'emp-1',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Informe semanal',
    description: 'Consolidar resultados',
    date: '2026-05-03',
    priority: 'low',
    employeeId: 'emp-1',
    completed: true,
  },
]

describe('AgendaPage', () => {
  it('filters tasks by search text', () => {
    render(
      <AgendaPage
        dataError={null}
        employees={employees}
        isLoading={false}
        onDeleteTask={vi.fn().mockResolvedValue(undefined)}
        onSaveTask={vi.fn().mockResolvedValue(undefined)}
        onToggleTask={vi.fn().mockResolvedValue(undefined)}
        tasks={tasks}
      />,
    )

    fireEvent.change(screen.getByLabelText(/buscar por titulo o descripcion/i), {
      target: { value: 'demo' },
    })

    expect(screen.getByText('Preparar demo')).toBeInTheDocument()
    expect(screen.queryByText('Informe semanal')).not.toBeInTheDocument()
  })

  it('calls onToggleTask when the status button is clicked', () => {
    const onToggleTask = vi.fn().mockResolvedValue(undefined)

    render(
      <AgendaPage
        dataError={null}
        employees={employees}
        isLoading={false}
        onDeleteTask={vi.fn().mockResolvedValue(undefined)}
        onSaveTask={vi.fn().mockResolvedValue(undefined)}
        onToggleTask={onToggleTask}
        tasks={tasks}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Pendiente' }))

    expect(onToggleTask).toHaveBeenCalledWith('task-1')
  })
})
