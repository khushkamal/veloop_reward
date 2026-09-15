import React from 'react';
import { Award } from 'lucide-react';
import RewardCard from './RewardCard';
import styles from './DailyStreak.module.css';

export default function RewardGrid({ streakLadder, onTriggerClaimFlow }) {
  if (!streakLadder || !streakLadder.length) {
    return (
      <div className="container py-3">
        <div className={styles.ladderGrid}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="skeleton-box" style={{ height: '180px' }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={styles.ladderSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Award className="text-primary" size={24} />
            <span>7-Day Streak Rewards Ladder</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Complete consecutive daily check-ins to advance through the ladder. Rewards scale in
            value with milestone Amazon Gift Cards on Days 4, 5, and 7.
          </p>
        </div>

        <div className={styles.ladderGrid}>
          {streakLadder.map((item) => (
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
