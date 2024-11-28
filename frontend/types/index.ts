export interface MetricItem {
  TITLE: string
  VALUE: number
  DESCRIPTION: string
  DISPLAY_TYPE: 'number' | 'percent'
}

export interface MetricItems {
  TOTAL_SUPPLY: MetricItem
  CIRCULATING: MetricItem
  BURNED: MetricItem
  FOUNDER: MetricItem
  HOLDERS: MetricItem
}

export interface TokenStats {
  price: number;
  totalSupply: number;
  circulatingSupply: number;
  burnedTokens: number;
  founderBalance: number;
  holders: number;
  marketCap: number;
  totalValue: number;
  burnedValue: number;
  founderValue: number;
  toBeBurnedTokens: number;
  toBeBurnedValue: number;
  burnRate: number;
  lastUpdated: string;
}

export interface TokenStatsResponse extends TokenStats {
  cached?: boolean;
  cacheAge?: number;
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

export interface TokenMetrics {
  totalSupply: number
  circulatingSupply: number
  burnedTokens: number
  founderHolding: number
  price: number
  holders: number
}

export interface DynamicConstants {
  API_BASE_URL: string
  WS_URL: string
  HELIUS_API_KEY: string
  JUPITER_API_URL: string
}