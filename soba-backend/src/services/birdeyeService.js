const axios = require('axios');

class BirdeyeService {
  constructor() {
    this.baseUrl = 'https://public-api.birdeye.so/v1';
    this.retryDelay = 1000;
    this.maxRetries = 3;
  }

  async getTokenPrice(tokenAddress) {
    try {
      const response = await this.makeRequest(`/token/price`, {
        address: tokenAddress
      });

      return {
        value: response.data?.value || 0,
        priceChange24h: response.data?.priceChange24h || 0,
        volume24h: response.data?.volume24h || 0,
        timestamp: response.data?.timestamp || Date.now()
      };
    } catch (error) {
      console.error('Error fetching token price:', error);
      throw error;
    }
  }

  async getTokenMetrics(tokenAddress) {
    try {
      const response = await this.makeRequest(`/token/meta`, {
        address: tokenAddress
      });

      return {
        name: response.data?.name,
        symbol: response.data?.symbol,
        decimals: response.data?.decimals,
        totalSupply: response.data?.totalSupply,
        holderCount: response.data?.holderCount
      };
    } catch (error) {
      console.error('Error fetching token metrics:', error);
      throw error;
    }
  }

  async makeRequest(endpoint, params = {}) {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        params,
        headers: {
          'x-api-key': process.env.BIRDEYE_API_KEY
        }
      });
      return response;
    } catch (error) {
      if (error.response?.status === 429 && this.retryCount < this.maxRetries) {
        const delay = this.retryDelay * Math.pow(2, this.retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.makeRequest(endpoint, params);
      }
      throw error;
    }
  }
}

module.exports = new BirdeyeService(); 
