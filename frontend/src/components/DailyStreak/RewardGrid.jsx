import React from 'react';
import { Sparkles, Gift } from 'lucide-react';
import RewardCard from './RewardCard';
import styles from './DailyStreak.module.css';

export default function RewardGrid({ streakLadder, onTriggerClaimFlow }) {
  if (!streakLadder || !streakLadder.length) {
    return (
      <div className={styles.streakContainer}>
        <div className={styles.rewardCardsGrid}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="skeleton-box" style={{ height: '230px' }}></div>
          ))}
        </div>
      </div>
    );
  }

  const topRow = streakLadder.slice(0, 4); // Days 1, 2, 3, 4
  const bottomRow = streakLadder.slice(4, 7); // Days 5, 6, 7

  return (
    <section className={styles.rewardGridSection}>
      <div className={styles.streakContainer}>
        {/* Grid Section Header with Visual Polish */}
        <div className={styles.gridSectionHeader}>
          <div className="d-flex align-items-center gap-2">
            <Gift size={18} className="text-warning" />
            <h2 className={styles.gridSectionTitle}>7-Day Reward Ladder</h2>
          </div>
          <span className={styles.gridSectionSubtitle}>
            Claim daily to maintain your multiplier & unlock the ₹5 Amazon Crown
          </span>
        </div>

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
