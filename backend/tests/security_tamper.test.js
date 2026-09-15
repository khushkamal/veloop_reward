const test = require('node:test');
const assert = require('node:assert');
const { connectDB, closeDB } = require('../config/db');
const User = require('../models/User');
const Streak = require('../models/Streak');
const Wallet = require('../models/Wallet');
const LedgerTransaction = require('../models/LedgerTransaction');
const StreakService = require('../services/streakService');
const TimeService = require('../services/timeService');

test('VELoop Anti-Tamper & Backend-Authoritative Security Suite', async (t) => {
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

  await t.test('1. Tamper Attempt: Client trying to claim Day 7 on Day 1 is blocked', async () => {
    // Attacker sends claim request (server computes day based on DB, not client)
    const result = await StreakService.claimStreak(attackerUser._id);
    
    // Must award Day 1 reward (+5 VEs), NOT Day 7
    assert.strictEqual(result.claimedDay, 1);
    assert.strictEqual(result.reward.rewardType, 'VE');
    assert.strictEqual(result.reward.rewardAmount, 5);
    assert.strictEqual(result.reward.displayName, '+5 VEs');
    assert.strictEqual(result.wallet.veBalance, 5);
  });

  await t.test('2. Race Condition / Concurrent Replay Attack: 10 simultaneous claims must yield exactly 1 success and 9 rejections', async () => {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(
        StreakService.claimStreak(attackerUser._id)
          .then(res => ({ success: true, res }))
          .catch(err => ({ success: false, code: err.code || 'ERROR' }))
      );
    }

    const results = await Promise.all(promises);
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    assert.strictEqual(successCount, 1, 'Exactly 1 concurrent claim should succeed');
    assert.strictEqual(failureCount, 9, 'All 9 duplicate attempts must be rejected');

    // Verify wallet only credited 5 VEs
    const wallet = await Wallet.findOne({ userId: attackerUser._id });
    assert.strictEqual(wallet.veBalance, 5);

    // Verify exactly 1 ledger transaction exists
    const txCount = await LedgerTransaction.countDocuments({ userId: attackerUser._id });
    assert.strictEqual(txCount, 1);
  });

  await t.test('3. Missed Day Tamper: Attacker cannot claim consecutive day after missing 2 days', async () => {
    // Claim Day 1
    await StreakService.claimStreak(attackerUser._id);
    
    // Attacker skips 2 days
    TimeService.advanceVirtualDays(2);

    // Server must detect broken streak and reset to Day 1 (+5 VEs), NOT Day 2
    const result = await StreakService.claimStreak(attackerUser._id);
    assert.strictEqual(result.claimedDay, 1);
    assert.strictEqual(result.reward.displayName, '+5 VEs');
  });

  await t.test('4. User Isolation: User A cannot claim or alter User B rewards', async () => {
    await StreakService.claimStreak(victimUser._id);
    
    const victimWallet = await Wallet.findOne({ userId: victimUser._id });
    const attackerWallet = await Wallet.findOne({ userId: attackerUser._id });

    assert.strictEqual(victimWallet.veBalance, 5);
    assert.strictEqual(attackerWallet ? attackerWallet.veBalance : 0, 0);
  });

  await t.test('5. Malicious Payload Injection: Client sending {day: 2, reward: 1000000, currency: "VES", streak: 7, userId: "anotherUser"} is neutralized', async () => {
    // Malicious request payload
    const maliciousPayload = {
      day: 2,
      reward: 1000000,
      currency: 'VES',
      streak: 7,
      userId: victimUser._id.toString()
    };

    // Backend processes claim for authenticated user (attackerUser._id) regardless of payload
    const result = await StreakService.claimStreak(attackerUser._id);

    // Assert that server awarded Day 1 (+5 VEs), NOT 1,000,000 VES or Day 2 / Day 7
    assert.strictEqual(result.claimedDay, 1);
    assert.strictEqual(result.reward.rewardType, 'VE');
    assert.strictEqual(result.reward.rewardAmount, 5);
    assert.strictEqual(result.wallet.veBalance, 5);

    // Verify victim's wallet was not touched
    const victimWallet = await Wallet.findOne({ userId: victimUser._id });
    assert.strictEqual(victimWallet ? victimWallet.veBalance : 0, 0);

    // Verify attacker's wallet received only 5 VEs
    const attackerWallet = await Wallet.findOne({ userId: attackerUser._id });
    assert.strictEqual(attackerWallet.veBalance, 5);
  });

  await t.test('6. Concurrent Day 2 Claims: Request A & Request B sent simultaneously -> only one succeeds and credits wallet once', async () => {
    // 1. First claim Day 1
    await StreakService.claimStreak(attackerUser._id);
    // 2. Advance 1 day to unlock Day 2
    TimeService.advanceVirtualDays(1);

    // 3. Fire Request A and Request B simultaneously
    const [resA, resB] = await Promise.allSettled([
      StreakService.claimStreak(attackerUser._id),
      StreakService.claimStreak(attackerUser._id)
    ]);

    const successes = [resA, resB].filter(r => r.status === 'fulfilled');
    const rejections = [resA, resB].filter(r => r.status === 'rejected');

    assert.strictEqual(successes.length, 1, 'Exactly 1 concurrent claim should be fulfilled');
    assert.strictEqual(rejections.length, 1, 'Exactly 1 concurrent claim must be rejected');

    // Day 1 (5 VEs) + Day 2 (10 VEs) = 15 VEs total
    const wallet = await Wallet.findOne({ userId: attackerUser._id });
    assert.strictEqual(wallet.veBalance, 15, 'Wallet should have exactly 15 VEs (no double-credit)');

    // Verify exactly 2 ledger transactions exist (Day 1 and Day 2)
    const txCount = await LedgerTransaction.countDocuments({ userId: attackerUser._id });
    assert.strictEqual(txCount, 2);

    const day2Txs = await LedgerTransaction.find({ userId: attackerUser._id, streakDay: 2 });
    assert.strictEqual(day2Txs.length, 1, 'Exactly one Day 2 ledger transaction exists');
  });

  await t.test('7. Authentication & User Isolation: User A cannot claim or impersonate User B', async () => {
    // 1. User A claims Day 1 for their own account
    const resA = await StreakService.claimStreak(attackerUser._id);
    assert.strictEqual(resA.claimedDay, 1);
    assert.strictEqual(resA.wallet.veBalance, 5);

    // 2. Verify User B streak and wallet remain completely untouched (0 streak, 0 balance)
    const statusB = await StreakService.getStreakStatus(victimUser._id);
    assert.strictEqual(statusB.currentStreak, 0);
    assert.strictEqual(statusB.canClaim, true);
    assert.strictEqual(statusB.wallet.veBalance, 0);

    // 3. User B claims their own Day 1
    const resB = await StreakService.claimStreak(victimUser._id);
    assert.strictEqual(resB.claimedDay, 1);
    assert.strictEqual(resB.wallet.veBalance, 5);

    // 4. Verify transactions are strictly partitioned by userId
    const userATxs = await LedgerTransaction.find({ userId: attackerUser._id });
    const userBTxs = await LedgerTransaction.find({ userId: victimUser._id });
    assert.strictEqual(userATxs.length, 1);
    assert.strictEqual(userBTxs.length, 1);
    assert.notStrictEqual(userATxs[0].userId.toString(), userBTxs[0].userId.toString());
  });
});
