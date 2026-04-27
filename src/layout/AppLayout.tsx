import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup';
import { Chip } from 'primereact/chip'
import { InputSwitch } from 'primereact/inputswitch'
import { Link, NavLink, Outlet } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'
import nterLogo from '../assets/nterlogo.svg'
import type { AgendaTask, Employee } from '../types/models'

interface AppLayoutProps {
  employees: Employee[]
  tasks: AgendaTask[]
  themeMode: 'light' | 'dark'
  setThemeMode: Dispatch<SetStateAction<'light' | 'dark'>>
}

function AppLayout({ employees, tasks, themeMode, setThemeMode }: AppLayoutProps) {
  const pendingTasks = tasks.filter((task) => !task.completed).length

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__identity">
          <img className="topbar__logo" src={nterLogo} alt="Nter logo" />
          <div>
            <p className="topbar__eyebrow">Prueba React I</p>
            <Link className="topbar__brand" to="/dashboard">
              CRM Agenda
            </Link>
          </div>
        </div>
        <div className="topbar__meta">
          <Chip label={`${employees.length} empleados`} />
          <Chip label={`${pendingTasks} tareas pendientes`} />
        <div className="card flex justify-content-center">
            <AvatarGroup>
                {employees.slice(0, 5).map((employee) => (
                    <Avatar 
                        key={employee.id}
                        image={
                            employee.image ||
                            `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(employee.name)}`
                        }
                        size="large" 
                        shape="circle" 
                    />
                ))}
                {employees.length > 5 && (
                    <Avatar label={`+${employees.length - 5}`} shape="circle" size="large"/>
                )}
            </AvatarGroup>
        </div>
          <label className="theme-switch" aria-label="Cambiar tema">
            <i className="pi pi-sun theme-switch__icon" aria-hidden="true" />
            <InputSwitch
              checked={themeMode === 'dark'}
              onChange={(event) => setThemeMode(event.value ? 'dark' : 'light')}
            />
            <i className="pi pi-moon theme-switch__icon" aria-hidden="true" />
          </label>
        </div>
      </header>

      <div className="app-shell__body">
        <aside className="sidebar">
          <p className="sidebar__title">Navegacion</p>
          <nav className="sidebar__nav">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/employees">Empleados</NavLink>
            <NavLink to="/agenda">Agenda</NavLink>
          </nav>
        </aside>
        <main className="workspace">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
