import { DynamicConstants } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

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
    const response = await fetch(`${API_BASE_URL}/api/token-stats`)
    if (!response.ok) {
      throw new Error('Failed to fetch token stats')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching token stats:', error)
    throw error
  }
}