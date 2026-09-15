const TimeService = require('../services/timeService');
const Streak = require('../models/Streak');
const StreakService = require('../services/streakService');

/**
 * Isolated Evaluator / Simulator Controller
 * Strictly for assignment evaluation and testing.
 */
exports.advanceVirtualDay = async (req, res, next) => {
  try {
    const days = parseInt(req.body.days || 1, 10);
    const info = TimeService.advanceVirtualDays(days);
    const newStatus = await StreakService.getStreakStatus(req.user._id);

    res.status(200).json({
      success: true,
      message: `Advanced virtual clock by ${days} day(s).`,
      timeInfo: info,
      streakStatus: newStatus
    });
  } catch (err) {
    next(err);
  }
};

exports.simulateMissedDay = async (req, res, next) => {
  try {
    // Advancing 2 days ensures dayDiff > 1, triggering streak broken detection
    const info = TimeService.advanceVirtualDays(2);
    const newStatus = await StreakService.getStreakStatus(req.user._id);

    res.status(200).json({
      success: true,
      message: 'Simulated missed day (+48h). Streak is now broken and will reset on next claim.',
      timeInfo: info,
      streakStatus: newStatus
    });
  } catch (err) {
    next(err);
  }
};

exports.resetUserStreak = async (req, res, next) => {
  try {
    await Streak.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          currentStreak: 0,
          longestStreak: 0,
          lastClaimDate: null,
          lastClaimDateString: null,
          totalClaimsCount: 0,
          cycleCount: 0,
          claimHistory: []
        }
      },
      { upsert: true }
    );

    const newStatus = await StreakService.getStreakStatus(req.user._id);

    res.status(200).json({
      success: true,
      message: 'Streak data reset to Day 0.',
      streakStatus: newStatus
    });
  } catch (err) {
    next(err);
  }
};

exports.resetVirtualClock = async (req, res, next) => {
  try {
    const info = TimeService.resetVirtualClock();
    const newStatus = await StreakService.getStreakStatus(req.user._id);

    res.status(200).json({
      success: true,
      message: 'Virtual clock reset to real system time.',
      timeInfo: info,
      streakStatus: newStatus
    });
  } catch (err) {
    next(err);
  }
};

exports.getSimulatorStatus = async (req, res, next) => {
  try {
    const timeInfo = TimeService.getVirtualOffsetInfo();
    res.status(200).json({
      success: true,
      timeInfo
    });
  } catch (err) {
    next(err);
  }
};
