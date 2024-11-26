import axios from 'axios'
import { TokenStatsResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const api = {
  async getTokenStats(): Promise<TokenStatsResponse> {
    try {
      const response = await axios.get<TokenStatsResponse>(`${API_BASE_URL}/api/token-stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching token stats:', error)
      throw error
    }
  },

  async getHealth(): Promise<{ status: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`)
      return response.data
    } catch (error) {
      console.error('Error checking health:', error)
      throw error
    }
  }
}
