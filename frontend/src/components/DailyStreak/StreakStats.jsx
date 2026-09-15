import React from 'react';
import { Trophy, Sparkles, Flame, Award } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function StreakStats({ streakStatus }) {
  const currentStreak = streakStatus?.currentStreak || 0;
  const nextReward = streakStatus?.nextReward;
  const checkedIn = streakStatus?.stats?.checkedIn ?? currentStreak;
  const totalRewards = streakStatus?.stats?.totalRewards ?? 7;

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statItem}>
        <div className={styles.statIcon}>
          <Award size={18} strokeWidth={2.4} />
        </div>
        <div>
          <div className={styles.statValue}>{totalRewards}</div>
          <div className={styles.statLabel}>Total Rewards</div>
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statIcon}>
          <Trophy size={18} strokeWidth={2.4} />
        </div>
        <div>
          <div className={styles.statValue}>
            {checkedIn} / {totalRewards}
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
