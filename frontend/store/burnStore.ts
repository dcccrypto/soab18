import create from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { TokenMetrics, BurnInfo, BurnTransaction } from '../constants/types'

interface BurnStore {
  // Burn Metrics
  totalBurned: number
  burnRate: number
  burnHistory: BurnTransaction[]
  nextBurn: {
    date: string
    amount: number
    event: string
    description: string
  }
  
  // Token Metrics
  tokenMetrics: TokenMetrics
  
  // Market Data
  price: number
  marketCap: number
  holderCount: number
  volume24h: number
  
  // Actions
  updateBurnData: (data: Partial<BurnUpdate>) => void
  updateMarketData: (data: Partial<MarketUpdate>) => void
  updateHolderData: (data: Partial<HolderUpdate>) => void
}

interface BurnUpdate {
  totalBurned: number
  burnRate: number
  burnHistory: BurnTransaction[]
  nextBurn: {
    date: string
    amount: number
    event: string
    description: string
  }
}

interface MarketUpdate {
  price: number
  marketCap: number
  volume24h: number
}

interface HolderUpdate {
  holderCount: number
}

type BurnState = StateCreator<BurnStore>

const createBurnStore: BurnState = (set) => ({
  // Initial State
  totalBurned: 0,
  burnRate: 0,
  burnHistory: [],
  nextBurn: {
    date: '',
    amount: 0,
    event: '',
    description: ''
  },
  
  tokenMetrics: {
    totalSupply: 0,
    circulatingSupply: 0,
    burnedTokens: 0,
    founderHolding: 0,
    price: 0,
    holders: 0
  },
  
  price: 0,
  marketCap: 0,
  holderCount: 0,
  volume24h: 0,
  
  // Update Actions
  updateBurnData: (data: Partial<BurnUpdate>) => 
    set((state) => ({
      ...state,
      totalBurned: data.totalBurned ?? state.totalBurned,
      burnRate: data.burnRate ?? state.burnRate,
      burnHistory: data.burnHistory ?? state.burnHistory,
      nextBurn: data.nextBurn ?? state.nextBurn
    })),
  
  updateMarketData: (data: Partial<MarketUpdate>) =>
    set((state) => ({
      ...state,
      price: data.price ?? state.price,
      marketCap: data.marketCap ?? state.marketCap,
      volume24h: data.volume24h ?? state.volume24h
    })),
  
  updateHolderData: (data: Partial<HolderUpdate>) =>
    set((state) => ({
      ...state,
      holderCount: data.holderCount ?? state.holderCount,
      tokenMetrics: {
        ...state.tokenMetrics,
        holders: data.holderCount ?? state.tokenMetrics.holders
      }
    }))
})

export const useBurnStore = create<BurnStore>()(devtools(createBurnStore))
