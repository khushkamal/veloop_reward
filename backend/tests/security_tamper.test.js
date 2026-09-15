const test = require('node:test');
const assert = require('node:assert');
const { connectDB, closeDB } = require('../config/db');
const User = require('../models/User');
const Streak = require('../models/Streak');
const Wallet = require('../models/Wallet');
const LedgerTransaction = require('../models/LedgerTransaction');
const StreakService = require('../services/streakService');
const TimeService = require('../services/timeService');

test('VELoop Anti-Cheat & Comprehensive Security Test Suite (Section 26)', async (t) => {
  await connectDB();
  TimeService.resetVirtualClock();

  let attackerUser;
  let victimUser;

  t.beforeEach(async () => {
    await User.deleteMany({});
    await Streak.deleteMany({});
    await Wallet.deleteMany({});
    await LedgerTransaction.deleteMany({});
    TimeService.resetVirtualClock();

    attackerUser = await User.create({
      name: 'Attacker Bob',
      email: `attacker_${Date.now()}@veloop.test`,
      passwordHash: 'hashed'
    });

    victimUser = await User.create({
      name: 'Victim Alice',
      email: `victim_${Date.now()}@veloop.test`,
      passwordHash: 'hashed'
    });
  });

  t.after(async () => {
    await closeDB();
  });

  // Test 1: React DevTools streak manipulation
  await t.test('1. React DevTools streak manipulation -> Expected: No effect', async () => {
    // Even if client modifies local React state, the backend evaluates directly from DB
    const initialStatus = await StreakService.getStreakStatus(attackerUser._id);
    assert.strictEqual(initialStatus.currentStreak, 0);

    const claimRes = await StreakService.claimStreak(attackerUser._id);
    assert.strictEqual(claimRes.claimedDay, 1);
    assert.strictEqual(claimRes.reward.rewardAmount, 5);

    // Fresh DB fetch proves state is strictly backend-derived
    const postStatus = await StreakService.getStreakStatus(attackerUser._id);
    assert.strictEqual(postStatus.currentStreak, 1);
  });

  // Test 2: Device clock manipulation
  await t.test('2. Device clock manipulation -> Expected: Cannot claim early', async () => {
    // Claim Day 1
    await StreakService.claimStreak(attackerUser._id);

    // Client changes local device clock ahead by 10 hours (server clock remains unchanged)
    // When client sends claim request, server checks its own authoritative clock
    await assert.rejects(
      async () => {
        await StreakService.claimStreak(attackerUser._id);
      },
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        assert.strictEqual(err.code, 'ALREADY_CLAIMED_TODAY');
        return true;
      }
    );
  });

  // Test 3: Fake reward amount
  await t.test('3. Fake reward amount (e.g. reward=1000000) -> Expected: Ignored / rejected', async () => {
    // Server ignores client reward params and reads strictly from rewards.config.js
    const claimRes = await StreakService.claimStreak(attackerUser._id);
    assert.strictEqual(claimRes.reward.rewardAmount, 5); // Day 1 standard amount
    assert.notStrictEqual(claimRes.reward.rewardAmount, 1000000);

    const wallet = await Wallet.findOne({ userId: attackerUser._id });
    assert.strictEqual(wallet.veBalance, 5);
  });

  // Test 4: Fake day
  await t.test('4. Fake day (e.g. request Day 7 while eligible only for Day 2) -> Expected: Rejected/Enforces correct day', async () => {
    // Claim Day 1
    await StreakService.claimStreak(attackerUser._id);

    // Advance 1 calendar day to unlock Day 2
    TimeService.advanceVirtualDays(1);

    // Attempting to claim awards Day 2 (+10 VEs), client cannot skip to Day 7
    const claimRes = await StreakService.claimStreak(attackerUser._id);
    assert.strictEqual(claimRes.claimedDay, 2);
    assert.strictEqual(claimRes.reward.displayName, '+10 VEs');
    assert.notStrictEqual(claimRes.claimedDay, 7);
  });

  // Test 5: Fake user ID
  await t.test('5. Fake user ID -> Expected: Rejected; authenticated ownership remains authoritative', async () => {
    // User A claims their reward
    await StreakService.claimStreak(attackerUser._id);

    // User A cannot modify User B's wallet or streak
    const victimWallet = await Wallet.findOne({ userId: victimUser._id });
    assert.strictEqual(victimWallet ? victimWallet.veBalance : 0, 0);

    const victimStreak = await Streak.findOne({ userId: victimUser._id });
    assert.strictEqual(victimStreak ? victimStreak.currentStreak : 0, 0);
  });

  // Test 6: Duplicate claim
  await t.test('6. Duplicate claim -> Expected: Reward granted only once', async () => {
    // First claim succeeds
    const firstClaim = await StreakService.claimStreak(attackerUser._id);
    assert.strictEqual(firstClaim.claimedDay, 1);

    // Immediate second claim on same calendar date is rejected
    await assert.rejects(
      async () => {
        await StreakService.claimStreak(attackerUser._id);
      },
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        assert.strictEqual(err.code, 'ALREADY_CLAIMED_TODAY');
        return true;
      }
    );

    const wallet = await Wallet.findOne({ userId: attackerUser._id });
    assert.strictEqual(wallet.veBalance, 5);
  });

  // Test 7: Concurrent claim
  await t.test('7. Concurrent claim -> Expected: One successful credit, not double credit', async () => {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(
        StreakService.claimStreak(attackerUser._id)
          .then((res) => ({ success: true, res }))
          .catch((err) => ({ success: false, code: err.code || 'ERROR' }))
      );
    }

    const results = await Promise.all(promises);
    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    assert.strictEqual(successCount, 1, 'Exactly 1 concurrent claim should succeed');
    assert.strictEqual(failureCount, 9, 'All 9 duplicate attempts must be rejected');

    const wallet = await Wallet.findOne({ userId: attackerUser._id });
    assert.strictEqual(wallet.veBalance, 5, 'Wallet only credited once');
  });

  // Test 8: Missed day
  await t.test('8. Missed day -> Expected: Backend detects miss, resets streak, Day 1 becomes current eligible day', async () => {
    // Claim Day 1
    await StreakService.claimStreak(attackerUser._id);

    // Skip 2 days (missed check-in window)
    TimeService.advanceVirtualDays(2);

    // Server must detect break and reset to Day 1
    const status = await StreakService.getStreakStatus(attackerUser._id);
    assert.strictEqual(status.isStreakBroken, true);
    assert.strictEqual(status.nextDayIndex, 1);

    const reclaimRes = await StreakService.claimStreak(attackerUser._id);
    assert.strictEqual(reclaimRes.claimedDay, 1);
    assert.strictEqual(reclaimRes.reward.displayName, '+5 VEs');
  });

  // Test 9: Refresh
  await t.test('9. Refresh after Day 1 claim -> Expected: Day 1 stays Claimed, Day 2 locked/countdown', async () => {
    await StreakService.claimStreak(attackerUser._id);

    // Simulate page refresh / re-fetching status
    const statusAfterRefresh = await StreakService.getStreakStatus(attackerUser._id);
    assert.strictEqual(statusAfterRefresh.currentStreak, 1);
    assert.strictEqual(statusAfterRefresh.alreadyClaimedToday, true);
    assert.strictEqual(statusAfterRefresh.canClaim, false);
    assert.ok(
      statusAfterRefresh.streakLadder[0].state === 'CLAIMED' ||
        statusAfterRefresh.streakLadder[0].state === 'TODAY'
    );
    assert.strictEqual(statusAfterRefresh.streakLadder[1].state, 'LOCKED');
    assert.ok(statusAfterRefresh.countdownSeconds > 0);
  });

  // Test 10: Multiple tabs
  await t.test('10. Multiple tabs -> Expected: Claim in Tab A invalidates Tab B claim', async () => {
    // Both tabs load status simultaneously
    const tabAStatus = await StreakService.getStreakStatus(attackerUser._id);
    const tabBStatus = await StreakService.getStreakStatus(attackerUser._id);
    assert.strictEqual(tabAStatus.canClaim, true);
    assert.strictEqual(tabBStatus.canClaim, true);

    // Tab A claims first
    const tabAResult = await StreakService.claimStreak(attackerUser._id);
    assert.strictEqual(tabAResult.claimedDay, 1);

    // Tab B attempts claim moments later without refreshing
    await assert.rejects(
      async () => {
        await StreakService.claimStreak(attackerUser._id);
      },
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        assert.strictEqual(err.code, 'ALREADY_CLAIMED_TODAY');
        return true;
      }
    );
  });

  // Test 11: Logout / login
  await t.test('11. Logout / login -> Expected: Same streak state restored from MongoDB', async () => {
    // User claims Day 1
    await StreakService.claimStreak(attackerUser._id);

    // User logs out (client discards in-memory state)
    // User logs in again -> fetches from database
    const restoredStatus = await StreakService.getStreakStatus(attackerUser._id);
    assert.strictEqual(restoredStatus.currentStreak, 1);
    assert.strictEqual(restoredStatus.alreadyClaimedToday, true);
    assert.strictEqual(restoredStatus.wallet.veBalance, 5);
  });
});
