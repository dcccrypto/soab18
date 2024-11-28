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
      burnedTokens: 0,
      burnRate: 0,
      burnedValue: 0,
      nextBurnDate: new Date()
    }
  }

  return {
    burnedTokens: tokenStats.toBeBurnedTokens,
    burnRate: tokenStats.burnRate || 0,
    burnedValue: tokenStats.toBeBurnedValue,
    nextBurnDate: new Date(tokenStats.lastUpdated)
  }
}