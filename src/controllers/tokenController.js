const solanaTrackerService = require('../services/solanaTrackerService');
const solscanService = require('../services/solscanService');
const birdeyeService = require('../services/birdeyeService');
const dexscreenerService = require('../services/dexscreenerService');

exports.getHolderStats = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const stats = await solscanService.getTokenHolders(tokenAddress);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching holder stats:', error);
    res.status(500).json({ error: 'Failed to fetch holder stats' });
  }
};

exports.getTokenPrice = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const price = await birdeyeService.getTokenPrice(tokenAddress);
    res.json(price);
  } catch (error) {
    console.error('Error fetching token price:', error);
    res.status(500).json({ error: 'Failed to fetch token price' });
  }
}; 