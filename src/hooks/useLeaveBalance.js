import { useEffect, useState } from 'react'
import { employeeApi } from '../api/employeeApi'
import { leaveBalances as fallbackBalances } from '../constants/mockData'

const normalizeBalance = (item) => {
  const total = Number(item.entitled ?? 0) + Number(item.carry_forward ?? 0)
  const usage = total === 0 ? 0 : ((Number(item.used ?? 0) / total) * 100)
  let status = 'normal'

  if (usage >= 70 && usage < 80) status = 'approaching'
  else if (usage >= 80 && usage < 100) status = 'warning'
  else if (usage >= 100) status = 'limit-reached'

  return {
    ...item,
    entitled: Number(item.entitled ?? 0),
    carry_forward: Number(item.carry_forward ?? 0),
    used: Number(item.used ?? 0),
    remaining: Number(item.remaining ?? 0),
    usage,
    status,
  }
}

export function useLeaveBalance() {
  const [balances, setBalances] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isActive = true

    const loadBalance = async () => {
      try {
        const response = await employeeApi.getBalance()
        const data = Array.isArray(response?.data) ? response.data : fallbackBalances
        if (isActive) {
          setBalances(data.map(normalizeBalance))
          setError(null)
        }
      } catch (err) {
        if (isActive) {
          setBalances(fallbackBalances.map(normalizeBalance))
          setError('Unable to load leave balance. Showing locally cached values.')
        }
      } finally {
        if (isActive) setLoading(false)
      }
    }

    loadBalance()
    return () => {
      isActive = false
    }
  }, [])

  return { balances, loading, error }
}
