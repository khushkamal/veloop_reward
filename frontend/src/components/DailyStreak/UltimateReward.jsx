import React from 'react';
import { Crown } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function UltimateReward({ ultimateReward }) {
  if (!ultimateReward) return null;

  return (
    <div className={styles.ultimateRewardCard}>
      <div className="d-flex align-items-center gap-3">
        <div className={`${styles.ultimateIcon} animate-soft-shine animate-float`}>
          <Crown size={24} strokeWidth={2.4} />
        </div>
        <div>
          <div className="badge bg-warning text-dark fw-bold mb-1" style={{ fontSize: '0.65rem' }}>
            DAY {ultimateReward.unlockDay || 7} ULTIMATE REWARD
          </div>
          <div className={styles.ultimateTitle}>{ultimateReward.title}</div>
          <div className={styles.ultimateSubtitle}>
            {ultimateReward.description || 'Grand Streak Completion Prize'}
          </div>
        </div>
      </div>
    </div>
  );
}
