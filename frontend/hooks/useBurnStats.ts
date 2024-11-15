import { useState, useEffect } from 'react'
import { BURN_INFO } from '@/constants'

interface BurnStats {
  burnedTokens: number
  burnedValue: number
  burnRate: number
  nextBurnDate: Date
}

export const useBurnStats = (): BurnStats => {
  const [stats, setStats] = useState<BurnStats>({
    burnedTokens: 0,
    burnedValue: 0,
    burnRate: 0,
    nextBurnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default to 7 days from now
  })

  useEffect(() => {
    // Calculate total burned from burn history
    const totalBurned = BURN_INFO.BURN_HISTORY.reduce((acc, burn) => acc + burn.amount, 0)
    
    // Calculate burn rate (example: 2.5% of total supply)
    const burnRate = (totalBurned / BURN_INFO.TOTAL_SUPPLY) * 100
    
    // Calculate burned value (example: $0.1 per token)
    const burnedValue = totalBurned * 0.1
    
    // Get next burn date from the most recent burn + 30 days
    const mostRecentBurn = new Date(BURN_INFO.BURN_HISTORY[0].date)
    const nextBurnDate = new Date(mostRecentBurn.getTime() + 30 * 24 * 60 * 60 * 1000)

    setStats({
      burnedTokens: totalBurned,
      burnedValue,
      burnRate,
      nextBurnDate
    })
  }, [])

  return stats
} 