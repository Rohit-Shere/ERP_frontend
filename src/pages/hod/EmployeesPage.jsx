import DashboardLayout from '../../components/layout/DashboardLayout'
import { employeeList } from '../../constants/mockData'

export default function HodEmployeesPage() {
  return (
    <DashboardLayout title="Department Employees">
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-900">Employees in Computer Science</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Employee ID</th>
                <th className="px-4 py-3 font-medium">Designation</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.filter((employee) => employee.department === 'Computer Science').map((employee) => (
                <tr key={employee.employee_id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-slate-800">{employee.name}</td>
                  <td className="px-4 py-3">{employee.employee_code}</td>
                  <td className="px-4 py-3">{employee.designation}</td>
                  <td className="px-4 py-3">{employee.category}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">{employee.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
