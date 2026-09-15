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
    const page = req.pagination ? req.pagination.page : 1;
    const limit = req.pagination ? req.pagination.limit : 50;
    const skip = (page - 1) * limit;

    const totalCount = await LedgerTransaction.countDocuments({ userId: req.user._id });
    const transactions = await LedgerTransaction.find({ userId: req.user._id })
      .sort({ claimedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: transactions.length,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit) || 1,
      data: transactions
    });
  } catch (err) {
    next(err);
  }
};
