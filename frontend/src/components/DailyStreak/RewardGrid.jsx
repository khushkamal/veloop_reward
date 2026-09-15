import React from 'react';
import RewardCard from './RewardCard';
import styles from './DailyStreak.module.css';

export default function RewardGrid({ streakLadder, onTriggerClaimFlow }) {
  if (!streakLadder || !streakLadder.length) {
    return (
      <div className="container py-3">
        <div className={styles.rewardCardsGrid}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="skeleton-box" style={{ height: '210px' }}></div>
          ))}
        </div>
      </div>
    );
  }

  const topRow = streakLadder.slice(0, 4); // Days 1, 2, 3, 4
  const bottomRow = streakLadder.slice(4, 7); // Days 5, 6, 7

  return (
    <section className={styles.rewardGridSection}>
      <div className="container">
        {/* Top Row: Days 1 to 4 */}
        <div className={styles.rewardGridTop}>
          {topRow.map((item) => (
            <RewardCard
              key={item.day}
              item={item}
              onTriggerClaimFlow={onTriggerClaimFlow}
            />
          ))}
        </div>

        {/* Bottom Row: Days 5 to 7 */}
        <div className={styles.rewardGridBottom}>
          {bottomRow.map((item) => (
            <RewardCard
              key={item.day}
              item={item}
              onTriggerClaimFlow={onTriggerClaimFlow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
