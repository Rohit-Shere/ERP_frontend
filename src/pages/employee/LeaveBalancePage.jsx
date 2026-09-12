import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import { useLeaveBalance } from '../../hooks/useLeaveBalance'

function getStatusTone(usage) {
  if (usage < 70) return { label: 'Normal', color: 'bg-emerald-100 text-emerald-700' }
  if (usage < 80) return { label: 'Approaching limit', color: 'bg-amber-100 text-amber-700' }
  if (usage < 100) return { label: 'Warning', color: 'bg-orange-100 text-orange-700' }
  if (usage === 100) return { label: 'Limit reached', color: 'bg-red-100 text-red-700' }
  return { label: 'Limit exceeded', color: 'bg-rose-100 text-rose-700' }
}

export default function LeaveBalancePage() {
  const { balances, loading, error } = useLeaveBalance()

  return (
    <DashboardLayout title="Leave Balance">
      <PageHeader title="Leave balance overview" subtitle="Current academic year usage and remaining entitlement." />

      {error && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{error}</div>}

      <div className="grid gap-5">
        {loading ? (
          <div className="card p-5 text-sm text-slate-500">Loading leave balance data...</div>
        ) : balances.map((item) => {
          const usage = Math.min(100, item.usage)
          const status = getStatusTone(item.usage)
          return (
            <div key={item.leave_type_id} className="card p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.leave_type}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
                    <span>Entitled: {item.entitled}</span>
                    <span>Carry Forward: {item.carry_forward}</span>
                    <span>Used: {item.used}</span>
                    <span>Remaining: {item.remaining}</span>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${status.color}`}>{status.label}</span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Usage</span>
                  <span>{Math.round(item.usage)}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-indigo-500" style={{ width: `${usage}%` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
