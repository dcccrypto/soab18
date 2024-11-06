const axios = require('axios');
const { chunk } = require('lodash');

class SolscanService {
  constructor() {
    this.baseUrl = 'https://public-api.solscan.io';
    this.batchSize = 10; // Number of transactions to process at once
    this.rateLimitDelay = 100; // Delay between API calls in ms
  }

  async getAccountTransactions(address, limit = 50, before = '') {
    try {
      const params = {
        account: address,
        limit,
        ...(before && { before })
      };

      const response = await axios.get(`${this.baseUrl}/account/transactions`, { params });
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        // Handle rate limiting
        await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay));
        return this.getAccountTransactions(address, limit, before);
      }
      throw error;
    }
  }

  async getBurnTransactions(burnWalletAddress, tokenAddress, startTime = null) {
    try {
      let allTransactions = [];
      let hasMore = true;
      let lastTx = '';

      while (hasMore) {
        const transactions = await this.getAccountTransactions(burnWalletAddress, 50, lastTx);
        
        if (!transactions || transactions.length === 0) {
          hasMore = false;
          break;
        }

        // Process transactions in batches to avoid overwhelming the API
        const batches = chunk(transactions, this.batchSize);
        for (const batch of batches) {
          const burnTxs = batch.filter(tx => {
            const isAfterStartTime = !startTime || tx.blockTime > startTime;
            return isAfterStartTime && tx.tokenTransfers?.some(transfer => 
              transfer.fromUserAccount === burnWalletAddress &&
              transfer.mint === tokenAddress
            );
          });

          allTransactions.push(...burnTxs.map(tx => ({
            txHash: tx.txHash,
            timestamp: tx.blockTime,
            amount: tx.tokenTransfers.find(t => 
              t.fromUserAccount === burnWalletAddress &&
              t.mint === tokenAddress
            )?.amount || 0,
            sender: tx.tokenTransfers[0]?.fromUserAccount
          })));

          // Rate limiting delay between batches
          await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay));
        }

        lastTx = transactions[transactions.length - 1]?.txHash;
      }

      return allTransactions;
    } catch (error) {
      console.error('Error fetching burn transactions:', error);
      throw error;
    }
  }

  async getTokenMetadata(tokenAddress) {
    try {
      const response = await axios.get(`${this.baseUrl}/token/meta`, {
        params: { tokenAddress }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay));
        return this.getTokenMetadata(tokenAddress);
      }
      throw error;
    }
  }
}

module.exports = new SolscanService();
