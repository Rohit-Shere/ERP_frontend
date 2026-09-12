import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const session = localStorage.getItem('erp_auth_session')
  if (session) {
    try {
      const parsed = JSON.parse(session)
      if (parsed.access_token) {
        config.headers.Authorization = `Bearer ${parsed.access_token}`
      }
    } catch {
      // ignore malformed session
    }
  }

  return config
})

export default api
