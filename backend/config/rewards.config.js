/**
 * VELoop Rewards - 7-Day Streak Reward Ladder Configuration
 * Backend-Authoritative Reward Definition
 */
const DEFAULT_REWARDS = [
  {
    day: 1,
    rewardType: 'VE',
    currency: 'VES',
    amount: 5,
    title: '+5 VEs',
    description: 'Day 1 Starter Reward',
    subtitle: 'Daily check-in reward',
    asset: 'coin',
    assetType: 'coin',
    active: true,
    metadata: { color: '#00e5ff', icon: 'Coins' }
  },
  {
    day: 2,
    rewardType: 'VE',
    currency: 'VES',
    amount: 10,
    title: '+10 VEs',
    description: 'Day 2 Streak Boost',
    subtitle: 'Consecutive day check-in bonus',
    asset: 'coin',
    assetType: 'coin',
    active: true,
    metadata: { color: '#00e5ff', icon: 'Coins' }
  },
  {
    day: 3,
    rewardType: 'VE',
    currency: 'VES',
    amount: 15,
    title: '+15 VEs',
    description: 'Day 3 Streak Boost',
    subtitle: 'Mid-week acceleration bonus',
    asset: 'coin',
    assetType: 'coin',
    active: true,
    metadata: { color: '#00e5ff', icon: 'Coins' }
  },
  {
    day: 4,
    rewardType: 'AMAZON_GC',
    currency: 'INR',
    amount: 1,
    title: '₹1 Amazon Gift Card',
    description: 'Day 4 Amazon Milestone Voucher',
    subtitle: 'Instant redeemable voucher code',
    asset: 'gift_card',
    assetType: 'gift_card',
    active: true,
    metadata: { color: '#ff9900', icon: 'Gift', voucherPrefix: 'AMZN-VEL' }
  },
  {
    day: 5,
    rewardType: 'AMAZON_GC',
    currency: 'INR',
    amount: 2,
    title: '₹2 Amazon Gift Card',
    description: 'Day 5 Amazon Milestone Voucher',
    subtitle: 'Tier-2 voucher reward',
    asset: 'gift_card',
    assetType: 'gift_card',
    active: true,
    metadata: { color: '#ff9900', icon: 'Gift', voucherPrefix: 'AMZN-VEL' }
  },
  {
    day: 6,
    rewardType: 'VE',
    currency: 'VES',
    amount: 30,
    title: '+30 VEs',
    description: 'Day 6 Mega VE Surge',
    subtitle: 'Eve of grand completion reward',
    asset: 'coin',
    assetType: 'coin',
    active: true,
    metadata: { color: '#00e5ff', icon: 'Coins' }
  },
  {
    day: 7,
    rewardType: 'AMAZON_GC',
    currency: 'INR',
    amount: 5,
    title: '₹5 Amazon Gift Card',
    description: 'Day 7 Grand Streak Completion Voucher',
    subtitle: 'Grand 7-Day Cycle completion voucher',
    asset: 'grand_gift_card',
    assetType: 'grand_gift_card',
    active: true,
    metadata: { color: '#ffd700', icon: 'Crown', voucherPrefix: 'AMZN-VEL' }
  }
];

// In-memory runtime cache for high performance
let runtimeRewards = [...DEFAULT_REWARDS];

/**
 * Seed or update the runtime rewards configuration
 */
function setRewardsConfig(newConfig) {
  if (Array.isArray(newConfig) && newConfig.length > 0) {
    runtimeRewards = newConfig;
  }
}

function getRewardsConfig() {
  return runtimeRewards;
}

/**
 * Fetch configuration for a specific day index (1 to 7)
 */
function getRewardForDay(dayNumber) {
  const normalizedDay = ((dayNumber - 1) % 7) + 1;
  const found = runtimeRewards.find((r) => r.day === normalizedDay);
  if (found) {
    return {
      ...found,
      displayName: found.title,
      rewardAmount: found.amount,
      badgeType: found.assetType
    };
  }
  return {
    ...DEFAULT_REWARDS[0],
    displayName: DEFAULT_REWARDS[0].title,
    rewardAmount: DEFAULT_REWARDS[0].amount,
    badgeType: DEFAULT_REWARDS[0].assetType
  };
}

module.exports = {
  REWARD_LADDER: DEFAULT_REWARDS,
  getRewardsConfig,
  setRewardsConfig,
  getRewardForDay,
  TOTAL_DAYS_IN_CYCLE: 7
};
