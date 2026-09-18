import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Coins,
  Gift,
  Check
} from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import styles from './GuestLandingCard.module.css';

const STREAK_STEPS = [
  { day: 1, label: 'Day 1', status: 'active' },
  { day: 2, label: 'Day 2', status: 'active' },
  { day: 3, label: 'Day 3', status: 'active' },
  { day: 4, label: 'Day 4', status: 'active' },
  { day: 5, label: 'Day 5', status: 'active' },
  { day: 6, label: 'Day 6', status: 'upcoming' },
  { day: 7, label: 'Day 7', status: 'milestone', isMilestone: true }
];

export default function GuestLandingCard({ onDemoLogin, onOpenAuth }) {
  return (
    <section className={styles.landingWrapper} aria-label="Daily Streak Rewards">
      {/* Soft atmospheric radial glow */}
      <div className={styles.ambientGlow} />

      {/* Floating subtle reward micro-accents */}
      <div className={`${styles.microBadge} ${styles.badgeCoins}`} aria-hidden="true">
        <Coins size={15} className={styles.coinIcon} />
        <span>+100 VEs</span>
      </div>

      <div className={`${styles.microBadge} ${styles.badgeGift}`} aria-hidden="true">
        <Gift size={15} className={styles.giftIcon} />
        <span>₹500 Amazon GC</span>
      </div>

      {/* Main Centered Hero Card */}
      <div className={styles.heroCard}>
        {/* Top Flame Streak Icon */}
        <div className={styles.flameContainer} aria-hidden="true">
          <div className={styles.flameBox}>
            <Flame size={32} className={styles.flameIcon} strokeWidth={2.4} />
          </div>
        </div>

        {/* Eyebrow */}
        <span className={styles.eyebrow}>DAILY REWARDS</span>

        {/* Headline */}
        <h1 className={styles.headline}>
          VELooP Rewards{' '}
          <span className={styles.headlineAccent}>Daily Streak System</span>
        </h1>

        {/* Supporting Description */}
        <p className={styles.description}>
          Build your streak, earn VEs, and unlock milestone rewards.
        </p>

        {/* Compact 7-Day Streak Indicator Track */}
        <div className={styles.streakTrackWrapper} aria-label="7-Day Streak Preview">
          <div className={styles.streakLine} />
          <div className={styles.streakNodes}>
            {STREAK_STEPS.map((step) => (
              <div
                key={step.day}
                className={`${styles.streakNode} ${
                  step.isMilestone
                    ? styles.nodeMilestone
                    : step.status === 'active'
                    ? styles.nodeActive
                    : styles.nodeUpcoming
                }`}
              >
                <div className={styles.nodeCircle}>
                  {step.isMilestone ? (
                    <Gift size={14} className={styles.milestoneGiftIcon} />
                  ) : step.status === 'active' ? (
                    <div className={styles.activeDot} />
                  ) : (
                    <div className={styles.inactiveDot} />
                  )}
                </div>
                <span className={styles.nodeDayLabel}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => {
              playClickSound();
              onDemoLogin();
            }}
          >
            <Sparkles size={17} className={styles.sparkleIcon} />
            <span>1-Click Evaluator Demo Login</span>
          </button>

          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => {
              playClickSound();
              onOpenAuth();
            }}
          >
            <span>Sign In / Register</span>
          </button>
        </div>

        {/* Consumer Benefits Trust Strip */}
        <div className={styles.benefitStrip}>
          <div className={styles.benefitItem}>
            <Check size={14} className={styles.checkIcon} strokeWidth={2.5} />
            <span>Secure Rewards</span>
          </div>

          <span className={styles.benefitDot} aria-hidden="true">•</span>

          <div className={styles.benefitItem}>
            <Check size={14} className={styles.checkIcon} strokeWidth={2.5} />
            <span>Verified Claims</span>
          </div>

          <span className={styles.benefitDot} aria-hidden="true">•</span>

          <div className={styles.benefitItem}>
            <Check size={14} className={styles.checkIcon} strokeWidth={2.5} />
            <span>Streak Tracking</span>
          </div>
        </div>
      </div>
    </section>
  );
}
