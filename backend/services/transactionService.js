const crypto = require('crypto');
const LedgerTransaction = require('../models/LedgerTransaction');

class TransactionService {
  /**
   * Record a traceable streak claim transaction in the double-entry ledger
   */
  static async recordStreakTransaction({
    userId,
    cycleId,
    cycleNumber,
    dayNumber,
    reward,
    voucherCode,
    balanceBefore,
    balanceAfter,
    dateString,
    now = new Date()
  }) {
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const transactionId = `TXN-STREAK-${randomHex}`;
    const referenceId = `STREAK-${cycleId}-DAY${dayNumber}-${randomHex}`;
    const txType = reward.rewardType === 'VE' ? 'DAILY_STREAK_VE' : 'DAILY_STREAK_AMAZON_GC';
    const currency = reward.currency || (reward.rewardType === 'VE' ? 'VES' : 'INR');
    const amount = reward.rewardAmount || reward.amount;

    return await LedgerTransaction.create({
      transactionId,
      userId,
      currency,
      type: 'CREDIT',
      transactionType: txType,
      amount,
      source: 'DAILY_STREAK',
      referenceId,
      streakDay: dayNumber,
      dayNumber,
      cycleId,
      cycleNumber,
      rewardType: reward.rewardType,
      balanceBefore,
      balanceAfter,
      status: 'COMPLETED',
      description: `Claimed Day ${dayNumber} Streak Reward (${reward.title || reward.displayName}) [${cycleId}]`,
      voucherCode,
      dateString,
      createdAt: now
    });
  }

  static async getTransactionHistory(userId, limit = 50) {
    return await LedgerTransaction.find({ userId }).sort({ createdAt: -1 }).limit(limit);
  }
}

module.exports = TransactionService;
