import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import { useAlerts } from '../../hooks/useAlerts'
import { alertApi } from '../../api/alertApi'

export default function AlertsPage() {
  const { alerts, setAlerts, loading, error } = useAlerts()

  const markRead = async (alertId) => {
    try {
      await alertApi.markRead(alertId)
      setAlerts((current) => current.map((alert) => alert.id === alertId ? { ...alert, read: true } : alert))
    } catch {
      // Keep the alert unread when the server cannot persist the action.
    }
  }

  return (
    <DashboardLayout title="Alerts">
      <PageHeader title="Alerts & notifications" subtitle="Recent updates across your leave records and approvals." />

      {error && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{error}</div>}

      <div className="space-y-4">
        {loading ? (
          <div className="card p-4 text-sm text-slate-500">Loading alerts...</div>
        ) : alerts.map((alert) => (
          <div key={alert.id} className={`card p-4 ${alert.read ? 'opacity-90' : 'border-indigo-200 bg-indigo-50/30'}`}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{alert.title}</span>
                  {!alert.read && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-700">Unread</span>}
                </div>
                <p className="mt-2 text-sm text-slate-600">{alert.message}</p>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500"><span>{alert.severity}</span>{!alert.read && <button type="button" className="normal-case font-medium text-indigo-600 hover:text-indigo-500" onClick={() => markRead(alert.id)}>Mark read</button>}</div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
