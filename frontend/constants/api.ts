import { DynamicConstants, TokenStatsResponse } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://soba-api-v1-127255a88636.herokuapp.com'

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

export const fetchTokenStats = async (): Promise<TokenStatsResponse> => {
  console.log('[API] Fetching token stats from:', `${API_BASE_URL}/token-stats`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/token-stats`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: 'no-cache'
    });

    console.log('[API] Response status:', response.status);
    console.log('[API] Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[API] Error response:', errorText);
      throw new Error(`Failed to fetch token stats: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('[API] Token stats response:', data);
    return data;
  } catch (error) {
    console.error('[API Error] Fetching token stats:', error);
    throw error;
  }
}