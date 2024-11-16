import { useState, useEffect } from 'react'
import { BURN_INFO, TOKEN_INFO } from '@/constants'

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
    
    // Calculate burn rate as percentage of total supply
    const burnRate = (totalBurned / TOKEN_INFO.TOTAL_SUPPLY) * 100
    
    // Calculate burned value using current USD value from BURN_INFO
    const burnedValue = (totalBurned * BURN_INFO.NEXT_BURN.CURRENT_USD_VALUE) / BURN_INFO.NEXT_BURN.ESTIMATED_AMOUNT
    
    // Get next burn date from BURN_INFO
    const nextBurnDate = new Date(BURN_INFO.NEXT_BURN.TARGET_DATE)

    setStats({
      burnedTokens: totalBurned,
      burnedValue,
      burnRate,
      nextBurnDate
    })
  }, [])

  return stats
} 