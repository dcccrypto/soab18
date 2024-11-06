const axios = require('axios');
const WebSocket = require('ws');

class SolanaTrackerService {
  constructor() {
    this.baseUrl = 'https://data.solanatracker.io';
    this.apiKey = process.env.SOLANA_TRACKER_API_KEY;
    this.retryDelay = 1000; // 1 second initial retry delay
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
        // Handle rate limiting with exponential backoff
        const delay = this.retryDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.makeRequest(endpoint, retryCount + 1);
      }
      throw error;
    }
  }

  setupPriceWebSocket(tokenAddress, callback) {
    const ws = new WebSocket('wss://datastream.solanatracker.io');
    let heartbeatInterval;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const connect = () => {
      ws.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttempts = 0;
        ws.send(JSON.stringify({
          event: 'subscribe',
          channel: `price:${tokenAddress}`
        }));

        // Setup heartbeat
        heartbeatInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type !== 'pong') {
            callback(data);
          }
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeatInterval);
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          setTimeout(connect, 1000 * Math.pow(2, reconnectAttempts));
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    connect();
    return ws;
  }
}

module.exports = new SolanaTrackerService();
