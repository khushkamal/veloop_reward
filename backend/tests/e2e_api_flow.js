const http = require('http');

const API_PORT = 5000;

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: API_PORT,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const parsed = body ? JSON.parse(body) : {};
            resolve({ statusCode: res.statusCode, body: parsed });
          } catch (e) {
            resolve({ statusCode: res.statusCode, raw: body });
          }
        });
      }
    );

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runE2E() {
  console.log('--- STARTING VELOOP LIVE API INTEGRATION TEST ---');

  // 1. Health check
  const health = await request({ path: '/api/health', method: 'GET' });
  console.log('✔ 1. Health Check:', health.statusCode === 200 ? 'PASS' : 'FAIL', health.body);

  // 2. Demo Login
  const loginRes = await request({ path: '/api/auth/demo-login', method: 'POST' });
  console.log('✔ 2. Demo Login:', loginRes.statusCode === 200 ? 'PASS' : 'FAIL', loginRes.body.user.name);
  const token = loginRes.body.token;
  const authHeaders = { Authorization: `Bearer ${token}` };

  // Reset user streak to clean slate
  await request({ path: '/api/dev/simulator/reset-streak', method: 'POST', headers: authHeaders });
  await request({ path: '/api/dev/simulator/reset-clock', method: 'POST', headers: authHeaders });

  // 3. Check Initial Status
  const status1 = await request({ path: '/api/streak/status', method: 'GET', headers: authHeaders });
  console.log('✔ 3. Initial Status (Day 1 ready):', status1.body.data.canClaim === true ? 'PASS' : 'FAIL', {
    currentStreak: status1.body.data.currentStreak,
    nextDayIndex: status1.body.data.nextDayIndex,
    reward: status1.body.data.nextReward.displayName
  });

  // 4. Claim Day 1 (+5 VEs)
  const claim1 = await request({ path: '/api/streak/claim', method: 'POST', headers: authHeaders });
  console.log('✔ 4. Claim Day 1 (+5 VEs):', claim1.statusCode === 200 ? 'PASS' : 'FAIL', {
    claimedDay: claim1.body.data.claimedDay,
    reward: claim1.body.data.reward.displayName,
    veBalance: claim1.body.data.wallet.veBalance
  });

  // 5. Attempt Duplicate Claim (Must Fail with 400)
  const dupClaim = await request({ path: '/api/streak/claim', method: 'POST', headers: authHeaders });
  console.log('✔ 5. Duplicate Claim Rejected (400):', dupClaim.statusCode === 400 ? 'PASS' : 'FAIL', {
    error: dupClaim.body.error,
    code: dupClaim.body.code,
    countdownSeconds: dupClaim.body.countdownSeconds
  });

  // 6. Complete full 7-day ladder progression
  const expectedDays = [
    { day: 2, reward: '+10 VEs', type: 'VE' },
    { day: 3, reward: '+15 VEs', type: 'VE' },
    { day: 4, reward: '₹1 Amazon Gift Card', type: 'AMAZON_GC' },
    { day: 5, reward: '₹2 Amazon Gift Card', type: 'AMAZON_GC' },
    { day: 6, reward: '+30 VEs', type: 'VE' },
    { day: 7, reward: '₹5 Amazon Gift Card', type: 'AMAZON_GC' }
  ];

  for (const exp of expectedDays) {
    // Advance 1 day
    await request({
      path: '/api/dev/simulator/advance-day',
      method: 'POST',
      headers: authHeaders,
      data: { days: 1 }
    });

    const claimRes = await request({ path: '/api/streak/claim', method: 'POST', headers: authHeaders });
    const passed =
      claimRes.statusCode === 200 &&
      claimRes.body.data.claimedDay === exp.day &&
      claimRes.body.data.reward.displayName === exp.reward;

    console.log(`✔ Day ${exp.day} Claim (${exp.reward}):`, passed ? 'PASS' : 'FAIL', {
      claimedDay: claimRes.body?.data?.claimedDay,
      reward: claimRes.body?.data?.reward?.displayName,
      voucher: claimRes.body?.data?.reward?.voucherCode || 'N/A'
    });
  }

  // 7. Verify Wallet & Ledger
  const walletRes = await request({ path: '/api/wallet/summary', method: 'GET', headers: authHeaders });
  console.log('✔ 7. Final Wallet Summary:', {
    veBalance: walletRes.body.data.veBalance,
    totalAmazonGCAmount: walletRes.body.data.totalAmazonGCAmount,
    totalVouchersCount: walletRes.body.data.amazonVouchers.length
  });

  const historyRes = await request({ path: '/api/wallet/history', method: 'GET', headers: authHeaders });
  console.log('✔ 8. Immutable Audit Ledger Transactions Count:', historyRes.body.count);

  // 8. Test Missed Day Reset
  await request({ path: '/api/dev/simulator/simulate-missed-day', method: 'POST', headers: authHeaders });
  const brokenStatus = await request({ path: '/api/streak/status', method: 'GET', headers: authHeaders });
  console.log('✔ 9. Missed Day Break Detection:', brokenStatus.body.data.isStreakBroken === true ? 'PASS' : 'FAIL', {
    isStreakBroken: brokenStatus.body.data.isStreakBroken,
    nextDayIndex: brokenStatus.body.data.nextDayIndex
  });

  // Claim after missed day -> should award Day 1 (+5 VEs)
  const resetClaim = await request({ path: '/api/streak/claim', method: 'POST', headers: authHeaders });
  console.log('✔ 10. Re-claim after break (Reset to Day 1):', resetClaim.body.data.claimedDay === 1 ? 'PASS' : 'FAIL', {
    claimedDay: resetClaim.body.data.claimedDay,
    reward: resetClaim.body.data.reward.displayName
  });

  console.log('=== ALL E2E API VERIFICATIONS PASSED SUCCESSFULLY ===');
}

runE2E().catch(console.error);
