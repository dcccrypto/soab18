const solanaTrackerService = require('../services/solanaTrackerService');
const solscanService = require('../services/solscanService');
const birdeyeService = require('../services/birdeyeService');
const dexscreenerService = require('../services/dexscreenerService');

// Get complete token info including price, burns, and holders
exports.getTokenInfo = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const [burnMetrics, price, holders] = await Promise.all([
      solanaTrackerService.getBurnMetrics(tokenAddress),
      birdeyeService.getTokenPrice(tokenAddress),
      solscanService.getTokenHolders(tokenAddress)
    ]);

    res.json({
      totalBurned: burnMetrics.totalBurned,
      burnRate: burnMetrics.burnRate,
      lastBurnAmount: burnMetrics.lastBurnAmount,
      lastBurnTimestamp: burnMetrics.lastBurnTimestamp,
      holderCount: holders.length,
      price: price.value,
      marketCap: price.value * (1000000000 - burnMetrics.totalBurned) // Total supply - burned
    });
  } catch (error) {
    console.error('Error fetching token info:', error);
    res.status(500).json({ error: 'Failed to fetch token info' });
  }
};

exports.getHolderStats = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const holders = await solscanService.getTokenHolders(tokenAddress);
    res.json({
      totalHolders: holders.length,
      holders: holders.map(holder => ({
        address: holder.owner,
        balance: holder.amount,
        percentage: holder.share
      }))
    });
  } catch (error) {
    console.error('Error fetching holder stats:', error);
    res.status(500).json({ error: 'Failed to fetch holder stats' });
  }
};

exports.getTokenPrice = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const [birdeyePrice, dexscreenerPrice] = await Promise.all([
      birdeyeService.getTokenPrice(tokenAddress),
      dexscreenerService.getTokenInfo(tokenAddress)
    ]);

    res.json({
      price: birdeyePrice.value,
      priceChange24h: birdeyePrice.priceChange24h,
      volume24h: dexscreenerPrice.pairs[0]?.volume24h || 0,
      liquidity: dexscreenerPrice.pairs[0]?.liquidity || 0
    });
  } catch (error) {
    console.error('Error fetching token price:', error);
    res.status(500).json({ error: 'Failed to fetch token price' });
  }
}; 
