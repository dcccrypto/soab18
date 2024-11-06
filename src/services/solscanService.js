const axios = require('axios');

const api = axios.create({
  baseURL: process.env.SOLSCAN_API_URL,
  headers: {
    'token': process.env.SOLSCAN_API_KEY
  }
});

exports.getWalletTransactions = async (walletAddress) => {
  try {
    const response = await api.get(`/account/transactions`, {
      params: { account: walletAddress }
    });
    return response.data;
  } catch (error) {
    console.error('Solscan API error:', error);
    throw error;
  }
};

exports.getTokenHolders = async (tokenAddress) => {
  try {
    const response = await api.get(`/token/holders`, {
      params: { tokenAddress }
    });
    return response.data;
  } catch (error) {
    console.error('Solscan API error:', error);
    throw error;
  }
}; 