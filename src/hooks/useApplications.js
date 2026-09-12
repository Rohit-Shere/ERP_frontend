import { useEffect, useState } from 'react'
import { leaveApi } from '../api/leaveApi'
import { applications as fallbackApplications } from '../constants/mockData'

export function useApplications(scope = 'mine') {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let isActive = true

    const loadApplications = async () => {
      try {
        const response = scope === 'hod'
          ? await leaveApi.getHodQueue()
          : scope === 'admin'
            ? await leaveApi.getAllForAdmin()
            : await leaveApi.getMyApplications()
        const data = Array.isArray(response?.data) ? response.data : scope === 'mine' ? fallbackApplications : []
        if (isActive) {
          setApplications(data)
          setError(null)
        }
      } catch (err) {
        if (isActive) {
          setApplications(scope === 'mine' ? fallbackApplications : [])
          setError(scope === 'mine' ? 'Unable to load applications. Showing the latest cached data.' : 'Unable to load the approval queue.')
        }
      } finally {
        if (isActive) setLoading(false)
      }
    }

    loadApplications()
    return () => {
      isActive = false
    }
  }, [scope, refreshKey])

  return { applications, loading, error, reload: () => setRefreshKey((value) => value + 1) }
}
