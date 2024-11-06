const axios = require('axios');

class DexscreenerService {
  constructor() {
    this.baseUrl = 'https://api.dexscreener.com/latest';
  }

  async getTokenInfo(tokenAddress) {
    try {
      const response = await axios.get(`${this.baseUrl}/dex/tokens/${tokenAddress}`);
      return response.data;
    } catch (error) {
      console.error('Dexscreener API error:', error);
      throw error;
    }
  }

  async getPairInfo(pairAddress) {
    try {
      const response = await axios.get(`${this.baseUrl}/dex/pairs/solana/${pairAddress}`);
      return response.data;
    } catch (error) {
      console.error('Dexscreener API error:', error);
      throw error;
    }
  }
}

module.exports = new DexscreenerService(); 