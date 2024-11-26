import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { TokenStatsResponse } from '@/types'

export function useTokenStats() {
  return useQuery<TokenStatsResponse>({
    queryKey: ['tokenStats'],
    queryFn: api.getTokenStats,
    refetchInterval: 60000, // Refetch every minute
    select: (data) => ({
      ...data,
      circulatingSupply: data.totalSupply - data.founderBalance,
      marketCap: data.price * (data.totalSupply - data.founderBalance)
    })
  })
} 