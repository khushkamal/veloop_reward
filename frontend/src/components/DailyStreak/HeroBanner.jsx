import React, { useState, useEffect } from 'react';
import { Flame, Clock, Lock, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import StreakStats from './StreakStats';
import UltimateReward from './UltimateReward';
import styles from './DailyStreak.module.css';

export default function HeroBanner({ streakStatus, actionLoading, onTriggerClaimFlow, onCountdownComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(streakStatus?.countdownSeconds || 0);

  // Synchronize and countdown based strictly on backend serverTime and nextClaimAt
  useEffect(() => {
    if (!streakStatus) return;

    const nextTimestamp = streakStatus.nextClaimAt || streakStatus.nextClaimAvailableAt;

    if (streakStatus.alreadyClaimedToday && nextTimestamp) {
      const targetTime = new Date(nextTimestamp).getTime();
      const serverTimestamp = streakStatus.serverTime ? new Date(streakStatus.serverTime).getTime() : Date.now();
      const clientServerOffset = serverTimestamp - Date.now(); // Clock skew compensation
      let triggeredRefresh = false;

      const calcRemaining = () => {
        const currentEffectiveServerTime = Date.now() + clientServerOffset;
        const diff = Math.max(0, Math.floor((targetTime - currentEffectiveServerTime) / 1000));
        setSecondsLeft(diff);

        // When visual timer hits zero: request fresh status from backend
        if (diff === 0 && !triggeredRefresh) {
          triggeredRefresh = true;
          if (onCountdownComplete) {
            onCountdownComplete();
          }
        }
      };

      calcRemaining();
      const interval = setInterval(calcRemaining, 1000);
      return () => clearInterval(interval);
    } else {
      setSecondsLeft(0);
    }
  }, [streakStatus, onCountdownComplete]);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSec) => {
    if (totalSec <= 0) return '00 : 00 : 00';
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${hrs}h : ${mins}m : ${secs}s`;
  };

  const currentStreak = streakStatus?.currentStreak || 0;
  const canClaim = streakStatus?.canClaim;
  const alreadyClaimed = streakStatus?.alreadyClaimedToday;
  const isStreakBroken = streakStatus?.isStreakBroken;
  const nextReward = streakStatus?.nextReward;

  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroCard}>
          <div className="row align-items-center g-4">
            {/* Left Column: Flame Badge, Title, CTA, Stats */}
            <div className="col-lg-7">
              {/* Flame Badge */}
              <div className={styles.streakFlameBadge}>
                <Flame size={18} strokeWidth={2.4} className={styles.flameIcon} />
                <span>
                  {currentStreak > 0
                    ? `${currentStreak}-Day Active Streak 🔥`
                    : 'Start Your Daily Streak'}
                </span>
              </div>

              {/* Broken Streak Warning */}
              {isStreakBroken && (
                <div className={styles.brokenNotice}>
                  <AlertTriangle size={18} />
                  <span>
                    You missed yesterday! Your streak was reset to Day 1. Claim now to rebuild!
                  </span>
                </div>
              )}

              {/* Main Heading */}
              <h1 className={styles.title}>
                Claim Daily <span className="text-gradient-cyan">Rewards</span> &{' '}
                <span className="text-gradient-gold">Amazon Vouchers</span>
              </h1>

              <p className={styles.subtitle}>
                Check in consecutive days to earn bonus VEs and milestone Amazon Gift Cards. Strict
                server validation ensures reliable rewards progression.
              </p>

              {/* CTA Action Area */}
              <div className="d-flex flex-wrap align-items-center gap-3">
                {canClaim ? (
                  <button
                    className={`${styles.ctaBtnClaim} animate-pulse-glow`}
                    onClick={() => {
                      playClickSound();
                      onTriggerClaimFlow();
                    }}
                    disabled={actionLoading}
                  >
                    <Sparkles size={20} />
                    <span>
                      {actionLoading
                        ? 'Validating Claim...'
                        : `Claim Day ${streakStatus?.nextDayIndex} Reward (${nextReward?.displayName || 'Claim'})`}
                    </span>
                  </button>
                ) : alreadyClaimed ? (
                  <button className={styles.ctaBtnLocked} disabled>
                    <CheckCircle2 size={20} className="text-success" />
                    <span>Today's Reward Claimed</span>
                  </button>
                ) : (
                  <button className={styles.ctaBtnLocked} disabled>
                    <Lock size={20} />
                    <span>Reward Locked</span>
                  </button>
                )}
              </div>

              {/* Backend-Driven Stats */}
              <StreakStats streakStatus={streakStatus} />
            </div>

            {/* Right Column: Countdown Box & Ultimate Reward Snapshot */}
            <div className="col-lg-5">
              <div className={styles.countdownBox} style={{ width: '100%' }}>
                <div className={styles.countdownLabel}>
                  <Clock size={16} strokeWidth={2.4} />
                  <span>
                    {alreadyClaimed ? 'Next Claim Window Unlocks In' : 'Claim Window Status'}
                  </span>
                </div>

                <div className={styles.timerDigits}>
                  {alreadyClaimed ? formatTime(secondsLeft) : 'READY TO CLAIM!'}
                </div>

                <div className="text-muted small mt-1">
                  {alreadyClaimed
                    ? 'Resets automatically at server midnight (IST)'
                    : `Next in line: ${nextReward?.displayName || '+5 VEs'}`}
                </div>
              </div>

              {/* Large Backend-Driven Ultimate Reward */}
              <UltimateReward ultimateReward={streakStatus?.ultimateReward} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
