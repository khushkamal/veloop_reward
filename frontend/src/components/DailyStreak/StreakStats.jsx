import React from 'react';
import { Gift, Check, Star } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function StreakStats({ streakStatus }) {
  const currentStreak = streakStatus?.currentStreak || 0;
  const nextReward = streakStatus?.nextReward;
  const checkedIn = streakStatus?.stats?.checkedIn ?? (streakStatus?.alreadyClaimedToday ? currentStreak : currentStreak);
  const totalRewards = streakStatus?.stats?.totalRewards ?? 7;

  return (
    <div className={styles.statsCardRow}>
      {/* Stat 1: Total Rewards */}
      <div className={styles.statBox}>
        <div className={`${styles.statIconBadge} ${styles.statPurpleBg}`}>
          <Gift size={18} strokeWidth={2.4} />
        </div>
        <div className={styles.statInfo}>
          <div className={styles.statLabelText}>Total Rewards</div>
          <div className={styles.statNumberText}>{totalRewards}</div>
        </div>
      </div>

      {/* Stat 2: Checked In */}
      <div className={styles.statBox}>
        <div className={`${styles.statIconBadge} ${styles.statGreenBg}`}>
          <Check size={18} strokeWidth={3} />
        </div>
        <div className={styles.statInfo}>
          <div className={styles.statLabelText}>Checked In</div>
          <div className={styles.statNumberText}>{checkedIn}</div>
        </div>
      </div>

      {/* Stat 3: Next Reward */}
      <div className={styles.statBox}>
        <div className={`${styles.statIconBadge} ${styles.statGoldBg}`}>
          <Star size={18} strokeWidth={2.4} />
        </div>
        <div className={styles.statInfo}>
          <div className={styles.statLabelText}>Next Reward</div>
          <div className={styles.statHighlightText}>
            {streakStatus?.stats?.nextReward?.title || nextReward?.displayName || '+10 VEs'}
          </div>
        </div>
      </div>
    </div>
  );
}
