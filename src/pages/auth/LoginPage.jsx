import { useState } from 'react'
import { Eye, EyeOff, GraduationCap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'rahul.sharma@college.edu', password: 'password123', role: 'employee' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const session = await login(form)
      const role = session.user.role
      const route = role === 'ADMIN' ? '/admin/dashboard' : role === 'DEPARTMENT_HEAD' ? '/hod/dashboard' : '/employee/dashboard'
      navigate(route)
    } catch (err) {
      setError(err.message || 'Unable to login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden w-1/2 items-center justify-center bg-slate-900 p-10 lg:flex">
        <div className="max-w-md text-white">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500">
            <GraduationCap size={32} />
          </div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-indigo-200">Academic ERP</p>
          <h1 className="text-4xl font-semibold leading-tight">Leave Management System</h1>
          <p className="mt-5 text-lg text-slate-300">
            Manage employee leave, approvals, balances, and institutional records with clarity and control.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input">
                <option value="employee">Employee</option>
                <option value="hod">Department Head</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="label">Email</label>
              <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="input pr-10" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Remember me
              </label>
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</button>
            </div>

            {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:bg-indigo-400">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
