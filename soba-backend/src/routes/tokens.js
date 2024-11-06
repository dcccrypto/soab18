const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');
const burnController = require('../controllers/burnController');

// Token info endpoints
router.get('/tokens/:tokenAddress', tokenController.getTokenInfo);
router.get('/tokens/:tokenAddress/holders', tokenController.getHolderStats);
router.get('/tokens/:tokenAddress/price', tokenController.getTokenPrice);

// Burn endpoints
router.get('/tokens/:tokenAddress/burns', burnController.getBurnHistory);

module.exports = router; 
