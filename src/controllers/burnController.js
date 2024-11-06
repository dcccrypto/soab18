const Burn = require('../models/Burn');
const solanaTrackerService = require('../services/solanaTrackerService');
const solscanService = require('../services/solscanService');

exports.getBurnHistory = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const burns = await Burn.find().sort({ timestamp: -1 });
    res.json(burns);
  } catch (error) {
    console.error('Error fetching burn history:', error);
    res.status(500).json({ error: 'Failed to fetch burn history' });
  }
};

exports.trackNewBurns = async () => {
  try {
    const burnWallet = process.env.SOBA_BURN_WALLET;
    const tokenAddress = process.env.SOBA_TOKEN_ADDRESS;
    
    // Get transactions from Solscan
    const transactions = await solscanService.getWalletTransactions(burnWallet);
    
    // Process and save new burns
    for (const tx of transactions) {
      const exists = await Burn.findOne({ transactionHash: tx.signature });
      if (!exists) {
        await Burn.create({
          transactionHash: tx.signature,
          amount: tx.tokenAmount,
          timestamp: new Date(tx.blockTime * 1000),
          sender: tx.src
        });
      }
    }
  } catch (error) {
    console.error('Error tracking burns:', error);
  }
}; 