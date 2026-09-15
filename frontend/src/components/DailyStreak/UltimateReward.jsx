import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function UltimateReward({ ultimateReward }) {
  if (!ultimateReward) return null;

  return (
    <div className={styles.ultimateRewardCard}>
      <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-3">
          <div className={`${styles.ultimateIcon} animate-soft-shine animate-float`}>
            <Crown size={26} strokeWidth={2.4} />
          </div>
          <div>
            <div className={styles.ultimateBadge}>
              <Sparkles size={11} />
              <span>ULTIMATE REWARD</span>
            </div>
            <div className={styles.ultimateMainValue}>
              <span className={styles.ultimateAmount}>₹{ultimateReward.amount || 5}</span>
              <span className={styles.ultimateGiftText}>Amazon Gift Card</span>
            </div>
            <div className={styles.ultimateSubtitle}>
              Unlock on Day {ultimateReward.unlockDay || 7}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
