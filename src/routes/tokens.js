const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.get('/tokens/:tokenAddress/holders', tokenController.getHolderStats);
router.get('/tokens/:tokenAddress/price', tokenController.getTokenPrice);

module.exports = router; 