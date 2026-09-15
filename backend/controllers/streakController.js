const StreakService = require('../services/streakService');
const TransactionService = require('../services/transactionService');
const { getRewardsConfig } = require('../config/rewards.config');

exports.getRewardsConfig = async (req, res, next) => {
  try {
    const config = getRewardsConfig();
    res.status(200).json({
      success: true,
      data: config
    });
  } catch (err) {
    next(err);
  }
};

exports.getStreakStatus = async (req, res, next) => {
  try {
    const status = await StreakService.getStreakStatus(req.user._id);
    res.status(200).json({
      success: true,
      serverTime: status.serverTime,
      streak: status.streak,
      rewards: status.rewards,
      stats: status.stats,
      ultimateReward: status.ultimateReward,
      data: status
    });
  } catch (err) {
    next(err);
  }
};

exports.getStreakStats = async (req, res, next) => {
  try {
    const status = await StreakService.getStreakStatus(req.user._id);
    res.status(200).json({
      success: true,
      data: status.stats
    });
  } catch (err) {
    next(err);
  }
};

exports.getStreakHistory = async (req, res, next) => {
  try {
    const history = await TransactionService.getTransactionHistory(req.user._id, 50);
    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Claim Daily Streak
 * Completely backend authoritative: Client cannot pass day, reward, or amount.
 */
exports.claimDailyReward = async (req, res, next) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const result = await StreakService.claimStreak(req.user._id, ip);
    res.status(200).json({
      success: true,
      message: `Successfully claimed Day ${result.claimedDay} reward!`,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
