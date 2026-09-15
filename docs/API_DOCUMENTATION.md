# VELoop Rewards - REST API Documentation

Base URL: `http://localhost:5000/api`

---

## 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register User
- **Method / Route**: `POST /api/auth/register`
- **Rate Limit**: 30 requests / 15 min
- **Request Body**:
  ```json
  {
    "name": "Alex Doe",
    "email": "alex@veloop.com",
    "password": "Password123"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6732f91a...",
      "name": "Alex Doe",
      "email": "alex@veloop.com",
      "avatar": "https://api.dicebear.com/7.x/bottts/svg?seed=Alex%20Doe",
      "role": "user"
    }
  }
  ```

### 1.2 User Login
- **Method / Route**: `POST /api/auth/login`
- **Rate Limit**: 30 requests / 15 min
- **Request Body**:
  ```json
  {
    "email": "alex@veloop.com",
    "password": "Password123"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
  ```

### 1.3 1-Click Evaluator Demo Login
- **Method / Route**: `POST /api/auth/demo-login`
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "name": "VELoop Evaluator",
      "email": "evaluator@veloop.dev",
      "role": "evaluator"
    }
  }
  ```

### 1.4 Get Authenticated User Profile & Streak Status
- **Method / Route**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "user": { ... },
    "streakStatus": { ... }
  }
  ```

---

## 2. Daily Streak Endpoints (`/api/streak` / `/api/daily-streak`)

### 2.1 Get Streak Status & 7-Day Ladder
- **Method / Route**: `GET /api/streak/status` (or `GET /api/daily-streak`)
- **Headers**: `Authorization: Bearer <token>`
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "userId": "6732f91a...",
      "currentStreak": 1,
      "longestStreak": 1,
      "cycleId": "CYC-1",
      "cycleNumber": 1,
      "canClaim": false,
      "alreadyClaimedToday": true,
      "isStreakBroken": false,
      "nextDayIndex": 2,
      "serverTime": "2026-09-15T15:00:00.000Z",
      "countdownSeconds": 12600,
      "nextClaimAvailableAt": "2026-09-15T18:30:00.000Z",
      "streakLadder": [
        {
          "day": 1,
          "rewardType": "VE",
          "currency": "VES",
          "amount": 5,
          "displayName": "+5 VEs",
          "state": "CLAIMED",
          "status": "CLAIMED"
        },
        {
          "day": 2,
          "rewardType": "VE",
          "currency": "VES",
          "amount": 10,
          "displayName": "+10 VEs",
          "state": "LOCKED",
          "status": "LOCKED"
        }
      ],
      "nextReward": {
        "day": 2,
        "rewardType": "VE",
        "currency": "VES",
        "amount": 10,
        "displayName": "+10 VEs"
      },
      "ultimateReward": {
        "title": "₹5 Amazon Gift Card",
        "unlockDay": 7,
        "amount": 5,
        "currency": "INR"
      },
      "stats": {
        "checkedIn": 1,
        "totalRewards": 7,
        "bestStreak": 1
      },
      "wallet": {
        "veBalance": 5,
        "totalVeEarned": 5,
        "totalAmazonGCAmount": 0,
        "vouchersCount": 0
      }
    }
  }
  ```

### 2.2 Claim Daily Streak Reward
- **Method / Route**: `POST /api/streak/claim`
- **Rate Limit**: 30 requests / 1 min
- **Headers**: `Authorization: Bearer <token>`
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "message": "Day 1 reward claimed successfully!",
    "data": {
      "claimedDay": 1,
      "streakDay": 1,
      "cycleId": "CYC-1",
      "cycleNumber": 1,
      "reward": {
        "rewardType": "VE",
        "currency": "VES",
        "amount": 5,
        "displayName": "+5 VEs",
        "voucherCode": null
      },
      "wallet": {
        "veBalance": 5,
        "totalAmazonGCAmount": 0
      },
      "streakStatus": { ... }
    }
  }
  ```

### 2.3 Duplicate Claim Rejected (400)
- **Response `400 Bad Request`**:
  ```json
  {
    "success": false,
    "error": "You have already claimed your daily reward today. Come back tomorrow!",
    "code": "ALREADY_CLAIMED_TODAY",
    "countdownSeconds": 12540,
    "nextClaimAvailableAt": "2026-09-15T18:30:00.000Z"
  }
  ```

---

## 3. Wallet & Ledger Endpoints (`/api/wallet`)

### 3.1 Get Wallet Summary
- **Method / Route**: `GET /api/wallet/summary`
- **Headers**: `Authorization: Bearer <token>`
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "veBalance": 55,
      "totalVeEarned": 55,
      "totalAmazonGCAmount": 8,
      "amazonVouchers": [
        {
          "voucherCode": "AMZN-VEL-D445-D5FDD0",
          "amount": 1,
          "dayIndex": 4,
          "claimedAt": "2026-09-15T15:00:00.000Z"
        }
      ]
    }
  }
  ```

### 3.2 Get Double-Entry Audit Ledger
- **Method / Route**: `GET /api/wallet/ledger?page=1&limit=20`
- **Headers**: `Authorization: Bearer <token>`
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "count": 4,
    "totalCount": 4,
    "page": 1,
    "totalPages": 1,
    "data": [
      {
        "transactionId": "TXN-STREAK-9F12A4B8",
        "referenceId": "STREAK-CYC-1-DAY4-9F12A4B8",
        "source": "DAILY_STREAK",
        "type": "CREDIT",
        "transactionType": "DAILY_STREAK_AMAZON_GC",
        "currency": "INR",
        "amount": 1,
        "balanceBefore": 30,
        "balanceAfter": 30,
        "voucherCode": "AMZN-VEL-D445-D5FDD0",
        "status": "COMPLETED",
        "createdAt": "2026-09-15T15:00:00.000Z"
      }
    ]
  }
  ```

---

## 4. Evaluator Simulator Endpoints (`/api/dev/simulator`)

- `POST /api/dev/simulator/advance-day` `{ "days": 1 }` — Advances server time +24h to simulate next day claim.
- `POST /api/dev/simulator/simulate-missed-day` — Advances server time +48h to simulate missed check-in break.
- `POST /api/dev/simulator/reset-streak` — Resets streak back to Day 0.
- `POST /api/dev/simulator/reset-clock` — Re-synchronizes server time back to live system clock.
