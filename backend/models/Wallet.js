const mongoose = require('mongoose');

const amazonVoucherSchema = new mongoose.Schema(
  {
    voucherCode: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    claimedAt: {
      type: Date,
      default: Date.now
    },
    dayIndex: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'REDEEMED'],
      default: 'ACTIVE'
    }
  },
  { _id: false }
);

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    veBalance: {
      type: Number,
      default: 0,
      min: 0
    },
    totalVeEarned: {
      type: Number,
      default: 0,
      min: 0
    },
    totalAmazonGCAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    amazonVouchers: [amazonVoucherSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Wallet', walletSchema);
