import { Card } from 'primereact/card'
import type { PropsWithChildren, ReactNode } from 'react'

interface SectionCardProps extends PropsWithChildren {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

function SectionCard({
  title,
  subtitle,
  action,
  className,
  children,
}: SectionCardProps) {
  return (
    <Card className={className}>
      <div className="section-card__header">
        <div>
          <p className="section-card__eyebrow">{title}</p>
          {subtitle ? <h2>{subtitle}</h2> : null}
        </div>
        {action}
      </div>
      {children}
    </Card>
  )
}

export default SectionCard
