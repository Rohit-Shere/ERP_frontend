import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import { useApplications } from '../../hooks/useApplications'
import { useAuth } from '../../context/AuthContext'
import { approvalApi } from '../../api/approvalApi'

export default function ApplicationsPage() {
  const { user } = useAuth()
  const approvalRole = user?.role === 'ADMIN' ? 'admin' : user?.role === 'DEPARTMENT_HEAD' ? 'hod' : null
  const { applications, loading, error, reload } = useApplications(approvalRole || 'mine')
  const [comments, setComments] = useState({})
  const [processingId, setProcessingId] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)

  const takeAction = async (applicationId, decision) => {
    const comment = comments[applicationId]?.trim()
    if (!comment) {
      setActionError('Add a comment before approving or rejecting an application.')
      return
    }

    setProcessingId(applicationId)
    setActionError(null)
    try {
      const apiMethod = approvalRole === 'admin'
        ? decision === 'approve' ? approvalApi.adminApprove : approvalApi.adminReject
        : decision === 'approve' ? approvalApi.hodApprove : approvalApi.hodReject
      await apiMethod(applicationId, comment)
      setComments((current) => ({ ...current, [applicationId]: '' }))
      setSelectedApplication(null)
      reload()
    } catch (actionRequestError) {
      setActionError(actionRequestError.response?.data?.detail || 'Unable to record this decision.')
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <DashboardLayout title="Leave Applications">
      <PageHeader
        title={approvalRole ? `${approvalRole === 'admin' ? 'Admin' : 'HOD'} approval queue` : 'My Applications'}
        subtitle={approvalRole ? 'Review leave requests and record an approval decision with comments.' : 'Track leave requests and review approval status.'}
        actions={!approvalRole && <Button>New application</Button>}
      />

      {error && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{error}</div>}

      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <select className="input max-w-[180px]">
                <option>All statuses</option>
                <option>PENDING_DEPARTMENT_HEAD</option>
                <option>PENDING_ADMIN</option>
                <option>ADMIN_APPROVED</option>
                <option>ADMIN_REJECTED</option>
              </select>
              <input className="input max-w-[220px]" placeholder="Search by leave type" />
            </div>
            <div className="text-sm text-slate-500">{applications.length} records</div>
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading applications...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Application ID</th>
                  <th className="px-4 py-3 font-medium">Employee Code</th>
                  <th className="px-4 py-3 font-medium">Leave Type</th>
                  <th className="px-4 py-3 font-medium">Start Date</th>
                  <th className="px-4 py-3 font-medium">End Date</th>
                  <th className="px-4 py-3 font-medium">Days</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.application_id} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-800">#{app.application_id}</td>
                    <td className="px-4 py-3">{app.employee_code || user?.employee_code || 'Not-Available'}</td>
                    <td className="px-4 py-3">{app.leave_type || `Leave type #${app.leave_type_id}`}</td>
                    <td className="px-4 py-3">{new Date(app.start_date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{new Date(app.end_date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{app.calculated_days}</td>
                    <td className="px-4 py-3"><StatusBadge label={app.status.replace(/_/g, ' ')} status={app.status} /></td>
                    <td className="px-4 py-3">{new Date(app.submitted_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" className="px-3 py-2" onClick={() => setSelectedApplication(app)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {actionError && <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{actionError}</div>}

      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-sm text-slate-500">Leave application #{selectedApplication.application_id}</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">{selectedApplication.employee_name || `Employee #${selectedApplication.employee_id}`}</h2>
                <div className="mt-2"><StatusBadge label={selectedApplication.status.replace(/_/g, ' ')} status={selectedApplication.status} /></div>
              </div>
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50" onClick={() => setSelectedApplication(null)}>Close</button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Applicant details</h3>
                <dl className="space-y-3 text-sm">
                  <div><dt className="text-slate-500">Employee Code</dt><dd className="font-medium text-slate-900">{selectedApplication.employee_code || 'Not-Available'}</dd></div>
                  <div><dt className="text-slate-500">Email</dt><dd className="font-medium text-slate-900">{selectedApplication.employee_email || 'Not provided'}</dd></div>
                  <div><dt className="text-slate-500">Phone</dt><dd className="font-medium text-slate-900">{selectedApplication.employee_phone || 'Not provided'}</dd></div>
                  <div><dt className="text-slate-500">Designation</dt><dd className="font-medium text-slate-900">{selectedApplication.designation || 'Not provided'}</dd></div>
                  <div><dt className="text-slate-500">Department</dt><dd className="font-medium text-slate-900">{selectedApplication.department_name || 'Not provided'}</dd></div>
                  <div><dt className="text-slate-500">Category</dt><dd className="font-medium text-slate-900">{selectedApplication.category_name || 'Not provided'}</dd></div>
                </dl>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Leave details</h3>
                <dl className="space-y-3 text-sm">
                  <div><dt className="text-slate-500">Leave type</dt><dd className="font-medium text-slate-900">{selectedApplication.leave_type || `Leave type #${selectedApplication.leave_type_id}`}</dd></div>
                  <div><dt className="text-slate-500">Dates</dt><dd className="font-medium text-slate-900">{new Date(selectedApplication.start_date).toLocaleDateString()} to {new Date(selectedApplication.end_date).toLocaleDateString()}</dd></div>
                  <div><dt className="text-slate-500">Duration</dt><dd className="font-medium text-slate-900">{selectedApplication.calculated_days} days</dd></div>
                  <div><dt className="text-slate-500">Submitted</dt><dd className="font-medium text-slate-900">{new Date(selectedApplication.submitted_at).toLocaleString()}</dd></div>
                  <div><dt className="text-slate-500">Reason</dt><dd className="whitespace-pre-wrap font-medium text-slate-900">{selectedApplication.reason || 'No reason provided'}</dd></div>
                  <div><dt className="text-slate-500">Leaving station</dt><dd className="font-medium text-slate-900">{selectedApplication.station_leaving ? `Yes${selectedApplication.station_name ? ` - ${selectedApplication.station_name}` : ''}${selectedApplication.station_contact_number ? ` (${selectedApplication.station_contact_number})` : ''}` : 'No'}</dd></div>
                </dl>
              </section>
            </div>

            {approvalRole && (
              <div className="border-t border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Decision</h3>
                <textarea
                  className="input min-h-24 w-full resize-y"
                  placeholder="Add a comment before approving or rejecting"
                  value={comments[selectedApplication.application_id] || ''}
                  onChange={(event) => setComments((current) => ({ ...current, [selectedApplication.application_id]: event.target.value }))}
                  maxLength={2000}
                  disabled={processingId === selectedApplication.application_id}
                />
                <div className="mt-3 flex justify-end gap-3">
                  <Button onClick={() => takeAction(selectedApplication.application_id, 'approve')} disabled={processingId === selectedApplication.application_id}>Approve application</Button>
                  <Button variant="danger" onClick={() => takeAction(selectedApplication.application_id, 'reject')} disabled={processingId === selectedApplication.application_id}>Reject application</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
