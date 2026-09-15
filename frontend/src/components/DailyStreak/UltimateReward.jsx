import React from 'react';
import { Lock } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function UltimateReward({ ultimateReward, alreadyClaimed, countdownText }) {
  const amount = ultimateReward?.amount || 5;
  const unlockDay = ultimateReward?.unlockDay || 7;

  return (
    <div className={styles.ultimateRewardBanner}>
      <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-3">
        {/* Left: 3D Crown Icon */}
        <div className="d-flex align-items-center gap-3">
          <div className={`${styles.crownIconContainer} animate-soft-shine animate-float`}>
            <div className={styles.crown3D}>
              <div className={styles.crownBase}>
                <div className={styles.crownJewelCenter}></div>
                <div className={styles.crownJewelLeft}></div>
                <div className={styles.crownJewelRight}></div>
              </div>
            </div>
            <div className={styles.crownStars}>✦</div>
          </div>

          {/* Center Info */}
          <div className={styles.ultimateInfoText}>
            <div className={styles.ultimateTag}>Ultimate Reward</div>
            <div className={styles.ultimateValRow}>
              <span className={styles.ultimateRupeeVal}>₹{amount}</span>
              <div className={styles.amazonCardBrand}>
                <span className={styles.amazonA}>a</span>
                <span className={styles.amazonText}>Amazon Gift Card</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Unlock on Day 7 / Lock Status */}
        <div className={styles.ultimateLockStatus}>
          <div className={styles.lockIconBox}>
            <Lock size={16} strokeWidth={2.4} />
          </div>
          <div className={styles.unlockDayLabel}>Unlock on Day {unlockDay}</div>
        </div>
      </div>
    </div>
  );
}
