# VELOOP REWARDS - Daily Streak & Rewards System

A full-stack, secure, and backend-authoritative Daily Streak & Rewards engine built for the **VELoop Rewards Internship Project**.

---

## 🚀 Key Features

1. **Exact 7-Day Backend-Driven Reward Ladder**:
   - **Day 1**: `+5 VEs`
   - **Day 2**: `+10 VEs`
   - **Day 3**: `+15 VEs`
   - **Day 4**: `₹1 Amazon Gift Card` (Voucher Code)
   - **Day 5**: `₹2 Amazon Gift Card` (Voucher Code)
   - **Day 6**: `+30 VEs`
   - **Day 7**: `₹5 Amazon Gift Card` (Grand Prize)
2. **100% Backend Source of Truth**:
   - Client never calculates streak, eligibility, day index, or reward values.
   - Atomic MongoDB update guards against race conditions and duplicate claims.
3. **CPA Advertisement Demo State**:
   - Native, interactive sponsor verification simulation before reward grant.
4. **Wallet & Double-Entry Ledger**:
   - Audit trail with `transactionId`, `referenceId`, `balanceBefore`, `balanceAfter`, and `status`.
5. **Evaluator Time-Machine Simulator**:
   - Floating debug drawer allowing reviewers to fast-forward +24h, simulate missed days (+48h), or reset streak in 1 click.
6. **Modern Dark Fintech UI**:
   - React + Bootstrap 5 + CSS Modules + Lucide Icons + Confetti + Web Audio API procedural sound synthesis.

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Bootstrap 5, CSS Modules, Framer Motion, Canvas Confetti, Lucide React, Axios
- **Backend**: Node.js, Express.js, JWT Authentication, Timezone-aware Time Engine
- **Database**: MongoDB (Mongoose ODM) with In-Memory fallback for 100% zero-config execution

---

## 🏃 Quick Start

### 1. Start Backend Server
```bash
cd backend
npm install
npm start
# Backend API runs on http://localhost:5000
```

### 2. Start Frontend Dev Server
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 3. Run Automated Test Suites
```bash
cd backend
npm test
# Runs all 13 unit, security, anti-tamper, and concurrency tests
```

### 4. Run E2E Integration Flow
```bash
cd backend
node tests/e2e_api_flow.js
```
