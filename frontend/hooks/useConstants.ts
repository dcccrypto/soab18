import { useState, useEffect } from 'react'
import { fetchDynamicConstants } from '@/constants/api'
import type { DynamicConstants } from '@/constants/types'

export const useConstants = () => {
  const [state, setState] = useState<{
    dynamicConstants?: DynamicConstants
    isLoading: boolean
    error: Error | null
  }>({
    dynamicConstants: undefined,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        const data = await fetchDynamicConstants()
        setState({
          dynamicConstants: data,
          isLoading: false,
          error: null
        })
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Failed to fetch constants')
        }))
      }
    }

    fetchConstants()
    const interval = setInterval(fetchConstants, 30000) // Refetch every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const refetch = async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      const data = await fetchDynamicConstants()
      setState({
        dynamicConstants: data,
        isLoading: false,
        error: null
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Failed to fetch constants')
      }))
    }
  }

  return {
    ...state,
    refetch
  }
} 