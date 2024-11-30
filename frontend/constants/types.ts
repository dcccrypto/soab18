export type Timeframe = '1M' | '3M' | '6M' | '1Y' | 'ALL'

export interface TokenMetrics {
  totalSupply: number
  circulatingSupply: number
  burnedTokens: number
  founderHolding: number
  price: number
  holders: number
}

export interface BurnTransaction {
  txId: string
  amount: number
  date: string
}

export interface BurnInfo {
  TOTAL_BURNED: number
  BURN_RATE: number
  BURN_SCHEDULE: string
  BURN_WALLET: string
  NEXT_BURN: {
    TARGET_DATE: string
    LAST_BURN_DATE: string
  }
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