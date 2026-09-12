import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { leaveTypes } from '../../constants/mockData'

export default function LeaveTypesPage() {
  return (
    <DashboardLayout title="Leave Types">
      <PageHeader title="Leave type management" subtitle="Configure the categories available for leave requests." actions={<Button>Add leave type</Button>} />

      <div className="card overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Leave Code</th>
              <th className="px-4 py-3 font-medium">Leave Name</th>
              <th className="px-4 py-3 font-medium">Unit</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveTypes.map((leaveType) => (
              <tr key={leaveType.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-800">{leaveType.code}</td>
                <td className="px-4 py-3">{leaveType.name}</td>
                <td className="px-4 py-3">{leaveType.unit}</td>
                <td className="px-4 py-3 text-slate-500">Academic leave category for employee requests.</td>
                <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">{leaveType.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
