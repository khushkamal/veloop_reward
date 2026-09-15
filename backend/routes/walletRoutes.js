const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { requireAuth } = require('../middleware/auth');

router.get('/summary', requireAuth, walletController.getWalletSummary);
router.get('/history', requireAuth, walletController.getTransactionsHistory);

module.exports = router;
