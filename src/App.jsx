import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import EmployeeDashboardPage from './pages/employee/EmployeeDashboardPage'
import ApplyLeavePage from './pages/employee/ApplyLeavePage'
import ApplicationsPage from './pages/employee/ApplicationsPage'
import LeaveBalancePage from './pages/employee/LeaveBalancePage'
import AlertsPage from './pages/employee/AlertsPage'
import ProfilePage from './pages/employee/ProfilePage'
import HodDashboardPage from './pages/hod/HodDashboardPage'
import HodEmployeesPage from './pages/hod/EmployeesPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import EmployeesPage from './pages/admin/EmployeesPage'
import LeaveTypesPage from './pages/admin/LeaveTypesPage'
import EntitlementsPage from './pages/admin/EntitlementsPage'
import ReportsPage from './pages/admin/ReportsPage'
import CalendarPage from './pages/admin/CalendarPage'
import ProtectedRoute from './routes/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-600">Loading campus portal...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : user.role === 'DEPARTMENT_HEAD' ? '/hod/dashboard' : '/employee/dashboard'} replace /> : <LoginPage />} />

      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
        <Route path="/employee/apply-leave" element={<ApplyLeavePage />} />
        <Route path="/employee/applications" element={<ApplicationsPage />} />
        <Route path="/employee/balance" element={<LeaveBalancePage />} />
        <Route path="/employee/alerts" element={<AlertsPage />} />
        <Route path="/employee/profile" element={<ProfilePage />} />

        <Route path="/hod/dashboard" element={<HodDashboardPage />} />
        <Route path="/hod/applications" element={<ApplicationsPage />} />
        <Route path="/hod/employees" element={<HodEmployeesPage />} />
        <Route path="/hod/alerts" element={<AlertsPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/applications" element={<ApplicationsPage />} />
        <Route path="/admin/employees" element={<EmployeesPage />} />
        <Route path="/admin/departments" element={<EmployeesPage />} />
        <Route path="/admin/leave-types" element={<LeaveTypesPage />} />
        <Route path="/admin/entitlements" element={<EntitlementsPage />} />
        <Route path="/admin/alerts" element={<AlertsPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
        <Route path="/admin/calendar" element={<CalendarPage />} />
      </Route>

      <Route path="*" element={<Navigate to={user ? (user.role === 'ADMIN' ? '/admin/dashboard' : user.role === 'DEPARTMENT_HEAD' ? '/hod/dashboard' : '/employee/dashboard') : '/login'} replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
