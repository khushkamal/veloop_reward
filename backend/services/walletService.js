const Wallet = require('../models/Wallet');

class WalletService {
  static async getWallet(userId) {
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
    return wallet;
  }

  static async creditReward(userId, reward, voucherCode, now = new Date()) {
    const existing = await this.getWallet(userId);
    const balanceBefore = reward.rewardType === 'VE' ? existing.veBalance : existing.totalAmazonGCAmount;

    let walletUpdate = {};
    if (reward.rewardType === 'VE') {
      walletUpdate = {
        $inc: {
          veBalance: reward.rewardAmount || reward.amount,
          totalVeEarned: reward.rewardAmount || reward.amount
        }
      };
    } else if (reward.rewardType === 'AMAZON_GC') {
      walletUpdate = {
        $inc: {
          totalAmazonGCAmount: reward.rewardAmount || reward.amount
        },
        $push: {
          amazonVouchers: {
            voucherCode,
            amount: reward.rewardAmount || reward.amount,
            claimedAt: now,
            dayIndex: reward.day,
            status: 'ACTIVE'
          }
        }
      };
    }

    const updatedWallet = await Wallet.findOneAndUpdate({ userId }, walletUpdate, {
      new: true,
      upsert: true
    });

    const balanceAfter = reward.rewardType === 'VE' ? updatedWallet.veBalance : updatedWallet.totalAmazonGCAmount;

    return {
      updatedWallet,
      balanceBefore,
      balanceAfter
    };
  }
}

module.exports = WalletService;
