import axios, { AxiosError } from 'axios';

interface TokenInfo {
  totalBurned: number;
  burnRate: number;
  lastBurnAmount: number;
  lastBurnTimestamp: number | null;
  holderCount: number;
  price: number;
  marketCap: number;
}

interface BurnTransaction {
  txHash: string;
  timestamp: number;
  amount: number;
  sender: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000
});

// Error handling interceptor
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      throw new ApiError(
        error.response.status,
        (error.response.data as { message?: string })?.message || 'An error occurred'
      );
    }
    throw new Error('Network error');
  }
);

export const tokenService = {
  async getTokenInfo(tokenAddress: string): Promise<TokenInfo> {
    try {
      const response = await api.get(`/api/tokens/${tokenAddress}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching token info:', error);
      throw error;
    }
  },

  async getBurnHistory(tokenAddress: string): Promise<BurnTransaction[]> {
    try {
      const response = await api.get(`/api/tokens/${tokenAddress}/burns`);
      return response.data;
    } catch (error) {
      console.error('Error fetching burn history:', error);
      throw error;
    }
  },

  async getHolderStats(tokenAddress: string) {
    try {
      const response = await api.get(`/api/tokens/${tokenAddress}/holders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching holder stats:', error);
      throw error;
    }
  },

  // WebSocket connection for real-time updates with reconnection logic
  setupPriceWebSocket(tokenAddress: string, callback: (data: any) => void) {
    let ws: WebSocket | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/price/${tokenAddress}`);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttempts = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      };

      ws.onclose = () => {
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          const delay = 1000 * Math.pow(2, reconnectAttempts);
          reconnectTimeout = setTimeout(connect, delay);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    connect();

    // Return cleanup function
    return () => {
      if (ws) {
        ws.close();
      }
      clearTimeout(reconnectTimeout);
    };
  }
};

export default api;
