const crypto = require('crypto');
const Streak = require('../models/Streak');
const StreakClaim = require('../models/StreakClaim');
const StreakCycle = require('../models/StreakCycle');
const TimeService = require('./timeService');
const RewardService = require('./rewardService');
const WalletService = require('./walletService');
const TransactionService = require('./transactionService');
const AuditService = require('./auditService');
const { TOTAL_DAYS_IN_CYCLE } = require('../config/rewards.config');

class StreakService {
  /**
   * Helper: Calculate current active day & eligibility based on last claim date
   */
  static calculateCurrentDayAndEligibility(streak, now, todayStr) {
    const lastClaimDate = streak.lastClaimDate;
    const lastClaimStr = streak.lastClaimDateString;
    const currentStreak = streak.currentStreak || 0;

    let canClaim = false;
    let alreadyClaimedToday = false;
    let isStreakBroken = false;
    let nextDayIndex = 1;

    if (!lastClaimDate) {
      // First-time user
      canClaim = true;
      alreadyClaimedToday = false;
      isStreakBroken = false;
      nextDayIndex = 1;
    } else if (lastClaimStr === todayStr) {
      // Already claimed today
      canClaim = false;
      alreadyClaimedToday = true;
      isStreakBroken = false;
      nextDayIndex = (currentStreak % TOTAL_DAYS_IN_CYCLE) + 1;
    } else {
      const dayDiff = TimeService.getCalendarDayDiff(lastClaimDate, now);

      if (dayDiff === 1) {
        // Consecutive claim
        canClaim = true;
        alreadyClaimedToday = false;
        isStreakBroken = false;
        nextDayIndex = (currentStreak % TOTAL_DAYS_IN_CYCLE) + 1;
      } else if (dayDiff > 1) {
        // Missed day(s) -> Streak Broken
        canClaim = true;
        alreadyClaimedToday = false;
        isStreakBroken = true;
        nextDayIndex = 1;
      } else {
        canClaim = false;
        alreadyClaimedToday = true;
        nextDayIndex = (currentStreak % TOTAL_DAYS_IN_CYCLE) + 1;
      }
    }

    return {
      canClaim,
      alreadyClaimedToday,
      isStreakBroken,
      nextDayIndex
    };
  }

