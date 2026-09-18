# ⚡ VELoop Rewards — Full-Stack Daily Streak & Rewards Engine

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v4.21-blue.svg)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-v19.0-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-v6.1-646CFF.svg)](https://vitejs.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%20v8.9-47A248.svg)](https://mongoosejs.com)
[![Tests](https://img.shields.io/badge/Tests-17%20Passed%20(100%25)-brightgreen.svg)](#-test-suite-execution)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

A production-grade, secure, backend-authoritative **Daily Streak & Rewards System** built for **VELoop Rewards**. Engineered strictly with a full MERN architecture (MongoDB, Express.js, React.js, Node.js, Bootstrap 5, and CSS Modules), featuring atomic database concurrency locking, double-entry immutable audit transaction ledgers, server-side midnight timezone rollouts, and an isolated virtual time evaluator simulator.

---

## 📑 Table of Contents
1. [Core Architectural Principle](#-core-architectural-principle)
2. [7-Day Backend Reward Ladder](#-7-day-backend-reward-ladder)
3. [Repository Structure](#-repository-structure)
4. [Security & Anti-Cheat Suite](#-security--anti-cheat-suite-section-26)
5. [Quick Start & Setup Guide](#-quick-start--setup-guide)
6. [Environment Variables](#-environment-variables)
7. [Evaluator Simulator Guide](#-evaluator-simulator-guide)
8. [Documentation Index](#-documentation-index)

---

## 🛡️ Core Architectural Principle

### The Frontend is NEVER the Source of Truth
Every single authoritative computation, streak calculation, day index, claim eligibility, reward amount, currency denomination, cryptographic voucher generation, and double-entry balance adjustment is **strictly validated and executed on the backend**:

| Attribute / Decision | React Role | Backend / MongoDB Authority |
| :--- | :--- | :--- |
| **Current Streak & Day** | View only (`streakStatus.currentStreak`) | Calculated from `Streak.lastClaimDate` vs server clock |
| **Today's Claim Eligibility** | Renders CTA / Locked button based on API | Verified against `lastClaimDateString === todayStr` |
| **Reward Matrix** | Renders server-supplied `nextReward` | Loaded exclusively from `config/rewards.config.js` |
| **Voucher Codes** | Displays copyable voucher string | Cryptographically generated on server (`AMZN-VEL-...`) |
| **Countdown Time** | Renders timer counting down to server ISO | Calculated server-side to next IST midnight (`Asia/Kolkata`) |
| **Missed Day Break** | Displays alert if `isStreakBroken === true` | Computed via calendar delta ($>1\text{ days} \rightarrow \text{Day 1 Reset}$) |
| **User Identity** | Sends Bearer JWT in Authorization header | Decoded with `jwt.verify()` in `requireAuth` middleware |
| **Double-Claim Protection** | Disables button after claim trigger | Atomic MongoDB condition `{ lastClaimDateString: { $ne: todayStr } }` |
| **Balance & Ledger Audit** | Renders balance pills and audit table | Atomic `$inc` updates and immutable `LedgerTransaction` records |

---

## 🏆 7-Day Backend Reward Ladder

| Day | Reward Title | Reward Type | Currency | Denomination | Special Asset / Badge |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **Day 1** | `+5 VEs` | Points | `VES` | 5 | Standard Coin Badge |
| **Day 2** | `+10 VEs` | Points | `VES` | 10 | Standard Coin Badge |
| **Day 3** | `+15 VEs` | Points | `VES` | 15 | Standard Coin Badge |
| **Day 4** | `₹1 Amazon Gift Card` | Voucher | `INR` | ₹1 | Milestone Gift Box (`animate-gentle-tilt`) |
| **Day 5** | `₹2 Amazon Gift Card` | Voucher | `INR` | ₹2 | Milestone Gift Box (`animate-gentle-tilt`) |
| **Day 6** | `+30 VEs` | Points | `VES` | 30 | High-Value Coin Badge |
| **Day 7** | `₹5 Amazon Gift Card` | Voucher | `INR` | ₹5 | **Grand Prize Crown** (`animate-soft-shine animate-float`) |

---

## 📂 Repository Structure

```text
veloop-daily-streak/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection with in-memory fallback
│   │   └── rewards.config.js     # Immutable 7-day reward ladder configuration
│   ├── controllers/
│   │   ├── authController.js     # User registration, login & demo auth
│   │   ├── devSimulatorController.js # Virtual time & streak testing simulator
│   │   ├── streakController.js   # Server-side streak evaluation & claims
│   │   └── walletController.js   # Wallet balances & paginated audit ledger
│   ├── middleware/
│   │   ├── auth.js               # JWT Bearer token authentication
│   │   ├── errorHandler.js       # Sanitized error mapping
│   │   ├── rateLimiter.js        # IP rate limiting for auth, claim & general APIs
│   │   └── validator.js          # Request payload sanitization & validation
│   ├── models/
│   │   ├── AuditLog.js
│   │   ├── LedgerTransaction.js  # Traceable double-entry transaction ledger
│   │   ├── Streak.js             # Current streak, cycles, and claim date strings
│   │   ├── StreakClaim.js        # Unique compound claims record
│   │   ├── StreakConfig.js
│   │   ├── StreakCycle.js
│   │   ├── StreakReward.js
│   │   ├── User.js
│   │   └── Wallet.js             # Points balance & Amazon voucher storage
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── devRoutes.js
│   │   ├── streakRoutes.js
│   │   └── walletRoutes.js
│   ├── services/
│   │   ├── auditService.js
│   │   ├── rewardService.js
│   │   ├── streakService.js      # Core authoritative business logic
│   │   ├── timeService.js        # Server clock & IST midnight calculation
│   │   ├── transactionService.js # Immutable transaction recording
│   │   └── walletService.js
│   ├── tests/
│   │   ├── e2e_api_flow.js       # Live 10-step E2E API integration script
│   │   ├── security_tamper.test.js # 11 anti-tamper security tests
│   │   └── streak.test.js        # 4 daily streak lifecycle unit tests
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express server bootstrap
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosClient.js    # Axios instance with JWT interceptors
│   │   ├── components/
│   │   │   ├── AuthModal/        # Modal authentication dialog
│   │   │   ├── DailyStreak/      # Modular streak components
│   │   │   │   ├── ArtworkIcons.jsx  # Vector coin, gift & badge graphics
│   │   │   │   ├── ClaimModal.jsx    # Celebration claim modal
│   │   │   │   ├── CpaDemo.jsx       # CPA ad engagement modal
│   │   │   │   ├── DailyStreak.module.css
│   │   │   │   ├── DailyStreakPage.jsx # Root streak lifecycle coordinator
│   │   │   │   ├── HeroBanner.jsx    # Streak hero countdown banner
│   │   │   │   ├── MinimalAuthPage.jsx # Premium two-column landing & login
│   │   │   │   ├── MinimalAuthPage.module.css
│   │   │   │   ├── GuestLandingCard.jsx # Centered guest entry card
│   │   │   │   ├── RewardGrid.jsx    # 7-Day rewards ladder grid
│   │   │   │   ├── StreakCalendarModal.jsx # 30-day streak calendar history
│   │   │   │   ├── StreakHeader.jsx
│   │   │   │   ├── StreakLoader.jsx
│   │   │   │   ├── StreakSkeleton.jsx
│   │   │   │   ├── StreakStats.jsx   # Streak analytics cards
│   │   │   │   ├── TrustFooter.jsx   # Clean consumer rewards footer
│   │   │   │   ├── UltimateReward.jsx
│   │   │   │   └── WhyStreak.jsx     # Supporting user benefits
│   │   │   ├── EvaluatorPanel/   # Floating simulator drawer
│   │   │   ├── Navbar/           # Top navigation with live balance indicators
│   │   │   ├── UI/               # FireLogo & reusable UI elements
│   │   │   └── WalletLedger/     # Real-time ledger audit table & vouchers
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth & streak state coordinator
│   │   ├── services/
│   │   │   └── streakApi.js      # Centralized frontend API service
│   │   ├── utils/
│   │   │   └── audioEffects.js   # Procedural Web Audio API sound effects
│   │   ├── App.jsx               # React Router root setup
│   │   ├── index.css             # Dark fintech variables & keyframe animations
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── API_DOCUMENTATION.md      # Full REST endpoint schemas
│   ├── DATABASE.md               # MongoDB schemas, ERD & indexing strategy
│   ├── SECURITY.md               # Security threat model & mitigations
│   └── TESTING.md                # QA testing guide & evaluator walkthrough
├── postman/
│   └── VELoop_Daily_Streak.postman_collection.json
├── dev.js                        # Parallel backend & frontend launcher
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔒 Security & Anti-Cheat Suite (Section 26)

All 11 security and anti-cheat requirements are validated with automated tests passing **17/17 (100%)**:

```text
▶ VELoop Anti-Cheat & Comprehensive Security Test Suite (Section 26)
  ✔ 1. React DevTools streak manipulation -> Expected: No effect
  ✔ 2. Device clock manipulation -> Expected: Cannot claim early
  ✔ 3. Fake reward amount (e.g. reward=1000000) -> Expected: Ignored / rejected
  ✔ 4. Fake day (e.g. request Day 7 while eligible only for Day 2) -> Expected: Rejected/Enforces correct day
  ✔ 5. Fake user ID -> Expected: Rejected; authenticated ownership remains authoritative
  ✔ 6. Duplicate claim -> Expected: Reward granted only once
  ✔ 7. Concurrent claim -> Expected: One successful credit, not double credit
  ✔ 8. Missed day -> Expected: Backend detects miss, resets streak, Day 1 becomes current eligible day
  ✔ 9. Refresh after Day 1 claim -> Expected: Day 1 stays Claimed, Day 2 locked/countdown
  ✔ 10. Multiple tabs -> Expected: Claim in Tab A invalidates Tab B claim
  ✔ 11. Logout / login -> Expected: Same streak state restored from MongoDB
✔ VELoop Anti-Cheat & Comprehensive Security Test Suite (Section 26)

▶ VELoop Daily Streak Engine Test Suite
  ✔ 1. First-time user: Day 1 should be available and claimable for +5 VEs
  ✔ 2. Double Claim Prevention: Same-day second claim must be rejected
  ✔ 3. Consecutive Progression: 7-Day Cycle verification
  ✔ 4. Missed Day Detection: Skipping 2 days resets streak back to Day 1
✔ VELoop Daily Streak Engine Test Suite

ℹ tests 17 | pass 17 | fail 0
```

---

## 🚀 Quick Start & Setup Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Run Both Backend & Frontend Together (1-Command)
```bash
# In the repository root directory:
node dev.js
```
*Starts the Express backend on `http://localhost:5000` and the Vite React frontend on `http://localhost:5173` simultaneously.*

---

### Alternative: Individual Service Setup

#### Backend Setup
```bash
cd backend
npm install
npm run dev
# Server listening on http://localhost:5000
```
> **Note**: If `MONGODB_URI` is omitted in `.env`, the backend automatically launches an embedded in-memory MongoDB instance for zero-configuration testing.

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Vite dev server listening on http://localhost:5173
```

---

### 3. Run Automated Tests
```bash
cd backend
npm test
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```ini
PORT=5000
NODE_ENV=development
MONGODB_URI=
JWT_SECRET=veloop_super_secret_jwt_key_2026
TIMEZONE=Asia/Kolkata
```

### Frontend (`frontend/.env`)
```ini
VITE_API_BASE_URL=
```

---

## 🧪 Evaluator Simulator Guide

To evaluate the full 7-day progression without waiting 7 physical days:
1. Open the web app at `http://localhost:5173`.
2. Click **1-Click Demo Login** (or register/sign in).
3. Click **Claim Day 1 (+5 VEs)**.
4. Click **Evaluator Mode** in the top navigation bar to open the virtual time drawer.
5. Click **Advance Virtual Time (+24h)** $\rightarrow$ Day 2 unlocks immediately.
6. Progress through Day 4 (₹1 Amazon GC), Day 5 (₹2 Amazon GC), and Day 7 (₹5 Grand Amazon GC).
7. Test **Simulate Missed Day (+48h)** to verify automatic streak break & reset to Day 1.
8. Scroll to the **Immutable Double-Entry Ledger** table to inspect generated `transactionId`, `referenceId`, and audit balances.

---

## 📚 Documentation Index

- 📘 [REST API Documentation](docs/API_DOCUMENTATION.md)
- 🗄️ [Database Schema & Architecture](docs/DATABASE.md)
- 🛡️ [Security Threat Model & Mitigations](docs/SECURITY.md)
- 🧪 [Testing & QA Strategy](docs/TESTING.md)
- 📮 [Postman Collection](postman/VELoop_Daily_Streak.postman_collection.json)

---

## 📄 License
This project is licensed under the MIT License.
