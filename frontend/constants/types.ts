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
  BURN_WALLET: string
  TOTAL_BURNED: number
  LATEST_BURN: BurnTransaction
  BURN_RATE: number
  BURN_HISTORY: BurnTransaction[]
  NEXT_BURN: {
    TARGET_DATE: string
    ESTIMATED_AMOUNT: number
    DESCRIPTION: string
    EVENT_NAME: string
    CURRENT_USD_VALUE: number
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

export interface TokenStatsResponse {
  price: number
  totalSupply: number
  circulatingSupply: number
  holders: number
  lastUpdated: string
  cached?: boolean
  cacheAge?: number
  marketCap: number
  totalValue: number
  founderBalance: number
  founderValue: number
  toBeBurnedTokens: number
  toBeBurnedValue: number
}

export interface DynamicConstants {
  tokenMetrics: TokenMetrics
  burnInfo: BurnInfo
  socialStats: SocialStats
}