  /**
   * Fetch complete user streak status and 7-day ladder visualization state.
   * Completely backend-authoritative.
   */
  static async getStreakStatus(userId) {
    const now = TimeService.getNow();
    const todayStr = TimeService.getDateString(now);
    const midnightInfo = TimeService.getNextMidnightInfo(now);

    let streak = await Streak.findOne({ userId });
    if (!streak) {
      streak = await Streak.create({
        userId,
        currentStreak: 0,
        longestStreak: 0,
        currentCycleId: 'CYC-1',
        cycleNumber: 1,
        lastClaimDate: null,
        lastClaimDateString: null,
        totalClaimsCount: 0,
        cycleCount: 0,
        claimHistory: []
      });
    }

    const wallet = await WalletService.getWallet(userId);
    const { canClaim, alreadyClaimedToday, isStreakBroken, nextDayIndex } =
      this.calculateCurrentDayAndEligibility(streak, now, todayStr);

    const currentStreak = streak.currentStreak || 0;
    const rewardsConfig = RewardService.getRewardsConfig();

    // Build the 7-Day Ladder visualization payload
    const streakLadder = rewardsConfig.map((item) => {
      let state = 'LOCKED'; // 'LOCKED' | 'AVAILABLE' | 'TODAY' | 'CLAIMED' | 'MISSED'

      if (alreadyClaimedToday) {
        if (item.day === currentStreak) {
          state = 'TODAY';
        } else if (item.day < currentStreak) {
          state = 'CLAIMED';
        } else {
          state = 'LOCKED';
        }
      } else if (canClaim) {
        if (isStreakBroken) {
          if (item.day === 1) {
            state = 'AVAILABLE';
          } else if (item.day <= currentStreak) {
            state = 'MISSED';
          } else {
            state = 'LOCKED';
          }
        } else {
          if (item.day <= currentStreak) {
            state = 'CLAIMED';
          } else if (item.day === nextDayIndex) {
            state = 'AVAILABLE';
          } else {
            state = 'LOCKED';
          }
        }
      }

      return {
        day: item.day,
        rewardType: item.rewardType,
        currency: item.currency,
        rewardAmount: item.amount,
        amount: item.amount,
        displayName: item.title,
        title: item.title,
        shortLabel: item.title,
        description: item.description,
        subtitle: item.subtitle,
        asset: item.asset,
        assetType: item.assetType,
        badgeType: item.assetType,
        state,
        status: state === 'AVAILABLE' ? 'AVAILABLE_TODAY' : state,
        nextClaimAt: state === 'LOCKED' ? midnightInfo.nextMidnight.toISOString() : null,
        isNextTarget: item.day === nextDayIndex
      };
    });

    const nextReward = RewardService.getRewardForDay(nextDayIndex);
    const ultimateReward = RewardService.getUltimateReward();
    const checkedInCount = alreadyClaimedToday ? currentStreak : Math.max(0, currentStreak);

    return {
      userId,
      currentStreak,
      longestStreak: streak.longestStreak,
      totalClaimsCount: streak.totalClaimsCount,
      cycleCount: streak.cycleCount,
      cycleId: streak.currentCycleId || 'CYC-1',
      cycleNumber: streak.cycleNumber || 1,
      lastClaimDate: streak.lastClaimDate,
      lastClaimDateString: streak.lastClaimDateString,
      todayDateString: todayStr,
      canClaim,
      alreadyClaimedToday,
      isStreakBroken,
      nextDayIndex,
      nextReward,
      ultimateReward,
      streakLadder,
      rewards: streakLadder, // Recommended alias
      serverTime: now.toISOString(),
      nextClaimAt: midnightInfo.nextMidnight.toISOString(),
      nextClaimAvailableAt: midnightInfo.nextMidnight.toISOString(),
      countdownSeconds: alreadyClaimedToday ? midnightInfo.secondsRemaining : 0,
      streak: {
        currentStreak,
        currentDay: nextDayIndex,
        checkedIn: checkedInCount,
        totalRewards: TOTAL_DAYS_IN_CYCLE,
        status: isStreakBroken ? 'BROKEN' : alreadyClaimedToday ? 'CLAIMED_TODAY' : 'ACTIVE',
        nextClaimAt: midnightInfo.nextMidnight.toISOString(),
        cycleId: streak.currentCycleId || 'CYC-1',
        cycleNumber: streak.cycleNumber || 1
      },
      stats: {
        totalRewards: TOTAL_DAYS_IN_CYCLE,
        checkedIn: checkedInCount,
        nextReward: {
          amount: nextReward.rewardAmount || nextReward.amount,
          currency: nextReward.currency,
          title: nextReward.displayName || nextReward.title
        },
        ultimateReward
      },
      wallet: {
        veBalance: wallet.veBalance,
        totalAmazonGCAmount: wallet.totalAmazonGCAmount,
        vouchersCount: wallet.amazonVouchers.length,
        amazonVouchers: wallet.amazonVouchers
      },
      devTimeInfo: TimeService.getVirtualOffsetInfo()
    };
  }

