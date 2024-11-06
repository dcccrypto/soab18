const WebSocket = require('ws');
const birdeyeService = require('./birdeyeService');

class WebSocketService {
  constructor() {
    this.clients = new Map();
    this.priceUpdateInterval = 10000; // 10 seconds
  }

  initialize(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
      const tokenAddress = this.getTokenAddressFromUrl(req.url);
      if (!tokenAddress) {
        ws.close();
        return;
      }

      this.addClient(tokenAddress, ws);

      ws.on('close', () => {
        this.removeClient(tokenAddress, ws);
      });
    });

    // Start price updates
    this.startPriceUpdates();
  }

  getTokenAddressFromUrl(url) {
    const match = url.match(/\/price\/([A-Za-z0-9]+)/);
    return match ? match[1] : null;
  }

  addClient(tokenAddress, ws) {
    if (!this.clients.has(tokenAddress)) {
      this.clients.set(tokenAddress, new Set());
    }
    this.clients.get(tokenAddress).add(ws);
  }

  removeClient(tokenAddress, ws) {
    const tokenClients = this.clients.get(tokenAddress);
    if (tokenClients) {
      tokenClients.delete(ws);
      if (tokenClients.size === 0) {
        this.clients.delete(tokenAddress);
      }
    }
  }

  async startPriceUpdates() {
    setInterval(async () => {
      for (const [tokenAddress, clients] of this.clients.entries()) {
        try {
          const price = await birdeyeService.getTokenPrice(tokenAddress);
          const message = JSON.stringify({ price });
          
          for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          }
        } catch (error) {
          console.error(`Error updating price for ${tokenAddress}:`, error);
        }
      }
    }, this.priceUpdateInterval);
  }
}

module.exports = new WebSocketService(); 