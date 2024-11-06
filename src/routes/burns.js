const express = require('express');
const router = express.Router();
const burnController = require('../controllers/burnController');

router.get('/tokens/:tokenAddress/burns', burnController.getBurnHistory);

module.exports = router; 