  /**
   * Server-authoritative Daily Streak Claim action.
   * Enforces atomic double-claim prevention, wallet mutation, ledger tracking, and audit logging.
   */
  static async claimStreak(userId, ipAddress = '127.0.0.1') {
    const now = TimeService.getNow();
    const todayStr = TimeService.getDateString(now);
    const midnightInfo = TimeService.getNextMidnightInfo(now);

    await AuditService.logEvent('STREAK_CLAIM_REQUEST', userId, { time: now, todayStr }, ipAddress);

    // 1. Fetch current streak record
    let streak = await Streak.findOne({ userId });
    if (!streak) {
      streak = await Streak.create({
        userId,
        currentStreak: 0,
        longestStreak: 0,
        currentCycleId: 'CYC-1',
        cycleNumber: 1,
        lastClaimDate: null,
        lastClaimDateString: null,
        totalClaimsCount: 0,
        cycleCount: 0,
        claimHistory: []
      });
    }

    // 2. Strict double-claim check
    if (streak.lastClaimDateString === todayStr) {
      await AuditService.logEvent(
        'DUPLICATE_CLAIM',
        userId,
        { lastClaimDateString: streak.lastClaimDateString, todayStr },
        ipAddress
      );

      const err = new Error('You have already claimed your daily reward today. Come back tomorrow!');
      err.statusCode = 400;
      err.code = 'ALREADY_CLAIMED_TODAY';
      err.countdownSeconds = midnightInfo.secondsRemaining;
      err.nextClaimAvailableAt = midnightInfo.nextMidnight.toISOString();
      throw err;
    }

    // 3. Compute consecutive vs reset day index & cycle ID
    let newStreak = 1;
    let cycleIncrement = 0;
    let newCycleNumber = streak.cycleNumber || 1;
    let newCycleId = streak.currentCycleId || `CYC-1`;

    if (!streak.lastClaimDate) {
      // First claim ever
      newStreak = 1;
      newCycleNumber = 1;
      newCycleId = `CYC-1`;
    } else {
      const dayDiff = TimeService.getCalendarDayDiff(streak.lastClaimDate, now);

      if (dayDiff === 1) {
        // Consecutive claim!
        if (streak.currentStreak === TOTAL_DAYS_IN_CYCLE) {
          // Completed Day 7 cycle! Loop back to Day 1 and start next cycle run
          newStreak = 1;
          cycleIncrement = 1;
          newCycleNumber = (streak.cycleNumber || 1) + 1;
          newCycleId = `CYC-${newCycleNumber}`;
        } else {
          newStreak = streak.currentStreak + 1;
          newCycleNumber = streak.cycleNumber || 1;
          newCycleId = streak.currentCycleId || `CYC-${newCycleNumber}`;
        }
      } else if (dayDiff > 1) {
        // Missed day -> reset to Day 1 and start new cycle run
        newStreak = 1;
        newCycleNumber = (streak.cycleNumber || 1) + 1;
        newCycleId = `CYC-${newCycleNumber}`;

        await AuditService.logEvent(
          'STREAK_RESET',
          userId,
          { previousStreak: streak.currentStreak, newStreak: 1, dayDiff, newCycleId },
          ipAddress
        );
      } else {
        await AuditService.logEvent('INVALID_CLAIM', userId, { reason: 'Same day anomaly' }, ipAddress);

        const err = new Error('Reward already claimed today.');
        err.statusCode = 400;
        err.code = 'ALREADY_CLAIMED_TODAY';
        throw err;
      }
    }

    // 4. Determine exact reward for newStreak from RewardService
    const reward = RewardService.getRewardForDay(newStreak);
    let voucherCode = null;

    if (reward.rewardType === 'AMAZON_GC') {
      const rand1 = crypto.randomBytes(2).toString('hex').toUpperCase();
      const rand2 = crypto.randomBytes(3).toString('hex').toUpperCase();
      voucherCode = `AMZN-VEL-${rand1}-${rand2}`;
    }

    // 5. ATOMIC MongoDB Update with Guard Condition (lastClaimDateString !== todayStr)
    const updatedStreak = await Streak.findOneAndUpdate(
      {
        userId,
        lastClaimDateString: { $ne: todayStr }
      },
      {
        $set: {
          currentStreak: newStreak,
          currentCycleId: newCycleId,
          cycleNumber: newCycleNumber,
          lastClaimDate: now,
          lastClaimDateString: todayStr,
          longestStreak: Math.max(streak.longestStreak, newStreak)
        },
        $inc: {
          totalClaimsCount: 1,
          cycleCount: cycleIncrement
        },
        $push: {
          claimHistory: {
            cycleId: newCycleId,
            cycleNumber: newCycleNumber,
            claimedAt: now,
            dateString: todayStr,
            dayIndex: newStreak,
            rewardType: reward.rewardType,
            rewardAmount: reward.amount || reward.rewardAmount,
            displayName: reward.title || reward.displayName,
            voucherCode
          }
        }
      },
      { new: true }
    );

    if (!updatedStreak) {
      await AuditService.logEvent(
        'STREAK_CLAIM_REJECTED',
        userId,
        { reason: 'Concurrent request collision' },
        ipAddress
      );

      const err = new Error('Reward claim was already processed.');
      err.statusCode = 409;
      err.code = 'CONCURRENT_CLAIM_PREVENTED';
      throw err;
    }

    // 6. Update Wallet atomically via WalletService
    const { updatedWallet, balanceBefore, balanceAfter } = await WalletService.creditReward(
      userId,
      reward,
      voucherCode,
      now
    );

    // 7. Record Traceable Wallet Transaction / Immutable Ledger Entry via TransactionService
    const ledgerTx = await TransactionService.recordStreakTransaction({
      userId,
      cycleId: newCycleId,
      cycleNumber: newCycleNumber,
      dayNumber: newStreak,
      reward,
      voucherCode,
      balanceBefore,
      balanceAfter,
      dateString: todayStr,
      now
    });

    // 8. Record dedicated StreakClaim entry
    const claimId = `CLM-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    await StreakClaim.create({
      claimId,
      userId,
      cycleId: newCycleId,
      cycleNumber: newCycleNumber,
      day: newStreak,
      reward: {
        rewardType: reward.rewardType,
        currency: reward.currency,
        amount: reward.amount || reward.rewardAmount,
        title: reward.title || reward.displayName,
        voucherCode
      },
      status: 'COMPLETED',
      claimedAt: now,
      transactionId: ledgerTx.transactionId,
      dateString: todayStr
    });

    // 9. Update StreakCycle document
    await StreakCycle.findOneAndUpdate(
      { userId, cycleId: newCycleId },
      {
        $setOnInsert: {
          startedAt: now,
          cycleNumber: newCycleNumber
        },
        $addToSet: { completedDays: newStreak },
        $inc: {
          totalVeEarned: reward.rewardType === 'VE' ? reward.amount || reward.rewardAmount : 0,
          totalAmazonGCEarned: reward.rewardType === 'AMAZON_GC' ? reward.amount || reward.rewardAmount : 0
        },
        $set: {
          status: newStreak === TOTAL_DAYS_IN_CYCLE ? 'COMPLETED' : 'IN_PROGRESS',
          completedAt: newStreak === TOTAL_DAYS_IN_CYCLE ? now : null
        }
      },
      { upsert: true }
    );

    // Log success in audit trail
    await AuditService.logEvent(
      'STREAK_CLAIM_SUCCESS',
      userId,
      {
        claimedDay: newStreak,
        cycleId: newCycleId,
        reward: reward.title || reward.displayName,
        transactionId: ledgerTx.transactionId,
        balanceAfter
      },
      ipAddress
    );

    // 10. Return fresh status
    const newStatus = await this.getStreakStatus(userId);

    return {
      success: true,
      claimedDay: newStreak,
      reward: {
        ...reward,
        voucherCode
      },
      streak: {
        currentStreak: updatedStreak.currentStreak,
        longestStreak: updatedStreak.longestStreak,
        totalClaimsCount: updatedStreak.totalClaimsCount
      },
      wallet: {
        veBalance: updatedWallet.veBalance,
        totalAmazonGCAmount: updatedWallet.totalAmazonGCAmount,
        vouchers: updatedWallet.amazonVouchers
      },
      transactionId: ledgerTx.transactionId,
      referenceId: ledgerTx.referenceId,
      ledgerTransactionId: ledgerTx._id,
      streakStatus: newStatus
    };
  }
}

module.exports = StreakService;
