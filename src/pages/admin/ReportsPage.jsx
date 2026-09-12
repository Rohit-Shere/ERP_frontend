import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reports">
      <PageHeader title="Administrative reports" subtitle="Leave usage and entitlement analytics across the institution." />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[
          'Total leave usage',
          'Department-wise leave usage',
          'Employee-category-wise leave usage',
          'Leave-type-wise usage',
          'Monthly trends',
          'Employees approaching entitlement',
        ].map((title) => (
          <div key={title} className="card p-5">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <div className="mt-4 h-32 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200" />
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
