import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

export default function EntitlementsPage() {
  return (
    <DashboardLayout title="Entitlements">
      <PageHeader title="Entitlement management" subtitle="Configure academic-year leave allocation rules for categories and types." actions={<Button>Add entitlement</Button>} />

      <div className="card overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Employee Category</th>
              <th className="px-4 py-3 font-medium">Leave Type</th>
              <th className="px-4 py-3 font-medium">Academic Year</th>
              <th className="px-4 py-3 font-medium">Entitled Days</th>
              <th className="px-4 py-3 font-medium">Max Days</th>
              <th className="px-4 py-3 font-medium">Warning Threshold</th>
              <th className="px-4 py-3 font-medium">Carry Forward</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Teaching - Non-Vacational', 'Casual Leave', '2026-27', 12, 12, 80, 2],
              ['Teaching - Non-Vacational', 'Medical Leave', '2026-27', 15, 15, 85, 0],
              ['Teaching - Vacational', 'Earned Leave', '2026-27', 20, 20, 80, 3],
              ['Non-Teaching / Administrative', 'Casual Leave', '2026-27', 10, 10, 75, 1],
            ].map(([category, type, year, entitled, max, warning, carry]) => (
              <tr key={`${category}-${type}`} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-800">{category}</td>
                <td className="px-4 py-3">{type}</td>
                <td className="px-4 py-3">{year}</td>
                <td className="px-4 py-3">{entitled}</td>
                <td className="px-4 py-3">{max}</td>
                <td className="px-4 py-3">{warning}%</td>
                <td className="px-4 py-3">{carry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
