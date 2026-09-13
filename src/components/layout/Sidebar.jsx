import { Bell, BriefcaseBusiness, CalendarDays, FileText, LayoutGrid, ShieldCheck, UserCog, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navConfig = {
  EMPLOYEE: [
    { to: '/employee/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/employee/apply-leave', label: 'Apply Leave', icon: FileText },
    { to: '/employee/applications', label: 'Applications', icon: BriefcaseBusiness },
    { to: '/employee/balance', label: 'Leave Balance', icon: ShieldCheck },
    { to: '/employee/alerts', label: 'Alerts', icon: Bell },
    { to: '/employee/profile', label: 'Profile', icon: UserCog },
  ],
  DEPARTMENT_HEAD: [
    { to: '/hod/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/hod/applications', label: 'Applications', icon: BriefcaseBusiness },
    { to: '/hod/employees', label: 'Employees', icon: Users },
    { to: '/hod/alerts', label: 'Alerts', icon: Bell },
  ],
  ADMIN: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/admin/applications', label: 'Applications', icon: BriefcaseBusiness },
    { to: '/admin/employees', label: 'Employees', icon: Users },
    { to: '/admin/departments', label: 'Departments', icon: FileText },
    { to: '/admin/leave-types', label: 'Leave Types', icon: CalendarDays },
    { to: '/admin/entitlements', label: 'Entitlements', icon: ShieldCheck },
    { to: '/admin/alerts', label: 'Alerts', icon: Bell },
    { to: '/admin/reports', label: 'Reports', icon: LayoutGrid },
    { to: '/admin/calendar', label: 'Academic Calendar', icon: CalendarDays },
  ],
}

export default function Sidebar() {
  const { user } = useAuth()
  const items = navConfig[user?.role] || navConfig.EMPLOYEE

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-slate-900 text-slate-100">
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 font-semibold text-white">ERP</div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Academic</div>
          <div className="text-lg font-bold text-white">Leave Portal</div>
        </div>
      </div>

      <nav className="mt-6 space-y-1 px-3">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
