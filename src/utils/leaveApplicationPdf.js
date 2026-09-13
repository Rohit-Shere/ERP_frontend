import { jsPDF } from 'jspdf'

const formatDate = (value) => new Date(value).toLocaleDateString()

const addRow = (pdf, label, value, y) => {
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${label}:`, 24, y)
  pdf.setFont('helvetica', 'normal')
  pdf.text(String(value || 'Not provided'), 72, y)
}

export function downloadLeaveApplicationPdf(application, user, leaveType) {
  const pdf = new jsPDF()
  const employeeName = application.employee_name || user?.name || 'Employee'
  const applicationId = application.application_id || 'pending'

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(18)
  pdf.text('Leave Application', 105, 22, { align: 'center' })
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Academic ERP Leave Management System', 105, 29, { align: 'center' })

  pdf.setDrawColor(180, 180, 180)
  pdf.line(20, 36, 190, 36)

  pdf.setFontSize(11)
  addRow(pdf, 'Application ID', applicationId, 50)
//   addRow(pdf, 'Status', application.status || 'PENDING_DEPARTMENT_HEAD', 60)
  addRow(pdf, 'Submitted', application.submitted_at ? new Date(application.submitted_at).toLocaleString() : new Date().toLocaleString(), 55)

  pdf.setFont('helvetica', 'bold')
  pdf.text('Employee Details', 20, 70)
  pdf.setFont('helvetica', 'normal')
  addRow(pdf, 'Name', employeeName, 80)
  addRow(pdf, 'Employee Code', application.employee_code || user?.employee_code, 90)
  addRow(pdf, 'Email', application.employee_email || user?.email, 100)
  addRow(pdf, 'Department', application.department_name || user?.department, 110)
  addRow(pdf, 'Designation', application.designation || user?.designation, 120)

  pdf.setFont('helvetica', 'bold')
  pdf.text('Leave Details', 20, 142)
  pdf.setFont('helvetica', 'normal')
  addRow(pdf, 'Leave Type', application.leave_type || leaveType, 154)
  addRow(pdf, 'Start Date', formatDate(application.start_date), 164)
  addRow(pdf, 'End Date', formatDate(application.end_date), 174)
  addRow(pdf, 'Duration', `${application.calculated_days} day(s)`, 184)
//   addRow(pdf, 'Station Leaving', application.station_leaving ? `Yes - ${application.station_name || 'Details not provided'}` : 'No', 194)

  pdf.setFont('helvetica', 'bold')
  pdf.text('Reason', 20, 204)
  pdf.setFont('helvetica', 'normal')
  const reasonLines = pdf.splitTextToSize(application.reason || 'No reason provided', 166)
  pdf.text(reasonLines, 24, 214)

  const signatureY = Math.max(245, 250 + reasonLines.length * 6)
  pdf.line(125, signatureY, 190, signatureY)
  pdf.setFontSize(10)
  pdf.text('Employee Signature', 157.5, signatureY + 7, { align: 'center' })
  pdf.text(employeeName, 157.5, signatureY + 14, { align: 'center' })

  pdf.setFontSize(8)
  pdf.setTextColor(100, 100, 100)
  pdf.text('This document was generated automatically after backend submission.', 105, 290, { align: 'center' })
  pdf.save(`leave-application-${applicationId}.pdf`)
}
