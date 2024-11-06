const express = require('express');
const router = express.Router();
const burnController = require('../controllers/burnController');

// Get burn history for a token
router.get('/tokens/:tokenAddress/burns', burnController.getBurnHistory);

// Get burn wallet balance
router.get('/tokens/:tokenAddress/burn-wallet', burnController.getBurnWalletBalance);

// Get next burn info
router.get('/tokens/:tokenAddress/next-burn', burnController.getNextBurnInfo);

// Track new burns (internal endpoint)
router.post('/internal/track-burns', burnController.trackNewBurns);

module.exports = router; 
