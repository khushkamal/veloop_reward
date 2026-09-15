import React from 'react';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import styles from './DailyStreak.module.css';

export default function RewardCard({ item, onTriggerClaimFlow }) {
  const cardState = item.state || item.status;
  const isToday = cardState === 'TODAY';
  const isClaimed = cardState === 'CLAIMED';
  const isAvailable = cardState === 'AVAILABLE' || cardState === 'AVAILABLE_TODAY';
  const isMissed = cardState === 'MISSED';
  const isDay7 = item.day === 7;

  // Determine top badge
  const renderBadge = () => {
    if (isClaimed && item.day === 1) {
      return (
        <div className={styles.claimedCheckBadge}>
          <Check size={11} strokeWidth={3.5} />
        </div>
      );
    }
    if (isToday || isAvailable) {
      return <div className={styles.todayBadge}>Today</div>;
    }
    if (item.day === 5) {
      return <div className={styles.tagBadge}>Gift Card</div>;
    }
    if (item.day === 6) {
      return <div className={styles.tagBadge}>Coin</div>;
    }
    if (isDay7) {
      return <div className={styles.vipBadge}>VIP</div>;
    }
    return null;
  };

  // Render 3D artwork icon matching the reference
  const renderArtwork = () => {
    if (isDay7) {
      return (
        <div className={`${styles.crownArtwork} animate-soft-shine animate-float`}>
          <div className={styles.crownMini}>
            <div className={styles.crownMiniBase}></div>
            <div className={styles.crownMiniJewel}></div>
          </div>
        </div>
      );
    }
    if (item.day === 4) {
      return (
        <div className={`${styles.giftArtwork} animate-gentle-tilt animate-soft-shine`}>
          <div className={styles.giftMiniBox}>
            <div className={styles.giftMiniLid}></div>
            <div className={styles.giftMiniRibbon}></div>
          </div>
        </div>
      );
    }
    if (item.day === 5) {
      return (
        <div className={`${styles.amazonArtwork} animate-gentle-tilt`}>
          <div className={styles.amazonCardMini}>
            <span className={styles.amazonCardA}>a</span>
            <div className={styles.amazonSmile}></div>
          </div>
        </div>
      );
    }
    // Coins stack artwork for Days 1, 2, 3, 6
    return (
      <div className={styles.coinsStackArtwork}>
        <div className={styles.coin1}></div>
        <div className={styles.coin2}></div>
        <div className={styles.coin3}></div>
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
      {/* Top Badge (Today / VIP / Gift Card / Coin / Check) */}
      {renderBadge()}

      {/* Day Number Header */}
      <div className={styles.cardDayTitle}>Day {item.day}</div>

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
            : isToday || isAvailable
            ? styles.amountGold
            : item.day === 3
            ? styles.amountPurple
            : item.day === 4
            ? styles.amountViolet
            : styles.amountGold
        }`}
      >
        {item.rewardType === 'AMAZON_GC' ? `₹${item.amount}` : `+${item.amount}`}
      </div>

      {/* Currency / Reward Unit */}
      <div className={styles.cardCurrencyLabel}>
        {item.rewardType === 'AMAZON_GC' ? 'Amazon Gift Card' : `${item.amount} VEs`}
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
            <span>Claim Now</span>
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
