import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../api/authApi'
import { employeeApi } from '../api/employeeApi'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bootstrap = async () => {
      const session = authService.getSession()
      if (!session?.access_token) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const [meResponse, profileResponse] = await Promise.all([
          authApi.me().catch(() => null),
          employeeApi.getProfile().catch(() => null),
        ])

        const me = meResponse?.data || {}
        const profile = profileResponse?.data || {}
        const firstName = profile.first_name || ''
        const lastName = profile.last_name || ''

        const mappedUser = {
          employee_id: profile.employee_id || me.employee_id,
          employee_code: profile.employee_code,
          user_id: me.user_id,
          role: me.roles?.[0] || 'EMPLOYEE',
          name: [firstName, lastName].filter(Boolean).join(' ') || 'Authenticated User',
          email: profile.email || 'user@college.edu',
          department: profile.department_name || 'Computer Science',
          designation: profile.designation || 'Assistant Professor',
          category: profile.employee_category || 'Teaching - Non-Vacational',
          joining_date: profile.joining_date || null,
        }

        setUser(mappedUser)
      } catch {
        setUser(authService.getCurrentUser())
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  const login = async (credentials) => {
    const session = await authService.login(credentials)
    const [meResponse, profileResponse] = await Promise.all([
      authApi.me(),
      employeeApi.getProfile(),
    ])
    const me = meResponse.data || {}
    const profile = profileResponse.data || {}
    const firstName = profile.first_name || ''
    const lastName = profile.last_name || ''
    const mappedUser = {
      employee_id: profile.employee_id || me.employee_id,
      employee_code: profile.employee_code,
      user_id: me.user_id,
      role: me.roles?.[0] || 'EMPLOYEE',
      name: [firstName, lastName].filter(Boolean).join(' ') || 'Authenticated User',
      email: profile.email,
      department: profile.department_name,
      designation: profile.designation,
      category: profile.employee_category,
      joining_date: profile.joining_date || null,
    }
    setUser(mappedUser)
    return { ...session, user: mappedUser }
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, login, logout, isAuthenticated: Boolean(user) }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
