import api from './axios'

export const employeeApi = {
  getProfile: () => api.get('/me/profile'),
  getBalance: () => api.get('/me/leave-balance'),
}
