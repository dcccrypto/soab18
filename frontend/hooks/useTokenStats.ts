import { useQuery } from '@tanstack/react-query';
import { fetchTokenStats } from '@/constants/api';
import type { TokenStatsResponse } from '@/constants/types';

export const useTokenStats = () => {
  return useQuery<TokenStatsResponse, Error, TokenStatsResponse>({
    queryKey: ['tokenStats'],
    queryFn: fetchTokenStats,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
    gcTime: 1000 * 60 * 5, // Garbage collection time (formerly cacheTime)
    retry: 3,
    select: (data) => ({
      ...data,
      // Ensure all numeric values are properly formatted
      price: Number(data.price),
      totalSupply: Number(data.totalSupply),
      circulatingSupply: Number(data.circulatingSupply),
      founderBalance: Number(data.founderBalance),
      holders: Number(data.holders),
      marketCap: Number(data.marketCap),
      totalValue: Number(data.totalValue),
      founderValue: Number(data.founderValue),
      burnedTokens: Number(data.burnedTokens),
      burnedValue: Number(data.burnedValue)
    })
  });
};