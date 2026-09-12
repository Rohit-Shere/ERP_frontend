import { Activity, CalendarCheck2, Clock3, FileText } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { useAlerts } from '../../hooks/useAlerts'
import { useApplications } from '../../hooks/useApplications'
import { useLeaveBalance } from '../../hooks/useLeaveBalance'
import StatusBadge from '../../components/common/StatusBadge'

export default function EmployeeDashboardPage() {
  const { user } = useAuth()
  const { balances, loading: balanceLoading, error: balanceError } = useLeaveBalance()
  const { applications, loading: appLoading, error: appError } = useApplications()
  const { alerts, loading: alertLoading } = useAlerts()

  const recent = applications.slice(0, 4)
  const pending = applications.filter((app) => ['PENDING_DEPARTMENT_HEAD', 'PENDING_ADMIN', 'DEPARTMENT_APPROVED'].includes(app.status)).length
  const approved = applications.filter((app) => app.status === 'ADMIN_APPROVED').length
  const rejected = applications.filter((app) => ['DEPARTMENT_REJECTED', 'ADMIN_REJECTED'].includes(app.status)).length

  const statItems = [
    { label: 'Total applications', value: applications.length, icon: FileText },
    { label: 'Pending', value: pending, icon: Clock3 },
    { label: 'Approved', value: approved, icon: CalendarCheck2 },
    { label: 'Rejected', value: rejected, icon: Activity },
  ]

  return (
    <DashboardLayout title="Employee Dashboard">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Good morning</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">{user?.name || 'Employee'}</h1>
            </div>
            <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <div><span className="font-medium text-slate-500">Employee ID:</span> {user?.employee_id || 'EMP-101'}</div>
              <div><span className="font-medium text-slate-500">Department:</span> {user?.department || 'Computer Science'}</div>
              <div><span className="font-medium text-slate-500">Designation:</span> {user?.designation || 'Assistant Professor'}</div>
              <div><span className="font-medium text-slate-500">Category:</span> {user?.category || 'Teaching - Non-Vacational'}</div>
            </div>
          </div>
        </div>

        {(balanceError || appError) && <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{balanceError || appError}</div>}

        <div className="grid gap-4 md:grid-cols-3">
          {balanceLoading ? (
            <div className="col-span-full rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500">Loading leave balances...</div>
          ) : balances.slice(0, 3).map((item) => {
            const percent = Math.min(100, Number(item.usage || 0))
            const statusText = item.status === 'approaching' ? 'Approaching limit' : item.status === 'warning' ? 'Warning' : item.status === 'limit-reached' ? 'Limit reached' : 'Healthy'
            return (
              <div key={item.leave_type_id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">{item.leave_type}</h3>
                  <span className="text-xs font-medium text-slate-500">{statusText}</span>
                </div>
                <div className="mb-2 flex items-end justify-between text-sm text-slate-600">
                  <span>{item.used} used</span>
                  <span className="font-semibold text-slate-900">{item.remaining} left</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className={`h-2.5 rounded-full ${item.status === 'warning' || item.status === 'limit-reached' ? 'bg-amber-500' : 'bg-indigo-500'}`} style={{ width: `${percent}%` }} />
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-500">
                  <span>{item.entitled + item.carry_forward} entitled</span>
                  <span>{Math.round(percent)}%</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {statItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-500">{label}</p>
                <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600"><Icon size={16} /></span>
              </div>
              <div className="text-3xl font-semibold text-slate-900">{value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Recent applications</h3>
              <button className="text-sm font-medium text-indigo-600">View all</button>
            </div>

            {appLoading ? (
              <div className="text-sm text-slate-500">Loading applications...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="py-3 pr-4 font-medium">Application ID</th>
                      <th className="py-3 pr-4 font-medium">Leave Type</th>
                      <th className="py-3 pr-4 font-medium">From</th>
                      <th className="py-3 pr-4 font-medium">To</th>
                      <th className="py-3 pr-4 font-medium">Days</th>
                      <th className="py-3 pr-4 font-medium">Status</th>
                      <th className="py-3 font-medium">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((app) => (
                      <tr key={app.application_id} className="border-b border-slate-100 last:border-b-0">
                        <td className="py-3 pr-4 font-medium text-slate-800">#{app.application_id}</td>
                        <td className="py-3 pr-4">{app.leave_type}</td>
                        <td className="py-3 pr-4">{new Date(app.start_date).toLocaleDateString()}</td>
                        <td className="py-3 pr-4">{new Date(app.end_date).toLocaleDateString()}</td>
                        <td className="py-3 pr-4">{app.calculated_days}</td>
                        <td className="py-3 pr-4"><StatusBadge label={app.status.replace(/_/g, ' ')} status={app.status} /></td>
                        <td className="py-3">{new Date(app.submitted_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Recent alerts</h3>
              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">{alertLoading ? 'Syncing' : `${alerts.filter((item) => !item.read).length} new`}</span>
            </div>
            {alertLoading ? (
              <div className="text-sm text-slate-500">Loading alerts...</div>
            ) : (
              <div className="space-y-3">
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-800">{alert.title}</span>
                      <span className="text-[10px] uppercase tracking-wide text-slate-500">{alert.severity}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{alert.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
