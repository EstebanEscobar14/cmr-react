import {
  createEmployee,
  deleteTasksByEmployee,
  fetchEmployees,
} from './api'
import type { Employee } from '../types/models'

describe('api helpers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetchEmployees requests the employee collection', async () => {
    const employees: Employee[] = [
      {
        id: 'emp-1',
        name: 'Lucia Torres',
        role: 'Account Manager',
        email: 'lucia.torres@crm.local',
        status: 'active',
        workload: 78,
      },
    ]

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => employees,
    })

    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchEmployees()).resolves.toEqual(employees)
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/employees', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('createEmployee sends a POST payload', async () => {
    const employee: Employee = {
      id: 'emp-9',
      name: 'Ada',
      role: 'Sales',
      email: 'ada@crm.local',
      status: 'active',
      workload: 50,
    }

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => employee,
    })

    vi.stubGlobal('fetch', fetchMock)

    await expect(createEmployee(employee)).resolves.toEqual(employee)
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('deleteTasksByEmployee deletes every linked task', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          { id: 'task-1', employeeId: 'emp-4' },
          { id: 'task-2', employeeId: 'emp-4' },
        ],
      })
      .mockResolvedValue({
        ok: true,
        status: 204,
        json: async () => undefined,
      })

    vi.stubGlobal('fetch', fetchMock)

    await deleteTasksByEmployee('emp-4')

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'http://localhost:3001/tasks?employeeId=emp-4',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'http://localhost:3001/tasks/task-1',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      'http://localhost:3001/tasks/task-2',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  })
})
