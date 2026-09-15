const { getRewardsConfig, getRewardForDay, TOTAL_DAYS_IN_CYCLE } = require('../config/rewards.config');

class RewardService {
  static getRewardsConfig() {
    return getRewardsConfig();
  }

  static getRewardForDay(dayNumber) {
    return getRewardForDay(dayNumber);
  }

  static getTotalRewardsCount() {
    return TOTAL_DAYS_IN_CYCLE;
  }

  /**
   * Returns the large Ultimate Reward featured at the culmination of the streak cycle
   */
  static getUltimateReward() {
    const rewards = getRewardsConfig();
    const grand = rewards.find((r) => r.day === TOTAL_DAYS_IN_CYCLE) || rewards[rewards.length - 1];
    return {
      day: grand.day,
      unlockDay: grand.day,
      rewardType: grand.rewardType,
      currency: grand.currency,
      amount: grand.amount,
      title: grand.title || grand.displayName,
      subtitle: grand.subtitle || 'Grand 7-Day Cycle Completion Prize',
      description: grand.description,
      assetType: grand.assetType || 'grand_gift_card',
      active: true,
      metadata: grand.metadata || {}
    };
  }
}

module.exports = RewardService;
