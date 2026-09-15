const mongoose = require('mongoose');

const streakConfigSchema = new mongoose.Schema(
  {
    configKey: {
      type: String,
      required: true,
      unique: true,
      default: 'DEFAULT_CONFIG'
    },
    cycleDays: {
      type: Number,
      default: 7
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata'
    },
    resetOnMissedDay: {
      type: Boolean,
      default: true
    },
    isPlatformActive: {
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

module.exports = mongoose.model('StreakConfig', streakConfigSchema);
