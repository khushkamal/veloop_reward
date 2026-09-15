const mongoose = require('mongoose');

const streakHistoryItemSchema = new mongoose.Schema(
  {
    cycleId: { type: String, required: true },
    cycleNumber: { type: Number, required: true, default: 1 },
    claimedAt: { type: Date, default: Date.now },
    dateString: { type: String, required: true },
    dayIndex: { type: Number, required: true },
    rewardType: { type: String, enum: ['VE', 'AMAZON_GC'], required: true },
    rewardAmount: { type: Number, required: true },
    displayName: { type: String, required: true },
    voucherCode: { type: String, default: null }
  },
  { _id: false }
);

const streakSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    currentCycleId: {
      type: String,
      default: 'CYC-1'
    },
    cycleNumber: {
      type: Number,
      default: 1
    },
    currentStreak: {
      type: Number,
      default: 0,
      min: 0,
      max: 7
    },
    longestStreak: {
      type: Number,
      default: 0,
      min: 0
    },
    lastClaimDate: {
      type: Date,
      default: null
    },
    lastClaimDateString: {
      type: String,
      default: null,
      index: true
    },
    totalClaimsCount: {
      type: Number,
      default: 0
    },
    cycleCount: {
      type: Number,
      default: 0
    },
    claimHistory: [streakHistoryItemSchema]
  },
  {
    timestamps: true
  }
);

// Compound index for querying user streak status efficiently
streakSchema.index({ userId: 1, lastClaimDateString: 1 });

module.exports = mongoose.model('Streak', streakSchema);
