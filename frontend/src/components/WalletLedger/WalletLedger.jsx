import React, { useState, useEffect } from 'react';
import { Wallet, Coins, Gift, History, Copy, Check, ShieldCheck } from 'lucide-react';
import api from '../../api/axiosClient';
import { playClickSound } from '../../utils/audioEffects';
import styles from './WalletLedger.module.css';

export default function WalletLedger({ wallet }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, [wallet]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/wallet/history');
      if (res.data.success) {
        setHistory(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load transaction history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    playClickSound();
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className={styles.ledgerSection}>
      <div className="container">
        <div className="d-flex align-items-center gap-2 mb-4">
          <Wallet className="text-info" size={24} />
          <h2 className="h4 fw-bold mb-0 text-white">Wallet & Double-Entry Ledger</h2>
        </div>

        {/* Summary Balance Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className={styles.summaryCard}>
              <div className={`${styles.iconCircle} ${styles.veIconBg}`}>
                <Coins size={28} />
              </div>
              <div>
                <div className={styles.summaryValue}>{wallet?.veBalance ?? 0} VEs</div>
                <div className={styles.summaryLabel}>Active VELoop Balance</div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={styles.summaryCard}>
              <div className={`${styles.iconCircle} ${styles.amazonIconBg}`}>
                <Gift size={28} />
              </div>
              <div>
                <div className={styles.summaryValue}>₹{wallet?.totalAmazonGCAmount ?? 0}</div>
                <div className={styles.summaryLabel}>Total Amazon Gift Cards Earned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Won Amazon Vouchers List */}
        {wallet?.amazonVouchers?.length > 0 && (
          <div className={`${styles.tableCard} mb-4`}>
            <h3 className="h6 fw-bold text-white mb-2 d-flex align-items-center gap-2">
              <Gift size={16} className="text-warning" />
              <span>Claimed Amazon Gift Card Vouchers</span>
            </h3>
            <div className={styles.voucherGrid}>
              {wallet.amazonVouchers.map((v, idx) => (
                <div key={idx} className={styles.voucherCard}>
                  <div>
                    <div className="fw-bold text-warning small">₹{v.amount} Amazon Voucher</div>
                    <code className="text-white small">{v.voucherCode}</code>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-warning border-0 p-2"
                    onClick={() => handleCopy(v.voucherCode)}
                    title="Copy voucher code"
                  >
                    {copiedCode === v.voucherCode ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Immutable Audit Ledger Table */}
        <div className={styles.tableCard}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="h6 fw-bold text-white mb-0 d-flex align-items-center gap-2">
              <History size={16} className="text-info" />
              <span>Immutable Ledger Audit Trail</span>
            </h3>
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 small">
              <ShieldCheck size={12} className="me-1" />
              Server Verified
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0" style={{ background: 'transparent' }}>
              <thead>
                <tr className="text-muted small text-uppercase">
                  <th>Date (IST)</th>
                  <th>Reference ID</th>
                  <th>Source / Day</th>
                  <th>Reward Description</th>
                  <th>Amount</th>
                  <th>Balance Flow</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      Loading audit logs...
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No claim transactions recorded yet. Claim Day 1 to start your ledger!
                    </td>
                  </tr>
                ) : (
                  history.map((tx) => (
                    <tr key={tx._id} className="align-middle">
                      <td className="small text-secondary">
                        {new Date(tx.createdAt || tx.claimedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </td>
                      <td>
                        <code className="text-info small">{tx.referenceId || `STREAK-${tx._id.slice(-6)}`}</code>
                      </td>
                      <td>
                        <span className="badge bg-secondary bg-opacity-25 text-white small me-1">
                          {tx.source || 'DAILY_STREAK'}
                        </span>
                        <span className="fw-bold text-white small">Day {tx.streakDay || tx.dayNumber}</span>
                      </td>
                      <td className="text-light small">{tx.description}</td>
                      <td className="fw-bold text-info">
                        {tx.rewardType === 'VE' ? `+${tx.amount} VEs` : `₹${tx.amount} GC`}
                      </td>
                      <td className="small text-secondary">
                        <span>{tx.balanceBefore ?? 0}</span>
                        <span className="text-muted mx-1">➔</span>
                        <strong className="text-success">{tx.balanceAfter}</strong>
                      </td>
                      <td>
                        <span className="badge bg-success bg-opacity-25 text-success">
                          {tx.status || 'COMPLETED'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
