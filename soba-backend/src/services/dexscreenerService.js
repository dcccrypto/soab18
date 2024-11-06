const axios = require('axios');

class DexscreenerService {
  constructor() {
    this.baseUrl = 'https://api.dexscreener.com/latest';
    this.retryDelay = 1000;
    this.maxRetries = 3;
  }

  async getTokenInfo(tokenAddress) {
    try {
      const response = await this.makeRequest(`/dex/tokens/${tokenAddress}`);
      const pairs = response.data?.pairs || [];
      
      // Get the most liquid pair
      const mainPair = pairs.reduce((prev, current) => {
        return (prev.liquidity?.usd || 0) > (current.liquidity?.usd || 0) ? prev : current;
      }, pairs[0] || {});

      return {
        price: mainPair.priceUsd || 0,
        priceChange24h: mainPair.priceChange24h || 0,
        volume24h: mainPair.volume24h || 0,
        liquidity: mainPair.liquidity?.usd || 0,
        pairs: pairs.map(pair => ({
          address: pair.pairAddress,
          dex: pair.dexId,
          liquidity: pair.liquidity?.usd || 0,
          volume24h: pair.volume24h || 0
        }))
      };
    } catch (error) {
      console.error('Error fetching token info:', error);
      throw error;
    }
  }

  async getPairInfo(pairAddress) {
    try {
      const response = await this.makeRequest(`/dex/pairs/solana/${pairAddress}`);
      return response.data?.pairs?.[0] || null;
    } catch (error) {
      console.error('Error fetching pair info:', error);
      throw error;
    }
  }

  async makeRequest(endpoint, retryCount = 0) {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`);
      return response;
    } catch (error) {
      if (error.response?.status === 429 && retryCount < this.maxRetries) {
        const delay = this.retryDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.makeRequest(endpoint, retryCount + 1);
      }
      throw error;
    }
  }
}

module.exports = new DexscreenerService(); 
