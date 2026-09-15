const test = require('node:test');
const assert = require('node:assert');
const { connectDB, closeDB } = require('../config/db');
const User = require('../models/User');
const Streak = require('../models/Streak');
const Wallet = require('../models/Wallet');
const LedgerTransaction = require('../models/LedgerTransaction');
const StreakService = require('../services/streakService');
const TimeService = require('../services/timeService');

test('VELoop Daily Streak Engine Test Suite', async (t) => {
  await connectDB();
  TimeService.resetVirtualClock();

  let testUser;

  t.beforeEach(async () => {
    // Clear collections
    await User.deleteMany({});
    await Streak.deleteMany({});
    await Wallet.deleteMany({});
    await LedgerTransaction.deleteMany({});
    TimeService.resetVirtualClock();

    testUser = await User.create({
      name: 'Test Tester',
      email: `test_${Date.now()}@veloop.test`,
      passwordHash: 'dummy'
    });
  });

  t.after(async () => {
    await closeDB();
  });

  await t.test('1. First-time user: Day 1 should be available and claimable for +5 VEs', async () => {
    const status = await StreakService.getStreakStatus(testUser._id);
    assert.strictEqual(status.currentStreak, 0);
    assert.strictEqual(status.canClaim, true);
    assert.strictEqual(status.nextDayIndex, 1);
    assert.strictEqual(status.alreadyClaimedToday, false);

    // Claim Day 1
    const claimRes = await StreakService.claimStreak(testUser._id);
    assert.strictEqual(claimRes.claimedDay, 1);
    assert.strictEqual(claimRes.reward.rewardType, 'VE');
    assert.strictEqual(claimRes.reward.rewardAmount, 5);
    assert.strictEqual(claimRes.wallet.veBalance, 5);

    // Verify ledger entry
    const ledger = await LedgerTransaction.findOne({ userId: testUser._id });
    assert.ok(ledger);
    assert.strictEqual(ledger.amount, 5);
    assert.strictEqual(ledger.rewardType, 'VE');
  });

  await t.test('2. Double Claim Prevention: Same-day second claim must be rejected', async () => {
    await StreakService.claimStreak(testUser._id);

    // Attempt 2nd claim immediately
    await assert.rejects(
      async () => {
        await StreakService.claimStreak(testUser._id);
      },
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        assert.strictEqual(err.code, 'ALREADY_CLAIMED_TODAY');
        return true;
      }
    );
  });

  await t.test('3. Consecutive Progression: 7-Day Cycle verification', async () => {
    // Expected rewards mapping:
    const expected = [
      { day: 1, type: 'VE', amount: 5 },
      { day: 2, type: 'VE', amount: 10 },
      { day: 3, type: 'VE', amount: 15 },
      { day: 4, type: 'AMAZON_GC', amount: 1 },
      { day: 5, type: 'AMAZON_GC', amount: 2 },
      { day: 6, type: 'VE', amount: 30 },
      { day: 7, type: 'AMAZON_GC', amount: 5 }
    ];

    for (let i = 0; i < 7; i++) {
      if (i > 0) {
        // Fast-forward 1 day
        TimeService.advanceVirtualDays(1);
      }

      const status = await StreakService.getStreakStatus(testUser._id);
      assert.strictEqual(status.canClaim, true, `Should be able to claim day ${i + 1}`);
      assert.strictEqual(status.nextDayIndex, i + 1);

      const claim = await StreakService.claimStreak(testUser._id);
      assert.strictEqual(claim.claimedDay, expected[i].day);
      assert.strictEqual(claim.reward.rewardType, expected[i].type);
      assert.strictEqual(claim.reward.rewardAmount, expected[i].amount);

      if (expected[i].type === 'AMAZON_GC') {
        assert.ok(claim.reward.voucherCode.startsWith('AMZN-VEL-'));
      }
    }

    // Advance 1 more day: Day 8 should cycle back to Day 1
    TimeService.advanceVirtualDays(1);
    const day8Status = await StreakService.getStreakStatus(testUser._id);
    assert.strictEqual(day8Status.canClaim, true);
    assert.strictEqual(day8Status.nextDayIndex, 1);

    const day8Claim = await StreakService.claimStreak(testUser._id);
    assert.strictEqual(day8Claim.claimedDay, 1);
    assert.strictEqual(day8Claim.reward.rewardAmount, 5);
  });

  await t.test('4. Missed Day Detection: Skipping 2 days resets streak back to Day 1', async () => {
    // Claim Day 1
    await StreakService.claimStreak(testUser._id);
    // Advance 1 day and claim Day 2
    TimeService.advanceVirtualDays(1);
    await StreakService.claimStreak(testUser._id);

    // Skip 2 days (missed day)
    TimeService.advanceVirtualDays(2);

    const status = await StreakService.getStreakStatus(testUser._id);
    assert.strictEqual(status.canClaim, true);
    assert.strictEqual(status.isStreakBroken, true);
    assert.strictEqual(status.nextDayIndex, 1);

    const claim = await StreakService.claimStreak(testUser._id);
    assert.strictEqual(claim.claimedDay, 1);
    assert.strictEqual(claim.reward.rewardAmount, 5);
  });
});
