import React from 'react';
import { Lock, Check, ChevronRight, Sparkles, Zap, Gift, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound } from '../../utils/audioEffects';
import {
  CoinsStackArtwork,
  GiftBoxArtwork,
  AmazonCardArtwork,
  CrownArtwork
} from './ArtworkIcons';
import styles from './DailyStreak.module.css';

export default function RewardCard({ item, onTriggerClaimFlow }) {
  const cardState = item.state || item.status;
  const isToday = cardState === 'TODAY' || cardState === 'AVAILABLE_TODAY';
  const isClaimed = cardState === 'CLAIMED';
  const isAvailable = cardState === 'AVAILABLE' || cardState === 'AVAILABLE_TODAY';
  const isMissed = cardState === 'MISSED';
  const isDay7 = item.day === 7;
  const isDay6 = item.day === 6;

  // Determine tag pill badge with descriptive tier names
  const renderTagPill = () => {
    if (isClaimed) {
      return (
        <div className={styles.claimedCheckBadge} title="Reward Claimed">
          <Check size={11} strokeWidth={3.5} />
        </div>
      );
    }
    if (isDay7) {
      return (
        <div className={styles.headerPillVip}>
          <Sparkles size={11} className="me-1" />
          VIP Crown
        </div>
      );
    }
    if (isDay6) {
      return (
        <div className={styles.headerPillSurge}>
          <Zap size={11} className="me-1" />
          Mega Surge
        </div>
      );
    }
    if (item.day === 5) {
      return (
        <div className={styles.headerPillTag}>
          <Gift size={11} className="me-1" />
          Amazon GC
        </div>
      );
    }
    if (item.day === 4) {
      return (
        <div className={styles.headerPillPurple}>
          <Gift size={11} className="me-1" />
          Gift Box
        </div>
      );
    }
    if (item.day === 3) {
      return (
        <div className={styles.headerPillCyan}>
          <Zap size={11} className="me-1" />
          Boost
        </div>
      );
    }
    return (
      <div className={styles.headerPillCoin}>
        Coin
      </div>
    );
  };

  // Render 3D artwork matching each ladder tier
  const renderArtwork = () => {
    if (isDay7) {
      return (
        <div className="animate-float animate-soft-shine d-flex align-items-center justify-content-center">
          <CrownArtwork size={62} />
        </div>
      );
    }
    if (item.day === 4) {
      return (
        <div className="animate-gentle-tilt animate-soft-shine d-flex align-items-center justify-content-center">
          <GiftBoxArtwork size={56} />
        </div>
      );
    }
    if (item.day === 5) {
      return (
        <div className="animate-gentle-tilt d-flex align-items-center justify-content-center">
          <AmazonCardArtwork size={58} />
        </div>
      );
    }
    if (isDay6) {
      return (
        <div className="animate-float animate-soft-shine d-flex align-items-center justify-content-center">
          <CoinsStackArtwork size={58} tier="mega" />
        </div>
      );
    }
    // Coins stack artwork for Days 1, 2, 3
    return (
      <div className="animate-float d-flex align-items-center justify-content-center">
        <CoinsStackArtwork size={54} tier="normal" />
      </div>
    );
  };

  const handleCardClick = () => {
    if (isAvailable) {
      playClickSound();
      onTriggerClaimFlow();
    }
  };

  const handleCardHover = (e) => {
    if (isDay7 && isAvailable) {
      try {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 16,
          spread: 45,
          origin: { x, y },
          colors: ['#ffd700', '#fbbf24', '#f59e0b', '#ffffff'],
          disableForReducedMotion: true
        });
      } catch {}
    }
  };

  // Card background styling based on state
  let cardClass = styles.rewardCardLocked;
  if (isClaimed) cardClass = styles.rewardCardClaimed;
  else if (isToday || isAvailable) cardClass = `${styles.rewardCardAvailable} animate-pulse-glow`;
  else if (isMissed) cardClass = styles.rewardCardMissed;

  return (
    <div
      className={`${styles.rewardCardItem} ${cardClass} ${isDay7 ? styles.rewardCardDay7 : ''}`}
      onClick={handleCardClick}
      onMouseEnter={handleCardHover}
      role={isAvailable ? 'button' : undefined}
      tabIndex={isAvailable ? 0 : undefined}
      aria-label={`Day ${item.day} reward: ${item.rewardType === 'AMAZON_GC' ? `₹${item.amount} Amazon Gift Card` : `${item.amount} VEs`}`}
    >
      {/* Today floating badge if currently actionable */}
      {isToday || isAvailable ? (
        <div className={styles.todayFloatingBadge}>
          <Sparkles size={11} className="me-1" />
          Today
        </div>
      ) : null}

      {/* Top Header Row with Dual Badges: [Day X] and [Tag / Check] */}
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
        {isDay7
          ? 'Grand Crown Jackpot'
          : isDay6
          ? 'Mega VE Surge'
          : item.rewardType === 'AMAZON_GC'
          ? 'Amazon Milestone'
          : 'Daily Check-in'}
      </div>

      {/* Amount Display */}
      <div
        className={`${styles.cardAmountValue} ${
          isClaimed
            ? styles.amountGreen
            : isDay7
            ? styles.amountGoldCrown
            : isToday || isAvailable
            ? styles.amountGold
            : item.rewardType === 'AMAZON_GC'
            ? styles.amountAmazon
            : styles.amountCyan
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
            <Check size={13} strokeWidth={3.2} />
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
            <ChevronRight size={14} strokeWidth={3} />
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
