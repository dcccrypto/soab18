import { useState, useEffect } from 'react'
import { BURN_INFO, TOKEN_INFO } from '@/constants'
import { useTokenStats } from './useTokenStats'

interface BurnStats {
  burnedTokens: number
  burnedValue: number
  burnRate: number
  nextBurnDate: Date
}

export const useBurnStats = (): BurnStats => {
  const { data: tokenStats } = useTokenStats()

  if (!tokenStats) {
    return {
      burnedTokens: BURN_INFO.TOTAL_BURNED,
      burnRate: BURN_INFO.BURN_RATE,
      burnedValue: 0,
      nextBurnDate: new Date(BURN_INFO.NEXT_BURN.TARGET_DATE)
    }
  }

  return {
    burnedTokens: BURN_INFO.TOTAL_BURNED,
    burnRate: BURN_INFO.BURN_RATE,
    burnedValue: BURN_INFO.TOTAL_BURNED * tokenStats.price,
    nextBurnDate: new Date(BURN_INFO.NEXT_BURN.TARGET_DATE)
  }
}