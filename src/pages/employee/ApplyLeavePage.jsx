import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { leaveApi } from '../../api/leaveApi'
import { leaveTypes } from '../../constants/mockData'
import { useAuth } from '../../context/AuthContext'
import { downloadLeaveApplicationPdf } from '../../utils/leaveApplicationPdf'

export default function ApplyLeavePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      leaveTypeId: String(leaveTypes[0]?.id || 1),
      startDate: '2026-09-15',
      endDate: '2026-09-17',
      reason: '',
      stationLeaving: 'no',
    },
  })

  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const preliminaryDays = startDate && endDate ? Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1) : 0

  const onSubmit = async (values) => {
    setSubmitting(true)
    setSubmitError(null)

    try {
      const response = await leaveApi.createApplication({
        leave_type_id: Number(values.leaveTypeId),
        start_date: values.startDate,
        end_date: values.endDate,
        reason: values.reason,
        station_leaving: values.stationLeaving === 'yes',
      })
      const selectedLeaveType = leaveTypes.find((leaveType) => leaveType.id === Number(values.leaveTypeId))
      downloadLeaveApplicationPdf(response.data, user, selectedLeaveType?.name)
      navigate('/employee/applications', { replace: true })
    } catch (error) {
      setSubmitError(error.response?.data?.detail || 'Unable to submit the leave application.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <DashboardLayout title="Apply Leave">
      <PageHeader title="Apply for leave" subtitle="Submit a request for approval through the department and admin workflow." />

      <form onSubmit={handleSubmit(onSubmit)} className="card p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="label">Leave Type</label>
            <select className="input" {...register('leaveTypeId', { required: 'Leave type is required' })}>
              {leaveTypes.map((leaveType) => (
                <option key={leaveType.id} value={leaveType.id}>{leaveType.name}</option>
              ))}
            </select>
            {errors.leaveType && <p className="mt-2 text-sm text-red-600">{errors.leaveType.message}</p>}
          </div>

          <div>
            <label className="label">Estimated Days</label>
            <input className="input bg-slate-50" value={`${preliminaryDays} day${preliminaryDays === 1 ? '' : 's'}`} readOnly />
          </div>

          <div>
            <label className="label">Start Date</label>
            <input type="date" className="input" {...register('startDate', { required: 'Select a start date' })} />
            {errors.startDate && <p className="mt-2 text-sm text-red-600">{errors.startDate.message}</p>}
          </div>

          <div>
            <label className="label">End Date</label>
            <input type="date" className="input" {...register('endDate', {
              required: 'Select an end date',
              validate: (value) => !startDate || value >= startDate || 'End date must be on or after the start date',
            })} />
            {errors.endDate && <p className="mt-2 text-sm text-red-600">{errors.endDate.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="label">Reason</label>
            <textarea rows="4" className="input resize-none" placeholder="Briefly explain the reason for leave" {...register('reason', { required: 'Reason is required', minLength: { value: 10, message: 'Reason must be at least 10 characters' } })} />
            {errors.reason && <p className="mt-2 text-sm text-red-600">{errors.reason.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="label">Station Leaving</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" value="yes" {...register('stationLeaving')} /> Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" value="no" {...register('stationLeaving')} /> No
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="label">Supporting Documents</label>
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              Drag &amp; drop files here or browse to upload
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {submitError && <p className="mr-auto self-center text-sm text-red-600">{submitError}</p>}
          <Button variant="secondary" type="button" onClick={() => navigate('/employee/applications')}>Cancel</Button>
          <Button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Application'}</Button>
        </div>
      </form>
    </DashboardLayout>
  )
}
