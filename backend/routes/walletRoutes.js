const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { requireAuth } = require('../middleware/auth');
const { validatePagination } = require('../middleware/validator');

router.get('/summary', requireAuth, walletController.getWalletSummary);
router.get('/history', requireAuth, validatePagination, walletController.getTransactionsHistory);
router.get('/ledger', requireAuth, validatePagination, walletController.getTransactionsHistory);

module.exports = router;
