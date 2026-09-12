import api from './axios'

export const approvalApi = {
  hodApprove: (id, comments = 'Approved') => api.post(`/hod/leave-applications/${id}/approve`, { comments }),
  hodReject: (id, comments = 'Rejected') => api.post(`/hod/leave-applications/${id}/reject`, { comments }),
  adminApprove: (id, comments = 'Approved') => api.post(`/admin/leave-applications/${id}/approve`, { comments }),
  adminReject: (id, comments = 'Rejected') => api.post(`/admin/leave-applications/${id}/reject`, { comments }),
}
