const axios = require('axios');
const { chunk } = require('lodash');
const config = require('../config.json');

class SolscanService {
  constructor() {
    const solscanConfig = config.api.solscan;
    this.baseUrl = solscanConfig.baseUrl;
    this.batchSize = solscanConfig.batchSize;
    this.rateLimitDelay = solscanConfig.rateLimitDelay;
    this.maxRetries = solscanConfig.maxRetries;
    this.endpoints = solscanConfig.endpoints;
  }

  async getAccountTransactions(address, limit = 50, before = '', retryCount = 0) {
    try {
      const params = {
        account: address,
        limit,
        ...(before && { before })
      };

      const response = await axios.get(
        `${this.baseUrl}${this.endpoints.accountTransactions}`, 
        { 
          params,
          headers: {
            'token': process.env.SOLSCAN_API_KEY
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 429 && retryCount < this.maxRetries) {
        const delay = this.rateLimitDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.getAccountTransactions(address, limit, before, retryCount + 1);
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

        // Process transactions in batches
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

  async getTokenMetadata(tokenAddress, retryCount = 0) {
    try {
      const response = await axios.get(
        `${this.baseUrl}${this.endpoints.tokenMeta}`,
        {
          params: { tokenAddress },
          headers: {
            'token': process.env.SOLSCAN_API_KEY
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 429 && retryCount < this.maxRetries) {
        const delay = this.rateLimitDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.getTokenMetadata(tokenAddress, retryCount + 1);
      }
      throw error;
    }
  }

  async getTokenHolders(tokenAddress, retryCount = 0) {
    try {
      const response = await axios.get(
        `${this.baseUrl}${this.endpoints.tokenHolders}`,
        {
          params: { tokenAddress },
          headers: {
            'token': process.env.SOLSCAN_API_KEY
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 429 && retryCount < this.maxRetries) {
        const delay = this.rateLimitDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.getTokenHolders(tokenAddress, retryCount + 1);
      }
      throw error;
    }
  }
}

module.exports = new SolscanService();
