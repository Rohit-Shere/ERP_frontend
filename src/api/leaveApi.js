import api from './axios'

export const leaveApi = {
  getMyApplications: (params = {}) => api.get('/leave-applications/my', { params }),
  createApplication: (payload) => api.post('/leave-applications/', payload),
  getAllForAdmin: () => api.get('/admin/leave-applications'),
  getHodQueue: () => api.get('/hod/leave-applications'),
}
