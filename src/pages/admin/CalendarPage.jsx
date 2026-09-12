import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import { holidays } from '../../constants/mockData'

export default function CalendarPage() {
  return (
    <DashboardLayout title="Academic Calendar">
      <PageHeader title="Academic calendar" subtitle="Institutional working days, holidays, and special events." />

      <div className="card p-5">
        <div className="mb-5 grid gap-3 md:grid-cols-4">
          {[
            { label: 'Academic year', value: '2026-27' },
            { label: 'Holidays', value: '4' },
            { label: 'Working days', value: '224' },
            { label: 'Special working days', value: '2' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</div>
              <div className="mt-2 text-xl font-semibold text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {holidays.map((holiday) => (
            <div key={holiday.date} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500">{holiday.date}</div>
              <div className="mt-2 font-semibold text-slate-900">{holiday.title}</div>
              <div className="mt-2 text-xs uppercase tracking-wide text-indigo-600">{holiday.type}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
