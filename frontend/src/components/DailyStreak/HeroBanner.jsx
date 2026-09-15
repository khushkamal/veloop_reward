import React, { useState, useEffect } from 'react';
import { Flame, Clock, Lock, CheckCircle2, AlertTriangle, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import { CalendarArtwork, GiftBoxArtwork } from './ArtworkIcons';
import StreakStats from './StreakStats';
import UltimateReward from './UltimateReward';
import styles from './DailyStreak.module.css';

export default function HeroBanner({
  streakStatus,
  actionLoading,
  onTriggerClaimFlow,
  onCountdownComplete,
  onToggleCalendar
}) {
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
    if (totalSec <= 0) return '00:00:00';
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const currentStreak = streakStatus?.currentStreak || 0;
  const canClaim = streakStatus?.canClaim;
  const alreadyClaimed = streakStatus?.alreadyClaimedToday;
  const isStreakBroken = streakStatus?.isStreakBroken;
  const nextReward = streakStatus?.nextReward;

  return (
    <section className={styles.heroSection}>
      <div className="container">
        {/* Top Hero Banner with 3D Artwork Illustration */}
        <div className={styles.heroMainBanner}>
          <div className="row align-items-center justify-content-between g-3">
            {/* Left 3D Calendar Artwork */}
            <div className="col-auto d-none d-md-flex align-items-center justify-content-center">
              <div className="animate-float">
                <CalendarArtwork size={76} />
              </div>
            </div>

            {/* Middle Content: Title, Subtitle, CTA */}
            <div className="col text-center px-lg-4">
              <h1 className={styles.heroHeading}>
                Login Daily & Earn <span className={styles.heroGoldText}>Bigger Rewards!</span>
              </h1>
              <p className={styles.heroSubText}>
                Maintain your streak and unlock exciting rewards every day.
              </p>

              {/* Action Claim Button */}
              {canClaim && (
                <div className="mt-3">
                  <button
                    className={`${styles.mainClaimBtn} animate-pulse-glow`}
                    onClick={() => {
                      playClickSound();
                      onTriggerClaimFlow();
                    }}
                    disabled={actionLoading}
                  >
                    <Sparkles size={18} />
                    <span>
                      {actionLoading
                        ? 'Validating Claim...'
                        : `Claim Day ${streakStatus?.nextDayIndex} Reward (${nextReward?.displayName || 'Claim Now'})`}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Right 3D Gift Box Artwork */}
            <div className="col-auto d-none d-md-flex align-items-center justify-content-center">
              <div className="animate-float" style={{ animationDelay: '1.5s' }}>
                <GiftBoxArtwork size={76} />
              </div>
            </div>
          </div>
        </div>

        {/* Broken Streak Warning if any */}
        {isStreakBroken && (
          <div className={styles.brokenNotice}>
            <AlertTriangle size={18} />
            <span>
              You missed yesterday! Your streak was reset to Day 1. Claim now to rebuild your rewards!
            </span>
          </div>
        )}

        {/* Streak Indicator & Calendar Action Bar */}
        <div className={styles.streakActionBar}>
          <div className={styles.streakIndicatorPill}>
            <Flame size={18} strokeWidth={2.4} className={styles.flameIcon} />
            <span>
              {currentStreak > 0
                ? `${currentStreak} Day Streak`
                : '1 Day Streak'}
            </span>
          </div>

          <button
            className={styles.calendarActionBtn}
            onClick={() => {
              playClickSound();
              if (onToggleCalendar) onToggleCalendar();
            }}
          >
            <Calendar size={15} />
            <span>Streak Calendar</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Statistics 3-Card Row */}
        <StreakStats streakStatus={streakStatus} />

        {/* Ultimate Reward Banner */}
        <UltimateReward
          ultimateReward={streakStatus?.ultimateReward}
          alreadyClaimed={alreadyClaimed}
          countdownText={formatTime(secondsLeft)}
        />

        {/* Decorative Separator */}
        <div className={styles.decorativeSeparator}>
          <span className={styles.sparkleIcon}>✦</span>
          <span>
            {alreadyClaimed
              ? `Next claim unlocks in ${formatTime(secondsLeft)} • Come back tomorrow for more rewards!`
              : 'Come back tomorrow for more rewards!'}
          </span>
          <span className={styles.sparkleIcon}>✦</span>
        </div>
      </div>
    </section>
  );
}
