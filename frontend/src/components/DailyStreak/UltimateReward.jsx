import React from 'react';
import { Lock } from 'lucide-react';
import { CrownArtwork, AmazonBrandLogo } from './ArtworkIcons';
import styles from './DailyStreak.module.css';

export default function UltimateReward({ ultimateReward, alreadyClaimed, countdownText }) {
  const amount = ultimateReward?.amount || 5;
  const unlockDay = ultimateReward?.unlockDay || 7;

  return (
    <div className={styles.ultimateRewardBanner}>
      <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-3">
        {/* Left: 3D Crown Artwork */}
        <div className="d-flex align-items-center gap-3">
          <div className="animate-float animate-soft-shine d-flex align-items-center justify-content-center">
            <CrownArtwork size={74} />
          </div>

          {/* Center Info */}
          <div className={styles.ultimateInfoText}>
            <div className={styles.ultimateTag}>Ultimate Reward</div>
            <div className={styles.ultimateValRow}>
              <span className={styles.ultimateRupeeVal}>₹{amount}</span>
              <AmazonBrandLogo className="ms-2" />
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
