import { useQuery } from '@tanstack/react-query';
import { fetchTokenStats } from '@/constants/api';
import type { TokenStatsResponse } from '@/constants/types';

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
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
    gcTime: 1000 * 60 * 5, // Garbage collection time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    select: (data: TokenStatsResponse): TokenStatsResponse => {
      console.log('[Hook] Processing token stats:', data);
      
      // Ensure all values are valid numbers
      const ensureNumber = (value: any): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
      };

      const processed: TokenStatsResponse = {
        price: ensureNumber(data.price),
        totalSupply: ensureNumber(data.totalSupply),
        circulatingSupply: ensureNumber(data.circulatingSupply),
        founderBalance: ensureNumber(data.founderBalance),
        holders: ensureNumber(data.holders),
        marketCap: ensureNumber(data.marketCap),
        totalValue: ensureNumber(data.totalValue),
        founderValue: ensureNumber(data.founderValue),
        toBeBurnedTokens: ensureNumber(data.toBeBurnedTokens),
        toBeBurnedValue: ensureNumber(data.toBeBurnedValue),
        burnRate: ensureNumber(data.burnRate),
        lastUpdated: data.lastUpdated || new Date().toISOString(),
        cached: Boolean(data.cached),
        cacheAge: ensureNumber(data.cacheAge)
      };

      // Validate processed data
      console.log('[Hook] Validation:', {
        hasValidPrice: processed.price > 0,
        hasValidSupply: processed.totalSupply > 0,
        hasValidCirculating: processed.circulatingSupply >= 0,
        supplyCheck: processed.totalSupply >= (processed.circulatingSupply + processed.founderBalance + processed.toBeBurnedTokens)
      });

      console.log('[Hook] Processed token stats:', processed);
      return processed;
    }
  });
};