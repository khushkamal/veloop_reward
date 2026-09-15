const crypto = require('crypto');
const Streak = require('../models/Streak');
const Wallet = require('../models/Wallet');
const LedgerTransaction = require('../models/LedgerTransaction');
const StreakClaim = require('../models/StreakClaim');
const StreakCycle = require('../models/StreakCycle');
const TimeService = require('./timeService');
const { REWARD_LADDER, getRewardForDay, TOTAL_DAYS_IN_CYCLE } = require('../config/rewards.config');

class StreakService {
  /**
   * Fetch current user streak status and 7-day ladder visualization state.
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
        lastClaimDate: null,
        lastClaimDateString: null,
        totalClaimsCount: 0,
        cycleCount: 0,
        claimHistory: []
      });
    }

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = await Wallet.create({
        userId,
        veBalance: 0,
        totalVeEarned: 0,
        totalAmazonGCAmount: 0,
        amazonVouchers: []
      });
    }

    const lastClaimDate = streak.lastClaimDate;
    const lastClaimStr = streak.lastClaimDateString;
    const currentStreak = streak.currentStreak;

    let canClaim = false;
    let alreadyClaimedToday = false;
    let isStreakBroken = false;
    let nextDayIndex = 1;

    if (!lastClaimDate) {
      // First-time user: eligible to claim Day 1
      canClaim = true;
      alreadyClaimedToday = false;
      isStreakBroken = false;
      nextDayIndex = 1;
    } else if (lastClaimStr === todayStr) {
      // Already claimed today: locked until next midnight
      canClaim = false;
      alreadyClaimedToday = true;
      isStreakBroken = false;
      nextDayIndex = (currentStreak % TOTAL_DAYS_IN_CYCLE) + 1;
    } else {
      const dayDiff = TimeService.getCalendarDayDiff(lastClaimDate, now);

      if (dayDiff === 1) {
        // Consecutive day: eligible to claim next day in sequence
        canClaim = true;
        alreadyClaimedToday = false;
        isStreakBroken = false;
        nextDayIndex = (currentStreak % TOTAL_DAYS_IN_CYCLE) + 1;
      } else if (dayDiff > 1) {
        // Missed day(s): streak broken, will reset to Day 1
        canClaim = true;
        alreadyClaimedToday = false;
        isStreakBroken = true;
        nextDayIndex = 1;
      } else {
        // Edge case / time offset anomaly
        canClaim = false;
        alreadyClaimedToday = true;
        nextDayIndex = (currentStreak % TOTAL_DAYS_IN_CYCLE) + 1;
      }
    }

    // Build the 7-Day Ladder visualization payload
    const streakLadder = REWARD_LADDER.map(item => {
      let status = 'LOCKED'; // 'CLAIMED' | 'AVAILABLE_TODAY' | 'LOCKED'

      let state = 'LOCKED'; // 'LOCKED' | 'AVAILABLE' | 'TODAY' | 'CLAIMED' | 'MISSED'

      if (alreadyClaimedToday) {
        if (item.day === currentStreak) {
          state = 'TODAY'; // Claimed today
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
        rewardAmount: item.amount || item.rewardAmount,
        displayName: item.title || item.displayName,
        shortLabel: item.shortLabel || item.title,
        description: item.description,
        subtitle: item.subtitle,
        asset: item.asset,
        assetType: item.assetType || item.badgeType,
        badgeType: item.badgeType || item.assetType,
        state, // Official 5-state enum
        status: state === 'AVAILABLE' ? 'AVAILABLE_TODAY' : state, // Backwards compatibility
        isNextTarget: item.day === nextDayIndex
      };
    });

    const nextReward = getRewardForDay(nextDayIndex);

    return {
      userId,
      currentStreak,
      longestStreak: streak.longestStreak,
      totalClaimsCount: streak.totalClaimsCount,
      cycleCount: streak.cycleCount,
      lastClaimDate,
      lastClaimDateString: lastClaimStr,
      todayDateString: todayStr,
      canClaim,
      alreadyClaimedToday,
      isStreakBroken,
      nextDayIndex,
      nextReward,
      streakLadder,
      serverTime: now.toISOString(),
      nextClaimAt: midnightInfo.nextMidnight.toISOString(),
      nextClaimAvailableAt: midnightInfo.nextMidnight.toISOString(),
      countdownSeconds: alreadyClaimedToday ? midnightInfo.secondsRemaining : 0,
      wallet: {
        veBalance: wallet.veBalance,
        totalAmazonGCAmount: wallet.totalAmazonGCAmount,
        vouchersCount: wallet.amazonVouchers.length
      },
      devTimeInfo: TimeService.getVirtualOffsetInfo()
    };
  }

  /**
   * Server-authoritative Daily Streak Claim action.
   * Enforces atomic double-claim prevention and concurrent request protection.
   */
  static async claimStreak(userId) {
    const now = TimeService.getNow();
    const todayStr = TimeService.getDateString(now);
    const midnightInfo = TimeService.getNextMidnightInfo(now);

    // 1. Fetch current streak record
    let streak = await Streak.findOne({ userId });
    if (!streak) {
      streak = await Streak.create({
        userId,
        currentStreak: 0,
        longestStreak: 0,
        lastClaimDate: null,
        lastClaimDateString: null,
        totalClaimsCount: 0,
        cycleCount: 0,
        claimHistory: []
      });
    }

    // 2. Strict double-claim check
    if (streak.lastClaimDateString === todayStr) {
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
      } else {
        // Same day protection safeguard
        const err = new Error('Reward already claimed today.');
        err.statusCode = 400;
        err.code = 'ALREADY_CLAIMED_TODAY';
        throw err;
      }
    }

