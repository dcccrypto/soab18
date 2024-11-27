import type { NextApiRequest, NextApiResponse } from 'next'
import { BURN_INFO, TOKEN_INFO } from '@/constants'
import type { TokenMetrics } from '@/constants/types'

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://soba-api-v1-127255a88636.herokuapp.com'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Attempting to fetch token stats from:', `${BACKEND_API}/api/token-stats`)
    // Fetch token stats from backend
    const response = await fetch(`${BACKEND_API}/api/token-stats`, {
      headers: {
        'Accept': 'application/json',
        'Origin': process.env.VERCEL_URL || 'https://gyevw.vercel.app'
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend response not OK:', response.status, errorText)
      throw new Error(`Failed to fetch token stats from backend: ${response.status} ${errorText}`)
    }
    
    const data = await response.json()
    console.log('Successfully fetched token stats')
    
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
      error: error instanceof Error ? error.message : 'Failed to fetch token stats'
    })
  }
}