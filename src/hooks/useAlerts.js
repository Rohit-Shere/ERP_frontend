import { useEffect, useState } from 'react'
import { alertApi } from '../api/alertApi'

export function useAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isActive = true

    const loadAlerts = async () => {
      try {
        const response = await alertApi.list()
        const data = Array.isArray(response?.data) ? response.data : []
        if (isActive) {
          setAlerts(data)
          setError(null)
        }
      } catch (err) {
        if (isActive) {
          setAlerts([])
          setError('Unable to load alerts right now.')
        }
      } finally {
        if (isActive) setLoading(false)
      }
    }

    loadAlerts()
    return () => {
      isActive = false
    }
  }, [])

  return { alerts, setAlerts, loading, error }
}
