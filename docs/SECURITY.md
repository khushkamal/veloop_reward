# VELoop Rewards - Security & Anti-Tamper Architecture

This document describes the threat models, attack mitigation strategies, authentication mechanics, and rate limiting controls implemented across the system.

---

## 1. Threat Mitigation Matrix

| Attack Vector | Vulnerability Category | Mitigation Architecture |
| :--- | :--- | :--- |
| **Client-Side State Tampering** | Parameter Tampering | The backend ignores all client-supplied reward values, days, currencies, or streaks. The next day and reward tier are computed directly from MongoDB. |
| **Race Conditions / Concurrent Replay** | Concurrency Violation | Atomic MongoDB query constraint: `{ lastClaimDateString: { $ne: todayStr } }` + compound unique index on `LedgerTransaction` (`{ userId, cycleId, streakDay }`). |
| **Device Clock Manipulation** | Time Tampering | Server time is the sole authority for claim windows and midnight IST rollover (`Asia/Kolkata`). Clock skew is compensated on the frontend purely for display countdown. |
| **Cross-User Privilege Escalation** | Broken Object Level Auth (BOLA) | Authenticated identity is extracted strictly from the verified JWT payload (`req.user._id`). Request body `userId` is never trusted. |
| **Brute-Force & Flooding** | Denial of Service (DoS) | Rate limiting layers: 30 auth requests / 15 min; 30 claim requests / min; 200 general requests / 15 min. |
| **SQL/NoSQL Injection** | Injection | Strict Mongoose schema models, query typing, and input sanitization in `validator.js`. |
| **Missing Check-In Fraud** | Business Logic Bypass | Calendar day delta calculation: if $\text{delta} > 1$, the streak automatically resets to Day 1 regardless of user claims. |

---

## 2. Authentication & Session Flow

```text
1. Client POST /api/auth/login or /api/auth/demo-login
2. Server validates credentials with bcrypt.compare()
3. Server issues JWT signed with HMAC SHA-256 (expires in 7 days)
4. Client stores token in localStorage ('veloop_auth_token')
5. Client attaches 'Authorization: Bearer <token>' on all subsequent API requests
6. Express 'requireAuth' middleware decodes and verifies token
7. req.user is populated with authenticated User model instance
```

---

## 3. Double-Entry Accounting Proof

Each reward grant creates an immutable ledger entry with strict before/after balances:
- **`balanceBefore`**: `Wallet.veBalance` prior to increment.
- **`balanceAfter`**: `Wallet.veBalance + reward.amount`.
- **`amount`**: Exact increment applied by atomic `$inc`.
- **`referenceId`**: Unique cryptographic audit code (`STREAK-<cycleId>-DAY<day>-<hash>`).
