import { BarChart3, CheckCheck, Clock4, UserRoundX } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatusBadge from '../../components/common/StatusBadge'
import { applications, dashboardStats } from '../../constants/mockData'

const statItems = [
  { label: 'Pending approvals', value: dashboardStats.pendingHodApproval, icon: Clock4 },
  { label: 'Approved this month', value: 14, icon: CheckCheck },
  { label: 'Rejected this month', value: 5, icon: UserRoundX },
  { label: 'Employees on leave', value: 18, icon: BarChart3 },
]

export default function HodDashboardPage() {
  const pending = applications.filter((app) => app.status === 'PENDING_DEPARTMENT_HEAD' || app.status === 'DEPARTMENT_APPROVED')

  return (
    <DashboardLayout title="Department Head Dashboard">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {statItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-500">{label}</p>
                <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600"><Icon size={16} /></span>
              </div>
              <div className="text-3xl font-semibold text-slate-900">{value}</div>
            </div>
          ))}
        </div>

        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 p-4">
            <h3 className="text-lg font-semibold text-slate-900">Pending approval</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Employee</th>
                  <th className="px-4 py-3 font-medium">Leave Type</th>
                  <th className="px-4 py-3 font-medium">Dates</th>
                  <th className="px-4 py-3 font-medium">Days</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((app) => (
                  <tr key={app.application_id} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-800">{app.employee_name}</td>
                    <td className="px-4 py-3">{app.leave_type}</td>
                    <td className="px-4 py-3">{new Date(app.start_date).toLocaleDateString()} - {new Date(app.end_date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{app.calculated_days}</td>
                    <td className="px-4 py-3">{new Date(app.submitted_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><StatusBadge label={app.status.replace(/_/g, ' ')} status={app.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
