import type { NextApiRequest, NextApiResponse } from 'next'
import { BURN_INFO, TOKEN_INFO } from '@/constants'
import type { TokenMetrics } from '@/constants/types'

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://soba-api-v1-127255a88636.herokuapp.com'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch token stats from backend
    const response = await fetch(`${BACKEND_API}/api/token-stats`)
    if (!response.ok) {
      throw new Error('Failed to fetch token stats from backend')
    }
    const data = await response.json()

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching token stats:', error)
    res.status(500).json({ 
      tokenMetrics: {
        totalSupply: TOKEN_INFO.TOTAL_SUPPLY,
        circulatingSupply: TOKEN_INFO.CIRCULATING_SUPPLY,
        burnedTokens: BURN_INFO.TOTAL_BURNED,
        founderHolding: 0,
        price: 0,
        holders: 0
      },
      success: false,
      error: 'Failed to fetch token stats'
    })
  }
}