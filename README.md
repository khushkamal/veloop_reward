# ⚡ VELoop Rewards — Full-Stack Daily Streak & Rewards Engine

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v4.21-blue.svg)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-v19.0-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-v6.1-646CFF.svg)](https://vitejs.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%20v8.9-47A248.svg)](https://mongoosejs.com)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel%20Serverless%20Ready-black.svg)](https://vercel.com)
[![Tests](https://img.shields.io/badge/Tests-17%20Passed%20(100%25)-brightgreen.svg)](#-security--anti-cheat-suite-section-26)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

A production-grade, secure, backend-authoritative **Daily Streak & Rewards System** built for **VELoop Rewards**. Engineered strictly with a full MERN architecture (MongoDB, Express.js, React.js, Node.js, Bootstrap 5, and CSS Modules), featuring atomic database concurrency locking, double-entry immutable audit transaction ledgers, server-side midnight timezone rollouts, serverless deployment compatibility for Vercel, and an isolated virtual time evaluator simulator.

---

## 📑 Table of Contents
1. [Core Architectural Principle](#-core-architectural-principle)
2. [7-Day Backend Reward Ladder](#-7-day-backend-reward-ladder)
3. [Key Features & System Highlights](#-key-features--system-highlights)
4. [Repository Structure](#-repository-structure)
5. [Security & Anti-Cheat Suite (Section 26)](#-security--anti-cheat-suite-section-26)
6. [Quick Start & Setup Guide](#-quick-start--setup-guide)
7. [Environment Variables Reference](#-environment-variables-reference)
8. [Deployment Guide (Vercel & Production)](#-deployment-guide-vercel--production)
9. [End-to-End Testing & Verification](#-end-to-end-testing--verification)
10. [Documentation Index & Postman](#-documentation-index--postman)

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

## ✨ Key Features & System Highlights

- **🔒 Anti-Cheat & Anti-Tamper Engine**: 11 automated security tests passing 100%, protecting against client clock tampering, DevTools payload forgery, race conditions, replay attacks, and duplicate claims.
- **⚡ Atomic Concurrency Locking**: MongoDB atomic operators and compound unique index constraints prevent race condition exploits and duplicate payouts.
- **📜 Double-Entry Immutable Ledger**: Every credit generates an immutable audit record with cryptographic reference hashes and transparent historical balance tracking.
- **🕒 IST Midnight Rollout**: Uses authoritative `Asia/Kolkata` time computations for strict midnight resets regardless of client device timezone.
- **🎮 Virtual Time Evaluator Simulator**: Built-in developer API (`/api/dev/simulator`) to travel days forward, simulate missed days, force cycle rollovers, and test edge cases.
- **🎯 CPA Engagement Verification**: Realistic CPA ad engagement modal workflow before unlocking milestone rewards.
- **🔊 Procedural Web Audio FX**: Built-in synth audio feedback (coin chime, milestone fanfare, error buzz) with zero external audio assets.
- **☁️ Vercel Serverless Ready**: Configured for instant deployment with `vercel.json` rewrites and an optimized serverless gateway in `api/index.js`.
- **💾 Dual Database Engine**: Seamlessly connects to MongoDB Atlas or automatically falls back to an embedded in-memory MongoDB instance for zero-config local testing.

---

## 📂 Repository Structure

```text
veloop-daily-streak/
├── api/
│   └── index.js                  # Vercel Serverless entrypoint
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB Atlas connection + in-memory fallback
│   │   └── rewards.config.js     # Authoritative 7-day reward ladder configuration
│   ├── controllers/
│   │   ├── authController.js     # User registration, login & 1-click demo auth
│   │   ├── devSimulatorController.js # Virtual time & streak testing simulator
│   │   ├── streakController.js   # Authoritative streak evaluation & claim execution
│   │   └── walletController.js   # Balances, vouchers & paginated audit ledger
│   ├── middleware/
│   │   ├── auth.js               # JWT Bearer token authentication
│   │   ├── errorHandler.js       # Sanitized error mapping & status codes
│   │   ├── rateLimiter.js        # IP rate limiting for auth, claim & general APIs
│   │   └── validator.js          # Request payload sanitization & validation
│   ├── models/
│   │   ├── AuditLog.js           # Security event and action logs
│   │   ├── LedgerTransaction.js  # Traceable double-entry transaction ledger
│   │   ├── Streak.js             # Current streak, cycle counters, and claim date strings
│   │   ├── StreakClaim.js        # Unique compound claims record
│   │   ├── StreakConfig.js       # Dynamic streak rules & operational metadata
│   │   ├── StreakCycle.js        # Historical cycle tracking
│   │   ├── StreakReward.js       # Rewarded claim history
│   │   ├── User.js               # User accounts & hashed credentials
│   │   └── Wallet.js             # Points balance & Amazon voucher storage
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── devRoutes.js          # /api/dev/simulator
│   │   ├── streakRoutes.js       # /api/streak & /api/daily-streak
│   │   └── walletRoutes.js       # /api/wallet
│   ├── services/
│   │   ├── auditService.js       # Audit log creation
│   │   ├── rewardService.js      # Reward lookup & voucher generation
│   │   ├── streakService.js      # Core authoritative streak business logic
│   │   ├── timeService.js        # Server clock & IST midnight calculation
│   │   ├── transactionService.js # Immutable transaction ledger recording
│   │   └── walletService.js      # Wallet point crediting & voucher issuance
│   ├── tests/
│   │   ├── e2e_api_flow.js       # Live 10-step E2E API integration flow
│   │   ├── security_tamper.test.js # 11 anti-tamper security tests
│   │   └── streak.test.js        # 4 daily streak lifecycle unit tests
│   ├── .env.example              # Backend environment template
│   ├── package.json
│   └── server.js                 # Express server bootstrap & route dispatcher
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosClient.js    # Smart Axios client with JWT interceptors
│   │   ├── components/
│   │   │   ├── AuthModal/        # Modal authentication dialog
│   │   │   ├── DailyStreak/      # Modular streak UI components
│   │   │   │   ├── ArtworkIcons.jsx  # Vector coin, gift & badge graphics
│   │   │   │   ├── ClaimModal.jsx    # Celebration claim modal
│   │   │   │   ├── CpaDemo.jsx       # CPA ad engagement modal
│   │   │   │   ├── DailyStreak.module.css
│   │   │   │   ├── DailyStreakPage.jsx # Root streak lifecycle coordinator
│   │   │   │   ├── HeroBanner.jsx    # Streak hero countdown banner
│   │   │   │   ├── MinimalAuthPage.jsx # Two-column landing & login
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
│   │   │   ├── Navbar/           # Top navigation with live balance indicators
│   │   │   ├── UI/               # FireLogo & reusable UI elements
│   │   │   └── WalletLedger/     # Real-time ledger audit table & vouchers
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth & streak state coordinator
│   │   ├── services/
│   │   │   └── streakApi.js      # Centralized frontend API service
│   │   ├── utils/
│   │   │   └── audioEffects.js   # Procedural Web Audio API sound synthesizer
│   │   ├── App.jsx               # React Router root setup
│   │   ├── index.css             # Dark fintech variables & keyframe animations
│   │   └── main.jsx
│   ├── .env.example              # Frontend environment template
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
├── dev.js                        # Parallel backend & frontend concurrent runner
├── vercel.json                   # Vercel deployment rewrite rules
├── package.json                  # Root monorepo workspace scripts
├── .env.example                  # Root environment template
└── README.md
```

---

## 🔒 Security & Anti-Cheat Suite (Section 26)

All 11 security and anti-cheat test cases pass **17/17 (100%)**:

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
- Optional: MongoDB Atlas connection URI (if omitted, an in-memory MongoDB automatically spins up)

---

### 2. One-Command Setup (Recommended)

From the project root:

```bash
# Install root dependencies
npm install

# Start both Backend (5000) and Frontend (5173) in parallel:
node dev.js
# OR
npm run dev
```

- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:5173`
- **Health Check**: `http://localhost:5000/api/health`

---

### 3. Individual Service Setup

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```
> **Zero-Config Tip**: If `MONGODB_URI` is left empty in `.env`, the backend automatically provisions an isolated in-memory MongoDB instance.

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

### 4. Running the Test Suite

```bash
# Run unit & security test suite (17/17 tests):
cd backend
npm test

# Run full-cycle 7-day progression script:
node tests/e2e_api_flow.js
```

---

## ⚙️ Environment Variables Reference

### Root & Backend (`.env` or `backend/.env`)
| Variable | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | No | `5000` | Express server HTTP listening port |
| `NODE_ENV` | No | `development` | App environment (`development` / `production`) |
| `MONGODB_URI` | No | *In-Memory DB* | MongoDB connection string (Atlas or Local) |
| `MONGO_URI` | No | *Alias for MONGODB_URI* | Fallback MongoDB URI alias |
| `JWT_SECRET` | Yes | `veloop_super_secret_jwt_key_2026` | Secret key used to sign & verify JWT tokens |
| `TIMEZONE` | No | `Asia/Kolkata` | Timezone for authoritative midnight rollouts |

### Frontend (`frontend/.env`)
| Variable | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `VITE_API_BASE_URL` | No | `/api` | Base URL for backend API calls |
| `VITE_API_URL` | No | `/api` | Fallback alias for API Base URL |

*(Note: In production / Vercel, the frontend automatically falls back to relative `/api` routes seamlessly).*

---

## ☁️ Deployment Guide (Vercel & Production)

### Deploying to Vercel (1-Click Monorepo Support)

The repository includes ready-to-deploy `vercel.json` rewrites and `api/index.js` serverless function bridges.

1. Push this repository to GitHub/GitLab.
2. Import the project into your **Vercel Dashboard**.
3. Configure the following **Environment Variables** in Vercel Project Settings:
   - `MONGODB_URI`: Your production MongoDB Atlas connection string (`mongodb+srv://...`).
   - `JWT_SECRET`: A secure random 64-character secret string.
   - `NODE_ENV`: `production`
   - `TIMEZONE`: `Asia/Kolkata`
4. Deploy! Vercel will automatically:
   - Build and serve the React Vite frontend at `/`.
   - Route all `/api/*` traffic to the serverless Express backend.

---

## 🧪 End-to-End Testing & Verification

### Interactive User Flow
1. Open the web app at `http://localhost:5173`.
2. Click **1-Click Demo Login** (or register a custom account).
3. Click **Claim Day 1 (+5 VEs)** $\rightarrow$ Complete the CPA ad engagement verification.
4. Observe the celebration modal, instant wallet balance update, and live countdown timer activating.
5. Inspect the **Wallet & Immutable Audit Ledger** table at the bottom of the page to verify cryptographic transaction IDs and ledger hashes.
6. Check the **30-Day Streak History Modal** to view historical claim badges.

### Automated Virtual Time Testing (Evaluator Simulator)
Use the dev simulator routes (`/api/dev/simulator/*`) to simulate edge cases:
- `POST /api/dev/simulator/advance-day` $\rightarrow$ Fast-forward virtual server clock by 1 day.
- `POST /api/dev/simulator/reset-user` $\rightarrow$ Reset streak to Day 0.
- `POST /api/dev/simulator/set-day` $\rightarrow$ Set user streak to arbitrary Day (1-7).
- `GET /api/dev/simulator/state` $\rightarrow$ Inspect simulated server time and active offsets.

---

## 📚 Documentation Index & Postman

- 📘 [REST API Documentation](docs/API_DOCUMENTATION.md) — Comprehensive schema, request payloads, and status codes.
- 🗄️ [Database Schema & Architecture](docs/DATABASE.md) — Mongoose schemas, compound indexes, and data models.
- 🛡️ [Security Threat Model & Mitigations](docs/SECURITY.md) — Threat vectors, anti-cheat mechanisms, and mitigation architecture.
- 🧪 [Testing & QA Strategy](docs/TESTING.md) — QA verification steps and test matrix.
- 📮 [Postman Collection](postman/VELoop_Daily_Streak.postman_collection.json) — Ready-to-import Postman API collection.

---

## 📄 License
This project is licensed under the MIT License.
