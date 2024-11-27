import { DynamicConstants } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.soba18.com'

export const fetchDynamicConstants = async (): Promise<DynamicConstants> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/constants`)
    if (!response.ok) {
      throw new Error('Failed to fetch constants')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching dynamic constants:', error)
    throw error
  }
}

export const fetchTokenStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/token-stats`)
    if (!response.ok) {
      throw new Error(`Failed to fetch token stats: ${response.status}`)
    }
    const data = await response.json()
    console.log('[API] Token stats response:', data)
    return data
  } catch (error) {
    console.error('[API Error] Fetching token stats:', error)
    throw error
  }
}