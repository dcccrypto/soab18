import axios, { AxiosError } from 'axios';
import { BurnTransaction, TokenMetrics } from '@/constants/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://soba-api.herokuapp.com';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiError>) => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    console.error(`[API Error] ${errorMessage}:`, error);
    throw error;
  }
);

export const tokenService = {
  async getBurnHistory(): Promise<ApiResponse<BurnTransaction[]>> {
    try {
      const response = await api.get<ApiResponse<BurnTransaction[]>>('/api/burn-history');
      return response.data;
    } catch (error) {
      throw new Error(error instanceof AxiosError ? error.response?.data?.message : 'Failed to fetch burn history');
    }
  },

  async getTokenStats(): Promise<ApiResponse<TokenMetrics>> {
    try {
      const response = await api.get<ApiResponse<TokenMetrics>>('/api/token-stats');
      return response.data;
    } catch (error) {
      throw new Error(error instanceof AxiosError ? error.response?.data?.message : 'Failed to fetch token stats');
    }
  }
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('[API Error] Health check failed:', error);
    return false;
  }
};

export default api;
