import React from 'react';
import { Trophy, Sparkles, Flame } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function StreakStats({ streakStatus }) {
  const currentStreak = streakStatus?.currentStreak || 0;
  const nextReward = streakStatus?.nextReward;

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statItem}>
        <div className={styles.statIcon}>
          <Trophy size={18} strokeWidth={2.4} />
        </div>
        <div>
          <div className={styles.statValue}>
            {streakStatus?.stats?.checkedIn ?? currentStreak} / {streakStatus?.stats?.totalRewards ?? 7}
          </div>
          <div className={styles.statLabel}>Checked In</div>
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statIcon}>
          <Sparkles size={18} strokeWidth={2.4} />
        </div>
        <div>
          <div className={styles.statValue}>
            {streakStatus?.stats?.nextReward?.title || nextReward?.displayName || '+5 VEs'}
          </div>
          <div className={styles.statLabel}>Next Reward</div>
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statIcon}>
          <Flame size={18} strokeWidth={2.4} />
        </div>
        <div>
          <div className={styles.statValue}>{streakStatus?.longestStreak || 0} Days</div>
          <div className={styles.statLabel}>Best Streak</div>
        </div>
      </div>
    </div>
  );
}
