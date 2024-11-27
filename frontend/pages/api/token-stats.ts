import type { NextApiRequest, NextApiResponse } from 'next'
import { BURN_INFO, TOKEN_INFO } from '@/constants'
import type { TokenMetrics } from '@/constants/types'

// Force the correct backend URL
const BACKEND_API = 'https://soba-api-v1-127255a88636.herokuapp.com'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Token stats request received')
    console.log('Backend URL:', BACKEND_API)
    console.log('Environment variables:', {
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      VERCEL_URL: process.env.VERCEL_URL
    })

    // Fetch token stats from backend
    const response = await fetch(`${BACKEND_API}/api/token-stats`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': process.env.VERCEL_URL || 'https://gyevw.vercel.app'
      }
    })
    
    console.log('Backend response status:', response.status)
    console.log('Backend response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend response error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: errorText
      })
      throw new Error(`Failed to fetch token stats: ${response.status} ${errorText}`)
    }
    
    const data = await response.json()
    console.log('Successfully fetched token stats:', data)
    
    res.status(200).json(data)
  } catch (error) {
    console.error('Error in token stats handler:', error)
    if (error instanceof Error) {
      console.error('Error stack:', error.stack)
    }
    
    // Return fallback data with error
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
      error: error instanceof Error ? error.message : 'Failed to fetch token stats',
      timestamp: new Date().toISOString()
    })
  }
}