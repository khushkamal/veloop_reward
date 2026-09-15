const StreakService = require('../services/streakService');
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
      data: status
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
    const result = await StreakService.claimStreak(req.user._id);
    res.status(200).json({
      success: true,
      message: `Successfully claimed Day ${result.claimedDay} reward!`,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
