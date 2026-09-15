const mongoose = require('mongoose');

const streakRewardSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 7
    },
    rewardType: {
      type: String,
      enum: ['VE', 'AMAZON_GC'],
      required: true
    },
    currency: {
      type: String,
      enum: ['VES', 'INR'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    asset: {
      type: String,
      default: 'coin'
    },
    assetType: {
      type: String,
      enum: ['coin', 'gift_card', 'grand_gift_card'],
      default: 'coin'
    },
    active: {
      type: Boolean,
      default: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('StreakReward', streakRewardSchema);
