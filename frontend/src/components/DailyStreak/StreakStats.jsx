import React from 'react';
import { Gift, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function StreakStats({ streakStatus }) {
  const currentStreak = streakStatus?.currentStreak || 0;
  const alreadyClaimed = streakStatus?.alreadyClaimedToday;
  const checkedIn = streakStatus?.stats?.checkedIn ?? (alreadyClaimed ? currentStreak : currentStreak);
  const totalRewards = streakStatus?.stats?.totalRewards ?? 7;
  const nextReward = streakStatus?.nextReward;

  // Next reward description
  const nextRewardTitle =
    streakStatus?.stats?.nextReward?.title ||
    nextReward?.displayName ||
    (currentStreak === 0 ? '+5 VEs' : currentStreak >= 6 ? '₹5 Amazon GC' : '+10 VEs');

  return (
    <div className={styles.statsCardRow}>
      {/* Stat 1: Cycle Progress */}
      <div className={styles.statBox}>
        <div className={`${styles.statIconBadge} ${styles.statGreenBg}`}>
          <CheckCircle2 size={20} strokeWidth={2.5} />
        </div>
        <div className={styles.statInfo}>
          <div className={styles.statLabelText}>Checked In</div>
          <div className="d-flex align-items-baseline gap-1.5">
            <span className={styles.statNumberText}>{checkedIn}</span>
            <span className={styles.statTotalText}>/ {totalRewards} Days</span>
          </div>
          <div className={styles.statSubText}>
            {checkedIn >= 7 ? 'Full Cycle Completed! 🏆' : `${7 - checkedIn} days to Grand Crown`}
          </div>
        </div>
      </div>

      {/* Stat 2: Active Streak Level */}
      <div className={styles.statBox}>
        <div className={`${styles.statIconBadge} ${styles.statOrangeBg}`}>
          <Flame size={20} strokeWidth={2.6} className="animate-flame" />
        </div>
        <div className={styles.statInfo}>
          <div className={styles.statLabelText}>Current Streak</div>
          <div className={styles.statNumberText}>
            {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
          </div>
          <div className={styles.statSubText}>
            {currentStreak >= 3 ? '🔥 Hot Streak Active' : 'Keep checking in daily'}
          </div>
        </div>
      </div>

      {/* Stat 3: Next Upcoming Reward */}
      <div className={styles.statBox}>
        <div className={`${styles.statIconBadge} ${styles.statGoldBg}`}>
          <Sparkles size={20} strokeWidth={2.4} />
        </div>
        <div className={styles.statInfo}>
          <div className={styles.statLabelText}>Next Reward</div>
          <div className={styles.statHighlightText}>
            {nextRewardTitle}
          </div>
          <div className={styles.statSubText}>
            {alreadyClaimed ? 'Unlocks at Midnight' : 'Available to Claim Now'}
          </div>
        </div>
      </div>
    </div>
  );
}
