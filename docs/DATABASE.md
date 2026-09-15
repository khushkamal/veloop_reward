# VELoop Rewards - Database Schema & Integrity Architecture

This document outlines the MongoDB schema design, relationships, indexing strategies, and double-entry ledger mechanisms.

---

## 1. Entity-Relationship Model (ERD)

```text
┌─────────────────┐       1:1       ┌──────────────────┐
│      User       ├─────────────────┤      Wallet      │
└────────┬────────┘                 └────────┬─────────┘
         │ 1:1                               │ 1:N
         │                                   │
┌────────┴────────┐       1:N       ┌────────┴─────────┐
│     Streak      ├─────────────────┤ LedgerTransaction│
└────────┬────────┘                 └──────────────────┘
         │ 1:N
┌────────┴────────┐       N:1       ┌──────────────────┐
│   StreakClaim   ├─────────────────┤   StreakReward   │
└─────────────────┘                 └──────────────────┘
```

---

## 2. Collection Schemas & Indexes

### 2.1 `users`
- **Fields**:
  - `_id`: ObjectId
  - `name`: String
  - `email`: String (Unique index)
  - `passwordHash`: String (bcrypt salt 10)
  - `avatar`: String (Dicebear avatar URL)
  - `role`: String (`'user'` | `'evaluator'` | `'admin'`)
  - `createdAt`: Date

### 2.2 `wallets`
- **Fields**:
  - `userId`: ObjectId (Unique index $\rightarrow$ `users._id`)
  - `veBalance`: Number (Current VEs points)
  - `totalVeEarned`: Number (Lifetime cumulative VEs)
  - `totalAmazonGCAmount`: Number (Total ₹ amount won in Amazon GCs)
  - `amazonVouchers`: Array of `{ voucherCode, amount, dayIndex, claimedAt, status }`
- **Index**: `{ userId: 1 }` (Unique)

### 2.3 `streaks`
- **Fields**:
  - `userId`: ObjectId (Unique index $\rightarrow$ `users._id`)
  - `currentStreak`: Number (0–7)
  - `longestStreak`: Number
  - `totalClaimsCount`: Number
  - `cycleCount`: Number
  - `currentCycleId`: String (e.g. `'CYC-1'`)
  - `cycleNumber`: Number (1, 2, 3...)
  - `lastClaimDate`: Date
  - `lastClaimDateString`: String (`YYYY-MM-DD` in `Asia/Kolkata`)
  - `nextAvailableClaimDate`: Date
  - `isStreakBroken`: Boolean
  - `updatedAt`: Date
- **Index**: `{ userId: 1 }` (Unique)

### 2.4 `streak_rewards`
- **Pre-configured 7-Day Matrix**:
  1. Day 1: `+5 VEs` (Currency: `VES`, Type: `VE`)
  2. Day 2: `+10 VEs` (Currency: `VES`, Type: `VE`)
  3. Day 3: `+15 VEs` (Currency: `VES`, Type: `VE`)
  4. Day 4: `₹1 Amazon Gift Card` (Currency: `INR`, Type: `AMAZON_GC`)
  5. Day 5: `₹2 Amazon Gift Card` (Currency: `INR`, Type: `AMAZON_GC`)
  6. Day 6: `+30 VEs` (Currency: `VES`, Type: `VE`)
  7. Day 7: `₹5 Amazon Gift Card` (Currency: `INR`, Type: `AMAZON_GC`, Grand Prize)
- **Index**: `{ day: 1 }` (Unique)

### 2.5 `streak_claims`
- **Fields**:
  - `claimId`: String (Unique)
  - `userId`: ObjectId
  - `cycleId`: String
  - `cycleNumber`: Number
  - `day`: Number (1–7)
  - `reward`: Object `{ rewardType, currency, amount, title, voucherCode }`
  - `status`: String (`'COMPLETED'`)
  - `claimedAt`: Date
  - `transactionId`: String
  - `dateString`: String
- **Compound Unique Index**: `{ userId: 1, cycleId: 1, day: 1 }` (Prevents duplicate cycle-day claims)

### 2.6 `ledger_transactions`
- **Fields**:
  - `transactionId`: String (Unique, e.g. `TXN-STREAK-XXXXXXXX`)
  - `userId`: ObjectId
  - `currency`: String (`'VES'` | `'INR'`)
  - `type`: String (`'CREDIT'`)
  - `transactionType`: String (`'DAILY_STREAK_VE'` | `'DAILY_STREAK_AMAZON_GC'`)
  - `amount`: Number
  - `source`: String (`'DAILY_STREAK'`)
  - `referenceId`: String (e.g. `STREAK-CYC-1-DAY1-XXXXXXXX`)
  - `streakDay`: Number (1–7)
  - `cycleId`: String
  - `balanceBefore`: Number
  - `balanceAfter`: Number
  - `voucherCode`: String (null or `AMZN-VEL-...`)
  - `status`: String (`'COMPLETED'`)
  - `dateString`: String
  - `createdAt`: Date
- **Indexes**:
  - `{ transactionId: 1 }` (Unique)
  - `{ userId: 1, createdAt: -1 }` (Optimized for user ledger queries)
  - `{ userId: 1, cycleId: 1, streakDay: 1 }` (Compound unique lock)

---

## 3. Concurrency Lock & Idempotency Formula

Primary concurrency protection is enforced at the MongoDB driver layer:
```javascript
const updatedStreak = await Streak.findOneAndUpdate(
  {
    userId,
    lastClaimDateString: { $ne: todayStr } // Atomic condition prevents race conditions
  },
  {
    $set: {
      currentStreak: newStreak,
      lastClaimDate: now,
      lastClaimDateString: todayStr,
      isStreakBroken: false
    }
  },
  { new: true }
);

if (!updatedStreak) {
  throw new Error('You have already claimed your daily reward today.');
}
```
