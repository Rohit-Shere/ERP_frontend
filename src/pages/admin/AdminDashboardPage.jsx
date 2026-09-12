import { AlertTriangle, BarChart3, BriefcaseBusiness, CheckCheck, Users } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { dashboardStats } from '../../constants/mockData'

const statItems = [
  { label: 'Total Employees', value: dashboardStats.totalEmployees, icon: Users },
  { label: 'Applications This Month', value: dashboardStats.applicationsThisMonth, icon: BriefcaseBusiness },
  { label: 'Pending HOD Approval', value: dashboardStats.pendingHodApproval, icon: BarChart3 },
  { label: 'Pending Admin Approval', value: dashboardStats.pendingAdminApproval, icon: AlertTriangle },
  { label: 'Approved Leaves', value: dashboardStats.approvedLeaves, icon: CheckCheck },
  { label: 'Rejected Leaves', value: dashboardStats.rejectedApplications, icon: AlertTriangle },
]

export default function AdminDashboardPage() {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {statItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{label}</p>
                <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600"><Icon size={16} /></span>
              </div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Requires attention</h3>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {['Applications pending for long time', 'Employees approaching leave limit', 'Employees exceeding entitlement', 'Missing supporting documents'].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
