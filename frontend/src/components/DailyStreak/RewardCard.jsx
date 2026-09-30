import React from 'react';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import { CoinsStackArtwork, GiftBoxArtwork, AmazonCardArtwork, CrownArtwork } from './ArtworkIcons';
import styles from './DailyStreak.module.css';

export default function RewardCard({ item, onTriggerClaimFlow }) {
  const cardState = item.state || item.status;
  const isToday = cardState === 'TODAY' || cardState === 'AVAILABLE_TODAY';
  const isClaimed = cardState === 'CLAIMED';
  const isAvailable = cardState === 'AVAILABLE' || cardState === 'AVAILABLE_TODAY';
  const isMissed = cardState === 'MISSED';
  const isDay7 = item.day === 7;

  // Determine tag pill badge (VIP, Gift Card, Coin, or Checkmark)
  const renderTagPill = () => {
    if (isClaimed) {
      return (
        <div className={styles.claimedCheckBadge}>
          <Check size={11} strokeWidth={3.5} />
        </div>
      );
    }
    if (isDay7) {
      return <div className={styles.headerPillVip}>VIP</div>;
    }
    if (item.day === 5) {
      return <div className={styles.headerPillTag}>Gift Card</div>;
    }
    if (item.day === 6) {
      return <div className={styles.headerPillTag}>Coin</div>;
    }
    return null;
  };

  // Render 3D artwork icon matching the reference
  const renderArtwork = () => {
    if (isDay7) {
      return (
        <div className="animate-float animate-soft-shine d-flex align-items-center justify-content-center">
          <CrownArtwork size={56} />
        </div>
      );
    }
    if (item.day === 4) {
      return (
        <div className="animate-gentle-tilt animate-soft-shine d-flex align-items-center justify-content-center">
          <GiftBoxArtwork size={52} />
        </div>
      );
    }
    if (item.day === 5) {
      return (
        <div className="animate-gentle-tilt d-flex align-items-center justify-content-center">
          <AmazonCardArtwork size={54} />
        </div>
      );
    }
    // Coins stack artwork for Days 1, 2, 3, 6
    return (
      <div className="animate-float d-flex align-items-center justify-content-center">
        <CoinsStackArtwork size={52} />
      </div>
    );
  };

  // Card background state class
  let cardClass = styles.rewardCardLocked;
  if (isClaimed) cardClass = styles.rewardCardClaimed;
  else if (isToday || isAvailable) cardClass = `${styles.rewardCardAvailable} animate-pulse-glow`;
  else if (isMissed) cardClass = styles.rewardCardMissed;

  return (
    <div
      className={`${styles.rewardCardItem} ${cardClass} ${isDay7 ? styles.rewardCardDay7 : ''}`}
      onClick={() => {
        if (isAvailable) {
          playClickSound();
          onTriggerClaimFlow();
        }
      }}
      role={isAvailable ? 'button' : undefined}
      tabIndex={isAvailable ? 0 : undefined}
    >
      {/* Today floating badge if currently actionable/available today */}
      {isToday || isAvailable ? (
        <div className={styles.todayFloatingBadge}>Today</div>
      ) : null}

      {/* Top Header Row with Dual Badges: [Day X] and optional [Tag / Check] */}
      <div className={styles.cardHeaderRow}>
        <div className={isDay7 ? styles.headerPillDay7 : styles.headerPillDay}>
          Day {item.day}
        </div>
        {renderTagPill()}
      </div>

      {/* 3D Reward Artwork Asset */}
      <div className={styles.cardArtworkContainer}>
        {renderArtwork()}
      </div>

      {/* Reward Title / Subtitle */}
      <div className={styles.cardSubHeader}>
        {isDay7 ? 'Ultimate Reward' : 'Daily Reward'}
      </div>

      {/* Amount Display */}
      <div
        className={`${styles.cardAmountValue} ${
          isClaimed
            ? styles.amountGreen
            : isToday || isAvailable || isDay7
            ? styles.amountGold
            : styles.amountPurple
        }`}
      >
        {item.rewardType === 'AMAZON_GC' ? `₹${item.amount}` : `+${item.amount}`}
      </div>

      {/* Currency / Reward Unit */}
      <div className={styles.cardCurrencyLabel}>
        {item.rewardType === 'AMAZON_GC' ? 'Amazon Gift Card' : 'VEs Coins'}
      </div>

      {/* Status Action Pill */}
      <div className={styles.cardStatusContainer}>
        {isClaimed ? (
          <div className={styles.claimedPill}>
            <Check size={12} strokeWidth={3} />
            <span>Claimed</span>
          </div>
        ) : isToday || isAvailable ? (
          <button
            className={styles.claimNowBtn}
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              onTriggerClaimFlow();
            }}
          >
            <span>Claim Reward</span>
            <ChevronRight size={13} strokeWidth={3} />
          </button>
        ) : isMissed ? (
          <div className={styles.missedPill}>
            <span>⚠️ Missed</span>
          </div>
        ) : (
          <div className={styles.lockedPill}>
            <Lock size={12} strokeWidth={2.4} />
            <span>Locked</span>
          </div>
        )}
      </div>
    </div>
  );
}
