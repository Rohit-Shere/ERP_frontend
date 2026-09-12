import api from './axios'

export const authApi = {
  login: (payload) => api.post('/auth/login', payload),
  signup: (payload) => api.post('/auth/signup', payload),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
}
