import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { employeeList } from '../../constants/mockData'

export default function EmployeesPage() {
  return (
    <DashboardLayout title="Employees">
      <PageHeader title="Employee management" subtitle="Maintain departmental members and profile records." actions={<Button>Add employee</Button>} />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Employee ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Designation</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee) => (
                <tr key={employee.employee_id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-slate-800">{employee.employee_code}</td>
                  <td className="px-4 py-3">{employee.name}</td>
                  <td className="px-4 py-3">{employee.department}</td>
                  <td className="px-4 py-3">{employee.designation}</td>
                  <td className="px-4 py-3">{employee.category}</td>
                  <td className="px-4 py-3">{employee.email}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${employee.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>{employee.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
