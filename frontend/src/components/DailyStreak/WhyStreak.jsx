import React from 'react';
import { Activity, TrendingUp, Gift, ShieldCheck, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function WhyStreak() {
  const benefits = [
    {
      icon: <Activity size={22} className={styles.benefitIconCyan} />,
      badge: 'Active Bonus',
      title: 'Daily Compounding',
      description: 'Check in daily to build your multiplier and unlock higher reward tiers.'
    },
    {
      icon: <Gift size={22} className={styles.benefitIconGold} />,
      badge: 'Cash Vouchers',
      title: 'Real Amazon Vouchers',
      description: 'Earn instant ₹1, ₹2, and ₹5 Amazon Gift Card voucher codes automatically.'
    },
    {
      icon: <TrendingUp size={22} className={styles.benefitIconPurple} />,
      badge: 'Mid-Week Surge',
      title: 'Milestone Accelerators',
      description: 'Unlock surprise gift boxes on Day 4 and a +30 VEs Mega Surge on Day 6.'
    },
    {
      icon: <ShieldCheck size={22} className={styles.benefitIconGreen} />,
      badge: 'Grand Jackpot',
      title: '7-Day Grand Crown',
      description: 'Complete all 7 consecutive days to claim the grand prize and rollover cycles.'
    }
  ];

  return (
    <section className={styles.whyStreakSection}>
      <div className={styles.streakContainer}>
        {/* Header Title with Sparkles */}
        <div className={styles.whyHeader}>
          <span className={styles.sparkleIcon}>✦</span>
          <h2 className={styles.whyTitle}>Why Maintain Your Daily Streak?</h2>
          <span className={styles.sparkleIcon}>✦</span>
        </div>

        {/* 4 Benefits Cards Grid */}
        <div className={styles.whyGrid}>
          {benefits.map((benefit, idx) => (
            <div key={idx} className={styles.whyCard}>
              <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                <div className={styles.whyIconContainer}>
                  {benefit.icon}
                </div>
                <span className={styles.whyBadge}>{benefit.badge}</span>
              </div>
              <div className={styles.whyCardTitle}>{benefit.title}</div>
              <div className={styles.whyCardDesc}>{benefit.description}</div>
            </div>
          ))}
        </div>

        {/* Official Rewards Trust Strip */}
        <div className={styles.officialTrustStrip}>
          <div className="d-flex align-items-center gap-3">
            <div className={styles.vrBadge}>
              <span>VR</span>
            </div>
            <div>
              <div className={styles.trustTitle}>
                Official & Verified Rewards Engine on{' '}
                <span className="text-white fw-bold">VeloopRewards.in</span>
              </div>
              <div className={styles.trustSubtitle}>
                Instant digital payouts • Double-entry ledger audit • Authoritative IST midnight resets
              </div>
            </div>
          </div>

          <div className="d-none d-md-flex align-items-center gap-2">
            <span className={styles.verifiedSecurityPill}>
              <CheckCircle2 size={13} className="text-success" />
              <span>Anti-Tamper Secured</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
