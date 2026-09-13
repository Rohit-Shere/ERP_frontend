import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <DashboardLayout title="Profile">
      <PageHeader title="Employee profile" subtitle="Official employee details visible to the department and admin." />

      <div className="card p-6">
        <div className="flex flex-col items-center gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-semibold text-indigo-700">
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.role}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div><p className="text-sm text-slate-500">Employee Code</p><p className="mt-1 font-medium text-slate-900">{user?.employee_code || 'Not-Available'}</p></div>
          <div><p className="text-sm text-slate-500">Email</p><p className="mt-1 font-medium text-slate-900">{user?.email}</p></div>
          <div><p className="text-sm text-slate-500">Department</p><p className="mt-1 font-medium text-slate-900">{user?.department || 'Not-Available'}</p></div>
          <div><p className="text-sm text-slate-500">Designation</p><p className="mt-1 font-medium text-slate-900">{user?.designation || 'Not-Available'}</p></div>
          <div><p className="text-sm text-slate-500">Employee Category</p><p className="mt-1 font-medium text-slate-900">{user?.category || 'Not-Available'}</p></div>
          <div><p className="text-sm text-slate-500">Joining Date</p><p className="mt-1 font-medium text-slate-900">{user?.joining_date || 'Not available'}</p></div>
        </div>
      </div>
    </DashboardLayout>
  )
}
