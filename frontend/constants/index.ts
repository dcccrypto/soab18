import * as STATIC_CONSTANTS from './static'
import type { DynamicConstants } from './types'

// Re-export static constants
export * from './static'

// Helper to merge static and dynamic constants
export const mergeConstants = (dynamicData: DynamicConstants) => ({
  ...STATIC_CONSTANTS,
  TOKEN_INFO: {
    TOTAL_SUPPLY: dynamicData.tokenMetrics.totalSupply,
    CIRCULATING_SUPPLY: dynamicData.tokenMetrics.circulatingSupply,
    BURNED_TOKENS: dynamicData.tokenMetrics.burnedTokens,
    DECIMALS: 9,
    SYMBOL: 'SOBA',
    NAME: 'SOBA Token',
    MINT_ADDRESS: '25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH',
  },
  BURN_INFO: dynamicData.burnInfo,
  SOCIAL_STATS: dynamicData.socialStats,
})

// Example usage in a component:
/*
import { useConstants } from '@/hooks/useConstants'
import { mergeConstants } from '@/constants'

const MyComponent = () => {
  const { dynamicConstants, isLoading } = useConstants()
  
  if (isLoading) return <div>Loading...</div>
  
  const constants = mergeConstants(dynamicConstants)
  
  return (
    <div>
      <h1>Total Supply: {constants.TOKEN_INFO.TOTAL_SUPPLY}</h1>
    </div>
  )
}
*/ 

// Re-export everything from static and types
export * from './static'
export * from './types'

// Export dynamic constants fetching
export * from './api' 