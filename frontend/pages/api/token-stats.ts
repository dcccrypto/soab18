import type { NextApiRequest, NextApiResponse } from 'next'
import { BURN_INFO, TOKEN_INFO } from '@/constants'
import type { TokenMetrics } from '@/constants/types'

const FOUNDER_WALLET = 'D2y4sbmBuSjLU1hfrZbBCaveCHjk952c9VsGwfxnNNNH'

interface ApiResponse {
  tokenMetrics: TokenMetrics
  success: boolean
  error?: string
}

async function getTokenBalance(walletAddress: string, mintAddress: string): Promise<number> {
  try {
    const response = await fetch(`https://api.solscan.io/account/tokens?address=${walletAddress}`)
    if (!response.ok) {
      throw new Error('Failed to fetch wallet tokens')
    }
    const data = await response.json()
    
    // Find the SOBA token balance
    const sobaToken = data.data.find((token: any) => token.tokenAddress === mintAddress)
    if (!sobaToken) return 0

    // Convert balance using decimals
    const balance = parseFloat(sobaToken.tokenAmount.amount) / Math.pow(10, TOKEN_INFO.DECIMALS)
    return balance
  } catch (error) {
    console.error('Error fetching token balance:', error)
    return 0
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    // Fetch founder wallet balance
    const founderHolding = await getTokenBalance(FOUNDER_WALLET, TOKEN_INFO.MINT_ADDRESS)

    const stats: TokenMetrics = {
      totalSupply: TOKEN_INFO.TOTAL_SUPPLY,
      circulatingSupply: TOKEN_INFO.CIRCULATING_SUPPLY,
      burnedTokens: BURN_INFO.TOTAL_BURNED,
      founderHolding,
      price: 0.00554598,
      holders: 1234
    }

    res.status(200).json({
      tokenMetrics: stats,
      success: true
    })
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