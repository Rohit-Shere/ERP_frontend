import api from '../api/axios'

const AUTH_KEY = 'erp_auth_session'

export const authService = {
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required.')
    }

    try {
      const response = await api.post('/auth/login', { email, password })
      const data = response.data || {}
      if (!data.access_token) throw new Error('Login succeeded without an access token.')
      const session = { access_token: data.access_token, refresh_token: data.refresh_token, expires_at: Date.now() + (data.expires_in || 3600) * 1000 }
      localStorage.setItem(AUTH_KEY, JSON.stringify(session))
      return session
    } catch (error) {
      const detail = error.response?.data?.detail
      throw new Error(detail || error.message || 'Unable to login. Please try again.')
    }
  },

  async logout() {
    localStorage.removeItem(AUTH_KEY)
    return { success: true }
  },

  getCurrentUser() {
    const saved = localStorage.getItem(AUTH_KEY)
    if (!saved) return null

    try {
      const parsed = JSON.parse(saved)
      return parsed?.user ?? null
    } catch {
      return null
    }
  },

  getSession() {
    const saved = localStorage.getItem(AUTH_KEY)
    if (!saved) return null

    try {
      return JSON.parse(saved)
    } catch {
      return null
    }
  },
}
