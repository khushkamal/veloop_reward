import React from 'react';
import { Lock, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CrownArtwork, AmazonBrandLogo } from './ArtworkIcons';
import { playClickSound } from '../../utils/audioEffects';
import styles from './DailyStreak.module.css';

export default function UltimateReward({
  ultimateReward,
  currentStreak = 0,
  canClaim = false,
  onTriggerClaimFlow
}) {
  const amount = ultimateReward?.amount || 5;
  const unlockDay = ultimateReward?.unlockDay || 7;
  const daysRemaining = Math.max(0, unlockDay - currentStreak);
  const isReady = currentStreak >= 6 && canClaim;

  const handleConfetti = (e) => {
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { x, y },
        colors: ['#ffd700', '#fbbf24', '#f59e0b', '#c084fc', '#ffffff'],
        disableForReducedMotion: true
      });
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div
      className={styles.ultimateRewardBanner}
      onMouseEnter={handleConfetti}
    >
      <div className={styles.ultimateAmbientGlow}></div>

      <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-3 position-relative" style={{ zIndex: 2 }}>
        {/* Left: 3D Crown Artwork & Highlight Info */}
        <div className="d-flex align-items-center gap-3">
          <div className="animate-float animate-soft-shine d-flex align-items-center justify-content-center flex-shrink-0">
            <CrownArtwork size={66} />
          </div>

          <div className={styles.ultimateInfoText}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className={styles.ultimateTag}>
                <Trophy size={13} className="text-warning me-1" />
                Ultimate 7-Day Jackpot
              </span>
              <span className={styles.ultimateVipPill}>VIP Reward</span>
            </div>

            <div className={styles.ultimateValRow}>
              <span className={styles.ultimateRupeeVal}>₹{amount}</span>
              <AmazonBrandLogo className="ms-1" />
            </div>

            <p className={styles.ultimateSubDesc}>
              Complete your 7-day streak cycle to instantly unlock this voucher code.
            </p>
          </div>
        </div>

        {/* Right: Dynamic Unlock Status or Direct Claim */}
        <div className={styles.ultimateLockStatus}>
          {isReady ? (
            <button
              className={styles.ultimateClaimReadyBtn}
              onClick={() => {
                playClickSound();
                if (onTriggerClaimFlow) onTriggerClaimFlow();
              }}
            >
              <Sparkles size={16} />
              <span>Claim Crown Now!</span>
            </button>
          ) : (
            <div className={styles.ultimateLockBadge}>
              <div className={styles.lockIconBox}>
                <Lock size={15} strokeWidth={2.4} />
              </div>
              <div className="d-flex flex-column text-start">
                <span className={styles.unlockDayLabel}>Unlocks on Day {unlockDay}</span>
                <span className={styles.unlockSubLabel}>
                  {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Next cycle milestone'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
