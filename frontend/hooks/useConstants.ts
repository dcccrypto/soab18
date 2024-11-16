import { useQuery } from '@tanstack/react-query'
import { fetchDynamicConstants } from '@/constants/api'
import type { DynamicConstants } from '@/constants/types'

export const useConstants = () => {
  const { 
    data: dynamicConstants,
    isLoading,
    error,
    refetch
  } = useQuery<DynamicConstants>({
    queryKey: ['constants'],
    queryFn: fetchDynamicConstants,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  })

  return {
    dynamicConstants,
    isLoading,
    error,
    refetch
  }
} 