const axios = require('axios');

class SolanaTrackerService {
  constructor() {
    this.baseUrl = 'https://data.solanatracker.io';
    this.apiKey = process.env.SOLANA_TRACKER_API_KEY;
    this.retryDelay = 1000;
    this.maxRetries = 3;
  }

  async getTokenInfo(tokenAddress) {
    return this.makeRequest(`/tokens/${tokenAddress}`);
  }

  async getTokenHolders(tokenAddress) {
    return this.makeRequest(`/tokens/${tokenAddress}/holders`);
  }

  async getBurnMetrics(tokenAddress) {
    try {
      const [tokenInfo, holders] = await Promise.all([
        this.getTokenInfo(tokenAddress),
        this.getTokenHolders(tokenAddress)
      ]);

      return {
        totalBurned: tokenInfo.token.burned || 0,
        burnRate: tokenInfo.token.burnRate || 0,
        lastBurnAmount: tokenInfo.token.lastBurn?.amount || 0,
        lastBurnTimestamp: tokenInfo.token.lastBurn?.timestamp || null,
        holderCount: holders.length || 0
      };
    } catch (error) {
      console.error('Error fetching burn metrics:', error);
      throw error;
    }
  }

  async makeRequest(endpoint, retryCount = 0) {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        headers: {
          'x-api-key': this.apiKey
        }
      });
      return response.data;
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

module.exports = new SolanaTrackerService(); 