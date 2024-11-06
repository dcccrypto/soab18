const Burn = require('../models/Burn');
const solanaTrackerService = require('../services/solanaTrackerService');
const solscanService = require('../services/solscanService');
const birdeyeService = require('../services/birdeyeService');

exports.getBurnHistory = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const burns = await Burn.find()
      .sort({ timestamp: -1 })
      .limit(100); // Limit to last 100 burns for performance
    res.json(burns);
  } catch (error) {
    console.error('Error fetching burn history:', error);
    res.status(500).json({ error: 'Failed to fetch burn history' });
  }
};

exports.getBurnWalletBalance = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const burnWallet = process.env.SOBA_BURN_WALLET;
    
    const balance = await solscanService.getTokenBalance(burnWallet, tokenAddress);
    
    res.json({
      address: burnWallet,
      balance: balance,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error fetching burn wallet balance:', error);
    res.status(500).json({ error: 'Failed to fetch burn wallet balance' });
  }
};

exports.getNextBurnInfo = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    
    // Get the last burn to calculate next burn date
    const lastBurn = await Burn.findOne().sort({ timestamp: -1 });
    
    // Calculate next burn date (assuming monthly burns)
    const nextBurnDate = lastBurn 
      ? new Date(lastBurn.timestamp.getFullYear(), lastBurn.timestamp.getMonth() + 1, 1)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    res.json({
      nextBurnDate: nextBurnDate.toISOString(),
      estimatedAmount: null, // Can be implemented later if we have a way to estimate
      lastBurnAmount: lastBurn?.amount || 0,
      lastBurnDate: lastBurn?.timestamp || null
    });
  } catch (error) {
    console.error('Error fetching next burn info:', error);
    res.status(500).json({ error: 'Failed to fetch next burn info' });
  }
};

exports.trackNewBurns = async (req, res) => {
  try {
    const burnWallet = process.env.SOBA_BURN_WALLET;
    const tokenAddress = process.env.SOBA_TOKEN_ADDRESS;
    
    // Get latest burn from DB to use as start time
    const lastBurn = await Burn.findOne().sort({ timestamp: -1 });
    const startTime = lastBurn ? Math.floor(lastBurn.timestamp.getTime() / 1000) : null;
    
    // Get new transactions from Solscan
    const transactions = await solscanService.getBurnTransactions(burnWallet, tokenAddress, startTime);
    
    // Process and save new burns
    for (const tx of transactions) {
      const exists = await Burn.findOne({ transactionHash: tx.txHash });
      if (!exists) {
        await Burn.create({
          transactionHash: tx.txHash,
          amount: tx.amount,
          timestamp: new Date(tx.timestamp * 1000),
          sender: tx.sender
        });
      }
    }

    // If this was called via API, send response
    if (res) {
      res.json({ message: 'Burns tracked successfully' });
    }
  } catch (error) {
    console.error('Error tracking burns:', error);
    if (res) {
      res.status(500).json({ error: 'Failed to track burns' });
    }
  }
}; 