    // 4. Determine exact reward for newStreak
    const reward = getRewardForDay(newStreak);
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
            rewardAmount: reward.rewardAmount,
            displayName: reward.displayName,
            voucherCode
          }
        }
      },
      { new: true }
    );

    if (!updatedStreak) {
      // Concurrent race condition blocked: another request already claimed today
      const err = new Error('Reward claim was already processed.');
      err.statusCode = 409;
      err.code = 'CONCURRENT_CLAIM_PREVENTED';
      throw err;
    }

    // 6. Update Wallet atomically (get previous balance first)
    const existingWallet = (await Wallet.findOne({ userId })) || { veBalance: 0, totalAmazonGCAmount: 0 };
    const balanceBefore = reward.rewardType === 'VE' ? existingWallet.veBalance : existingWallet.totalAmazonGCAmount;

    let walletUpdate = {};
    if (reward.rewardType === 'VE') {
      walletUpdate = {
        $inc: {
          veBalance: reward.rewardAmount,
          totalVeEarned: reward.rewardAmount
        }
      };
    } else if (reward.rewardType === 'AMAZON_GC') {
      walletUpdate = {
        $inc: {
          totalAmazonGCAmount: reward.rewardAmount
        },
        $push: {
          amazonVouchers: {
            voucherCode,
            amount: reward.rewardAmount,
            claimedAt: now,
            dayIndex: newStreak,
            status: 'ACTIVE'
          }
        }
      };
    }

    const updatedWallet = await Wallet.findOneAndUpdate(
      { userId },
      walletUpdate,
      { new: true, upsert: true }
    );

    // 7. Record Traceable Wallet Transaction / Immutable Ledger Entry
    const balanceAfter = reward.rewardType === 'VE' ? updatedWallet.veBalance : updatedWallet.totalAmazonGCAmount;
    const txType = reward.rewardType === 'VE' ? 'DAILY_STREAK_VE' : 'DAILY_STREAK_AMAZON_GC';
    const currency = reward.rewardType === 'VE' ? 'VES' : 'INR';
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const transactionId = `TXN-STREAK-${randomHex}`;
    const referenceId = `STREAK-${newCycleId}-DAY${newStreak}-${randomHex}`;

    const ledgerTx = await LedgerTransaction.create({
      transactionId,
      userId,
      currency,
      type: 'CREDIT',
      transactionType: txType,
      amount: reward.rewardAmount,
      source: 'DAILY_STREAK',
      referenceId,
      streakDay: newStreak,
      dayNumber: newStreak,
      cycleId: newCycleId,
      cycleNumber: newCycleNumber,
      rewardType: reward.rewardType,
      balanceBefore,
      balanceAfter,
      status: 'COMPLETED',
      description: `Claimed Day ${newStreak} Streak Reward (${reward.displayName}) [${newCycleId}]`,
      voucherCode,
      dateString: todayStr
    });

    // 8. Record dedicated StreakClaim entry
    const claimId = `CLM-${randomHex}`;
    await StreakClaim.create({
      claimId,
      userId,
      cycleId: newCycleId,
      cycleNumber: newCycleNumber,
      day: newStreak,
      reward: {
        rewardType: reward.rewardType,
        currency,
        amount: reward.rewardAmount,
        title: reward.displayName,
        voucherCode
      },
      status: 'COMPLETED',
      claimedAt: now,
      transactionId,
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
          totalVeEarned: reward.rewardType === 'VE' ? reward.rewardAmount : 0,
          totalAmazonGCEarned: reward.rewardType === 'AMAZON_GC' ? reward.rewardAmount : 0
        },
        $set: {
          status: newStreak === TOTAL_DAYS_IN_CYCLE ? 'COMPLETED' : 'IN_PROGRESS',
          completedAt: newStreak === TOTAL_DAYS_IN_CYCLE ? now : null
        }
      },
      { upsert: true }
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
      ledgerTransactionId: ledgerTx._id,
      streakStatus: newStatus
    };
  }
}

module.exports = StreakService;
