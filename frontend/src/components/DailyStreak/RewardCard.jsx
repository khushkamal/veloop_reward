import React from 'react';
import { Coins, Gift, Crown, Check, Lock, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import styles from './DailyStreak.module.css';

export default function RewardCard({ item, onTriggerClaimFlow }) {
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

  const getIcon = () => {
    if (item.badgeType === 'grand_gift_card' || item.day === 7) {
      return <Crown size={26} strokeWidth={2.4} />;
    }
    if (item.rewardType === 'AMAZON_GC') {
      return <Gift size={24} strokeWidth={2.4} />;
    }
    return <Coins size={24} strokeWidth={2.4} />;
  };

  const getIconClass = () => {
    if (item.badgeType === 'grand_gift_card' || item.day === 7) return styles.grandIconBg;
    if (item.rewardType === 'AMAZON_GC') return styles.giftIconBg;
    return styles.coinIconBg;
  };

  return (
    <div
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
      {/* Grand Tag */}
      {isGrand && <div className={styles.grandTag}>Grand Prize</div>}

      <div className={styles.dayHeader}>Day {item.day}</div>

      <div
        className={`${styles.iconWrapper} ${getIconClass()} ${
          item.day === 7 ? 'animate-soft-shine animate-float' : item.rewardType === 'AMAZON_GC' ? 'animate-gentle-tilt' : ''
        }`}
      >
        {getIcon()}
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
}
