const colorMap = {
  PENDING_DEPARTMENT_HEAD: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  DEPARTMENT_APPROVED: 'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
  PENDING_ADMIN: 'bg-violet-100 text-violet-700 ring-1 ring-violet-200',
  ADMIN_APPROVED: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  DEPARTMENT_REJECTED: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
  ADMIN_REJECTED: 'bg-red-100 text-red-700 ring-1 ring-red-200',
  ACTIVE: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  INACTIVE: 'bg-slate-200 text-slate-700 ring-1 ring-slate-300',
}

export default function StatusBadge({ label, status, className = '' }) {
  const value = status || label
  return (
    <span className={`status-chip ${colorMap[value] || 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'} ${className}`}>
      {label || value}
    </span>
  )
}
