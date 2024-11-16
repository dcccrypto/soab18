import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://soba-api.herokuapp.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const tokenService = {
  async getBurnHistory() {
    try {
      const response = await api.get('/api/burn-history');
      return response.data;
    } catch (error) {
      console.error('[API Error] Failed to fetch burn history:', error);
      throw error;
    }
  }
};

export const fetchTokenStats = async () => {
  try {
    const response = await api.get('/api/token-stats');
    return response.data;
  } catch (error) {
    console.error('[API Error] Failed to fetch token stats:', error);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('[API Error] Health check failed:', error);
    throw error;
  }
};

export default api;
