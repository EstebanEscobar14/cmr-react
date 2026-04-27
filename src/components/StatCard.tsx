import { Tag } from 'primereact/tag'
import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string
  helper: string
  icon: ReactNode
  severity?: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast'
}

function StatCard({ label, value, helper, icon, severity = 'info' }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__icon">{icon}</span>
        <Tag value={label} severity={severity} rounded />
      </div>
      <strong>{value}</strong>
      <span>{helper}</span>
    </article>
  )
}

export default StatCard
