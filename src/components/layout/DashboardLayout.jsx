import { Bell, ChevronDown, Menu, Search, UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'

export default function DashboardLayout({ children, title }) {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        {mobileOpen && (
          <div className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        <div className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 lg:relative lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <Sidebar />
        </div>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <button className="rounded-lg border border-slate-200 p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
                  <Menu size={18} />
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{title || 'Academic ERP'}</h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
                  <Search size={16} className="text-slate-400" />
                  <input className="w-44 bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Search" />
                </div>
                <button className="relative rounded-lg border border-slate-200 p-2 text-slate-600" aria-label="Notifications">
                  <Bell size={18} />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </button>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5">
                  <UserCircle2 size={28} className="text-slate-500" />
                  <div className="hidden text-left md:block">
                    <div className="text-sm font-medium text-slate-800">{user?.name || 'User'}</div>
                    <div className="text-[11px] uppercase tracking-wide text-slate-500">{user?.role}</div>
                  </div>
                  <ChevronDown size={16} className="text-slate-500" />
                </div>
                <button onClick={logout} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
