import { useState, useEffect } from 'react'
import { BURN_HISTORY } from '@/constants/static'
import axios from 'axios'

interface BurnWalletStats {
  balance: number
  usdValue: number
  isLoading: boolean
  error: Error | null
}

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || 'e568033d-06d6-49d1-ba90-b3564c91851b'
const HELIUS_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
const SOBA_MINT = '25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH'

export const useBurnWallet = (): BurnWalletStats => {
  const [stats, setStats] = useState<BurnWalletStats>({
    balance: 0,
    usdValue: 0,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchBurnWalletBalance = async () => {
      try {
        // Fetch token accounts for burn wallet using Helius
        const response = await axios.post(HELIUS_URL, {
          jsonrpc: '2.0',
          method: 'getTokenAccounts',
          id: 'burn-wallet-query',
          params: {
            owner: BURN_HISTORY.WALLET_ADDRESS,
            mint: SOBA_MINT
          }
        })

        if (!response.data.result?.token_accounts?.[0]) {
          throw new Error('No token account found for burn wallet')
        }

        const balance = Number(response.data.result.token_accounts[0].amount) / 1e9 // Adjust for decimals

        // Fetch current price from Jupiter API
        const priceResponse = await fetch('https://price.jup.ag/v4/price?ids=SOBA')
        const priceData = await priceResponse.json()
        const sobaPrice = priceData.data.SOBA.price

        setStats({
          balance,
          usdValue: balance * sobaPrice,
          isLoading: false,
          error: null
        })
      } catch (error) {
        console.error('Error fetching burn wallet stats:', error)
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Failed to fetch burn wallet stats')
        }))
      }
    }

    fetchBurnWalletBalance()
    const interval = setInterval(fetchBurnWalletBalance, BURN_HISTORY.UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return stats
} 