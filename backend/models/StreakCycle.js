const mongoose = require('mongoose');

const streakCycleSchema = new mongoose.Schema(
  {
    cycleId: {
      type: String,
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    cycleNumber: {
      type: Number,
      required: true,
      default: 1
    },
    status: {
      type: String,
      enum: ['IN_PROGRESS', 'COMPLETED', 'BROKEN'],
      default: 'IN_PROGRESS'
    },
    completedDays: {
      type: [Number],
      default: []
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date,
      default: null
    },
    totalVeEarned: {
      type: Number,
      default: 0
    },
    totalAmazonGCEarned: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

streakCycleSchema.index({ userId: 1, cycleId: 1 }, { unique: true });

module.exports = mongoose.model('StreakCycle', streakCycleSchema);
