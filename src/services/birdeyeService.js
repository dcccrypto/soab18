const axios = require('axios');

class BirdeyeService {
  constructor() {
    this.baseUrl = 'https://public-api.birdeye.so/v1';
    this.retryDelay = 1000;
    this.maxRetries = 3;
  }

  async getTokenPrice(tokenAddress) {
    try {
      const response = await axios.get(`${this.baseUrl}/token/price`, {
        params: { address: tokenAddress },
        headers: { 'x-api-key': process.env.BIRDEYE_API_KEY }
      });
      return response.data;
    } catch (error) {
      console.error('Birdeye API error:', error);
      throw error;
    }
  }

  async getTokenMetrics(tokenAddress) {
    try {
      const response = await axios.get(`${this.baseUrl}/token/meta`, {
        params: { address: tokenAddress },
        headers: { 'x-api-key': process.env.BIRDEYE_API_KEY }
      });
      return response.data;
    } catch (error) {
      console.error('Birdeye API error:', error);
      throw error;
    }
  }
}

module.exports = new BirdeyeService(); 