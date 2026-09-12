import api from './axios'

export const alertApi = {
  list: () => api.get('/alerts'),
  markRead: (alertId) => api.patch(`/alerts/${alertId}/read`),
}
