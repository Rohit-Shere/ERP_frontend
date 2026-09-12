import api from './axios'

export const adminApi = {
  getEmployees: () => api.get('/admin/employees'),
  getLeaveTypes: () => api.get('/admin/leave-types'),
  getEntitlements: () => api.get('/admin/entitlements'),
  getReports: () => api.get('/admin/reports'),
}
