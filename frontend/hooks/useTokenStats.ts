import { useState, useEffect } from 'react'
import { formatNumber } from '@/lib/utils'

export const useTokenStats = () => {
  const [stats, setStats] = useState({
    totalSupply: 0,
    circulatingSupply: 0,
    burnedTokens: 0,
    price: 0,
    holders: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/token-stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch token stats:', error)
      }
    }

    // Initial fetch
    fetchStats()

    // Set up polling every 30 seconds
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [])

  return stats
} 