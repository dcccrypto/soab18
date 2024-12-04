export interface MetricItem {
  TITLE: string
  VALUE: number
  DESCRIPTION: string
  DISPLAY_TYPE: 'number' | 'percent' | 'price'
  ICON?: any
  PREFIX?: string
  SUFFIX?: string
  PERCENTAGE?: boolean
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
  value: number
}

export interface BurnInfo {
  BURN_WALLET: string
  TOTAL_BURNED: number
  BURN_RATE: number
  BURN_SCHEDULE: string
  LATEST_BURN: {
    date: string
    amount: number
    txId: string
  }
  NEXT_BURN: {
    TARGET_DATE: string
    LAST_BURN_DATE: string
    EVENT_NAME: string
    DESCRIPTION: string
    AMOUNT: number
  }
  PROGRESS: number
  START_DATE: string
  END_DATE: string
  NEXT_BURN_DATE: string
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

export interface RoadmapPhase {
  phase: number
  title: string
  status: 'Completed' | 'Upcoming'
  description: string
  objective: string
  details: string
  icon: string
}