const mongoose = require('mongoose');

const ledgerTransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    currency: {
      type: String,
      enum: ['VES', 'INR'],
      required: true
    },
    type: {
      type: String,
      enum: ['CREDIT', 'DEBIT', 'DAILY_STREAK_VE', 'DAILY_STREAK_AMAZON_GC'],
      default: 'CREDIT'
    },
    transactionType: {
      type: String,
      enum: ['DAILY_STREAK_VE', 'DAILY_STREAK_AMAZON_GC'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    source: {
      type: String,
      enum: ['DAILY_STREAK', 'REWARD_REDEMPTION', 'BONUS'],
      default: 'DAILY_STREAK'
    },
    referenceId: {
      type: String,
      required: true,
      index: true
    },
    streakDay: {
      type: Number,
      required: true,
      min: 1,
      max: 7
    },
    dayNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 7
    },
    cycleId: {
      type: String,
      required: true
    },
    cycleNumber: {
      type: Number,
      required: true,
      default: 1
    },
    rewardType: {
      type: String,
      enum: ['VE', 'AMAZON_GC'],
      required: true
    },
    balanceBefore: {
      type: Number,
      required: true,
      default: 0
    },
    balanceAfter: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['COMPLETED', 'PENDING', 'FAILED'],
      default: 'COMPLETED'
    },
    description: {
      type: String,
      required: true
    },
    voucherCode: {
      type: String,
      default: null
    },
    dateString: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false }
  }
);

// Unique compound indexes for strict idempotency and concurrency protection
ledgerTransactionSchema.index({ userId: 1, cycleId: 1, streakDay: 1 }, { unique: true });
ledgerTransactionSchema.index({ userId: 1, dateString: 1 }, { unique: true });

module.exports = mongoose.model('LedgerTransaction', ledgerTransactionSchema);
