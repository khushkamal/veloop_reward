const mongoose = require('mongoose');

const streakClaimSchema = new mongoose.Schema(
  {
    claimId: {
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
    cycleId: {
      type: String,
      required: true,
      index: true
    },
    cycleNumber: {
      type: Number,
      required: true,
      default: 1
    },
    day: {
      type: Number,
      required: true,
      min: 1,
      max: 7
    },
    reward: {
      rewardType: { type: String, enum: ['VE', 'AMAZON_GC'], required: true },
      currency: { type: String, enum: ['VES', 'INR'], required: true },
      amount: { type: Number, required: true },
      title: { type: String, required: true },
      voucherCode: { type: String, default: null }
    },
    status: {
      type: String,
      enum: ['CLAIMED', 'COMPLETED'],
      default: 'COMPLETED'
    },
    claimedAt: {
      type: Date,
      default: Date.now
    },
    transactionId: {
      type: String,
      required: true,
      index: true
    },
    dateString: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index to guarantee uniqueness per user, cycle, and day
streakClaimSchema.index({ userId: 1, cycleId: 1, day: 1 }, { unique: true });
streakClaimSchema.index({ userId: 1, dateString: 1 }, { unique: true });

module.exports = mongoose.model('StreakClaim', streakClaimSchema);
