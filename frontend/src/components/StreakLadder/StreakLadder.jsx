import React from 'react';
import { Coins, Gift, Crown, Check, Lock, Sparkles, Award } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import styles from './StreakLadder.module.css';

export default function StreakLadder({ streakLadder, onTriggerClaimFlow }) {
  if (!streakLadder || !streakLadder.length) {
    return (
      <div className="container py-4">
        <div className="row g-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="col">
              <div className="skeleton-box" style={{ height: '220px' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getIconComponent = (item) => {
    if (item.badgeType === 'grand_gift_card') {
      return <Crown size={28} />;
    }
    if (item.rewardType === 'AMAZON_GC') {
      return <Gift size={26} />;
    }
    return <Coins size={26} />;
  };

  const getIconClass = (item) => {
    if (item.badgeType === 'grand_gift_card') return styles.grandIconBg;
    if (item.rewardType === 'AMAZON_GC') return styles.giftIconBg;
    return styles.coinIconBg;
  };

  return (
    <section className={styles.ladderSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Award className="text-primary" />
            <span>7-Day Streak Rewards Ladder</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Complete consecutive daily check-ins to advance through the ladder. Rewards scale in
            value with milestone Amazon Gift Cards on Days 4, 5, and 7.
          </p>
        </div>

        <div className={styles.ladderGrid}>
          {streakLadder.map((item) => {
            const cardState = item.state || item.status;
            const isToday = cardState === 'TODAY';
            const isClaimed = cardState === 'CLAIMED';
            const isAvailable = cardState === 'AVAILABLE' || cardState === 'AVAILABLE_TODAY';
            const isMissed = cardState === 'MISSED';
            const isGrand = item.day === 7;

            let cardStateClass = styles.cardLocked;
            if (isToday) cardStateClass = styles.cardToday;
            else if (isClaimed) cardStateClass = styles.cardClaimed;
            else if (isAvailable) cardStateClass = `${styles.cardAvailable} animate-pulse-glow`;
            else if (isMissed) cardStateClass = styles.cardMissed;

            return (
              <div
                key={item.day}
                className={`${styles.dayCard} ${cardStateClass} ${isGrand ? styles.cardGrand : ''}`}
                onClick={() => {
                  if (isAvailable) {
                    playClickSound();
                    onTriggerClaimFlow();
                  }
                }}
                role={isAvailable ? 'button' : undefined}
                tabIndex={isAvailable ? 0 : undefined}
              >
                {/* Day 7 Grand Badge */}
                {isGrand && <div className={styles.grandTag}>Grand Prize</div>}

                <div className={styles.dayHeader}>Day {item.day}</div>

                <div className={`${styles.iconWrapper} ${getIconClass(item)}`}>
                  {getIconComponent(item)}
                </div>

                <div className={styles.rewardAmount}>{item.displayName || item.title}</div>
                <div className={styles.rewardLabel}>
                  {item.rewardType === 'AMAZON_GC' ? 'Amazon GC' : 'VELoop Points'}
                </div>

                {/* Status Pill */}
                <div className={styles.statusPill}>
                  {isToday ? (
                    <>
                      <Check size={12} strokeWidth={3} />
                      <span>Today's Claim</span>
                    </>
                  ) : isClaimed ? (
                    <>
                      <Check size={12} strokeWidth={3} />
                      <span>Claimed</span>
                    </>
                  ) : isAvailable ? (
                    <>
                      <Sparkles size={12} />
                      <span>Claim Reward</span>
                    </>
                  ) : isMissed ? (
                    <>
                      <span>⚠️ Missed</span>
                    </>
                  ) : (
                    <>
                      <Lock size={12} />
                      <span>Locked</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
