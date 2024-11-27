import { useQuery } from '@tanstack/react-query';
import { fetchTokenStats } from '@/constants/api';
import type { TokenStatsResponse } from '@/constants/types';

export const useTokenStats = () => {
  return useQuery<TokenStatsResponse>({
    queryKey: ['tokenStats'],
    queryFn: fetchTokenStats,
    refetchInterval: 60000, // Refetch every minute
  });
};