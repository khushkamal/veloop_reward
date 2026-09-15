const Wallet = require('../models/Wallet');
const LedgerTransaction = require('../models/LedgerTransaction');

exports.getWalletSummary = async (req, res, next) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user._id });
    }

    res.status(200).json({
      success: true,
      data: {
        veBalance: wallet.veBalance,
        totalVeEarned: wallet.totalVeEarned,
        totalAmazonGCAmount: wallet.totalAmazonGCAmount,
        amazonVouchers: wallet.amazonVouchers
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getTransactionsHistory = async (req, res, next) => {
  try {
    const transactions = await LedgerTransaction.find({ userId: req.user._id })
      .sort({ claimedAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    next(err);
  }
};
