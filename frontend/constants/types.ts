export interface TokenMetrics {
  totalSupply: number
  circulatingSupply: number
  burnedTokens: number
  burnRate: number
  nextBurnDate: string
  currentPrice: number
  marketCap: number
}

export interface BurnInfo {
  totalBurned: number
  burnWallet: string
  burnRate: number
  nextBurn: {
    targetDate: string
    estimatedAmount: number
    description: string
    eventName: string
    currentUsdValue: number
    lastBurnDate: string
  }
  burnHistory: Array<{
    date: string
    amount: number
    txHash: string
  }>
}

export interface SocialStats {
  twitter: {
    followers: number
    engagement: number
  }
  telegram: {
    members: number
    activeUsers: number
  }
  discord: {
    members: number
    onlineCount: number
  }
}

export interface DynamicConstants {
  tokenMetrics: TokenMetrics
  burnInfo: BurnInfo
  socialStats: SocialStats
} 