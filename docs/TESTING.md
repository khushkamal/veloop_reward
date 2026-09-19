# VELoop Rewards - Testing & Quality Assurance Guide

This document explains the test strategy, automated test commands, end-to-end integration scripts, and manual evaluator test instructions.

---

## 1. Automated Test Commands

### Run Full Test Suite
```bash
cd backend
npm test
```

### Run Specific Test Suites
```bash
# Security & Anti-Cheat Suite (11 test cases)
node --test tests/security_tamper.test.js

# Daily Streak Engine Unit Tests
node --test tests/streak.test.js

# Live E2E Integration API Flow
node tests/e2e_api_flow.js
```

---

## 2. Test Suite Breakdown

### Suite 1: Anti-Cheat & Security Suite (`security_tamper.test.js`)
- **Test 1**: React DevTools manipulation resistance.
- **Test 2**: Device clock advance protection.
- **Test 3**: Fake reward amount injection (`reward=1000000`).
- **Test 4**: Fake day skip (`request Day 7 on Day 2`).
- **Test 5**: Fake user ID & cross-user isolation.
- **Test 6**: Duplicate claim rejection.
- **Test 7**: 10 simultaneous concurrent requests (single credit verification).
- **Test 8**: Missed check-in break detection and Day 1 reset.
- **Test 9**: Page refresh state persistence.
- **Test 10**: Multi-tab race condition protection.
- **Test 11**: Logout/login database re-hydration.

### Suite 2: Daily Streak Engine (`streak.test.js`)
- First-time user Day 1 claim verification (+5 VEs).
- Double-claim rejection on same calendar date.
- 7-day sequential progression through all milestone tiers.
- Missed day detection when skipping 2 calendar days.

---

## 3. End-to-End User Journey Workflow

When running the web application at `http://localhost:5173`:
1. Click **1-Click Demo Login** (or register/sign in with your own credentials).
2. Click **Claim Day 1 Reward (+5 VEs)**.
3. Observe the CPA engagement flow modal, complete the demo verification, and receive your reward.
4. Button automatically transitions to **Reward Claimed** and the live countdown timer activates.
5. View the **Wallet & Immutable Audit Ledger** table at the bottom of the page to inspect all cryptographically generated transaction IDs, reference hashes, and updated balances.

To programmatically simulate multi-day streak progression and missed days:
```bash
cd backend
node tests/e2e_api_flow.js
```
