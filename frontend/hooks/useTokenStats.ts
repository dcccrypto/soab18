import { useQuery } from '@tanstack/react-query';
import { fetchTokenStats } from '@/constants/api';
import type { TokenStatsResponse } from '@/types';

const TOTAL_SUPPLY = 1_000_000_000; // 1 billion total supply

export const useTokenStats = () => {
  return useQuery<TokenStatsResponse, Error, TokenStatsResponse>({
    queryKey: ['tokenStats'],
    queryFn: async () => {
      try {
        console.log('[Hook] Fetching token stats...');
        const data = await fetchTokenStats();
        console.log('[Hook] Token stats fetched:', data);
        return data;
      } catch (error) {
        console.error('[Hook] Error fetching token stats:', error);
        throw error;
      }
    },
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000,
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 60000),
    select: (data: TokenStatsResponse): TokenStatsResponse => {
      console.log('[Hook] Processing token stats:', data);
      
      // Ensure all values are valid numbers
      const ensureNumber = (value: any): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
      };

      const processed: TokenStatsResponse = {
        price: ensureNumber(data.price),
        totalSupply: TOTAL_SUPPLY, // Use static total supply
        circulatingSupply: ensureNumber(data.circulatingSupply),
        burnedTokens: ensureNumber(data.burnedTokens),
        founderBalance: ensureNumber(data.founderBalance),
        holders: ensureNumber(data.holders),
        marketCap: ensureNumber(data.marketCap),
        totalValue: ensureNumber(data.totalValue),
        burnedValue: ensureNumber(data.burnedValue),
        founderValue: ensureNumber(data.founderValue),
        toBeBurnedTokens: ensureNumber(data.toBeBurnedTokens),
        toBeBurnedValue: ensureNumber(data.toBeBurnedValue),
        burnRate: ensureNumber(data.burnRate),
        lastUpdated: data.lastUpdated || new Date().toISOString(),
        cached: Boolean(data.cached),
        cacheAge: ensureNumber(data.cacheAge)
      };

      // Validate processed data
      console.log('[Hook] Processed token stats:', processed);

      return processed;
    }
  });
};