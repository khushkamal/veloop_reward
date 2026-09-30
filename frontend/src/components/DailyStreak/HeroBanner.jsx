import React, { useState, useEffect } from 'react';
import { Flame, Clock, Lock, CheckCircle2, AlertTriangle, Sparkles, Calendar, ChevronRight, Check } from 'lucide-react';
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

  // Streak Progression & Milestones
  const claimedCount = alreadyClaimed ? currentStreak : Math.max(0, currentStreak);
  const progressPercent = Math.min(100, Math.round((claimedCount / 7) * 100));
  const daysToJackpot = Math.max(0, 7 - claimedCount);

  // Dynamic milestone data from ladder configuration
  const ladder = streakStatus?.streakLadder || [];
  const day3Obj = ladder.find((r) => r.day === 3);
  const day5Obj = ladder.find((r) => r.day === 5);
  const day7Obj = streakStatus?.ultimateReward || ladder.find((r) => r.day === 7);

  const formatMilestoneReward = (item, fallback) => {
    if (!item) return fallback;
    if (item.rewardType === 'AMAZON_GC') {
      return `₹${item.amount} Amazon GC`;
    }
    return `+${item.amount} VEs`;
  };

  const day3RewardLabel = formatMilestoneReward(day3Obj, '+15 VEs');
  const day5RewardLabel = formatMilestoneReward(day5Obj, '₹2 Amazon GC');
  const day7RewardLabel = formatMilestoneReward(day7Obj, '₹5 Amazon GC');

  const milestoneList = [
    {
      day: 3,
      title: 'Day 3 Boost',
      reward: day3RewardLabel,
      icon: '⚡',
      isAchieved: claimedCount >= 3,
      isCurrent: claimedCount === 2 && canClaim
    },
    {
      day: 5,
      title: 'Day 5 Milestone',
      reward: day5RewardLabel,
      icon: '🎁',
      isAchieved: claimedCount >= 5,
      isCurrent: claimedCount === 4 && canClaim
    },
    {
      day: 7,
      title: 'Day 7 Grand Crown',
      reward: day7RewardLabel,
      icon: '👑',
      isAchieved: claimedCount >= 7,
      isCurrent: claimedCount === 6 && canClaim
    }
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.streakContainer}>
        {/* Top Hero Banner with 3D Artwork Illustration */}
        <div className={styles.heroMainBanner}>
          <div className="d-flex align-items-center justify-content-between g-2 g-md-3">
            {/* Left 3D Calendar Artwork */}
            <div className={`${styles.heroArtCol} d-flex align-items-center justify-content-center`}>
              <div className="animate-float">
                <CalendarArtwork size={74} className={styles.heroArtDesktop} />
                <CalendarArtwork size={52} className={styles.heroArtMobile} />
              </div>
            </div>

            {/* Middle Content: Title, Subtitle, CTA */}
            <div className={`${styles.heroTextCol} text-center px-2 px-md-3`}>
              <h1 className={styles.heroHeading}>
                Login Daily & Earn <span className={styles.heroGoldText}>Bigger Rewards!</span>
              </h1>
              <p className={styles.heroSubText}>
                Maintain your streak and unlock exciting rewards every day.
              </p>

              {/* Action Claim Button (if today's claim is available) */}
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

              {/* Live Countdown Timer (if already claimed today) */}
              {alreadyClaimed && (
                <div className="mt-3">
                  <div className={styles.countdownBadge}>
                    <Clock size={15} className={styles.clockIcon} />
                    <span>Next Claim In:</span>
                    <span className={styles.countdownTimer}>{formatTime(secondsLeft)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right 3D Gift Box Artwork */}
            <div className={`${styles.heroArtCol} d-flex align-items-center justify-content-center`}>
              <div className="animate-float" style={{ animationDelay: '1.2s' }}>
                <GiftBoxArtwork size={74} className={styles.heroArtDesktop} />
                <GiftBoxArtwork size={52} className={styles.heroArtMobile} />
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
            <div className={styles.flameWrapper}>
              <Flame size={19} strokeWidth={2.6} className={styles.flameIcon} />
            </div>
            <span className="fw-bold">
              {currentStreak > 0
                ? `${currentStreak} Day Streak`
                : '1 Day Streak'}
            </span>
            {currentStreak >= 3 && (
              <span className={styles.keepGoingText}>• On Fire! 🔥</span>
            )}
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

        {/* Streak Milestone Progress Bar */}
        <div className={styles.streakProgressContainer}>
          <div className={styles.progressHeader}>
            <div className="d-flex align-items-center gap-2">
              <span className={styles.progressTitle}>Streak Milestone Progress</span>
              <span className={styles.progressPercentPill}>{progressPercent}% Complete</span>
            </div>
            <div className={styles.progressNextMilestone}>
              <Sparkles size={13} className="text-warning" />
              <span>{daysToJackpot > 0 ? `${daysToJackpot} days to ${day7RewardLabel} Grand Crown` : '🏆 Grand Crown Unlocked!'}</span>
            </div>
          </div>

          {/* Animated Progress Bar Track */}
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${Math.max(6, progressPercent)}%` }}
            >
              <div className={styles.progressBarGlowHead}></div>
            </div>
          </div>

          {/* 3 Milestone Checkpoints */}
          <div className={styles.milestonesRow}>
            {milestoneList.map((m) => (
              <div
                key={m.day}
                className={`${styles.milestoneItem} ${m.isAchieved ? styles.milestoneAchieved : m.isCurrent ? styles.milestoneCurrent : styles.milestoneLocked}`}
              >
                <div className={styles.milestoneIconNode}>
                  {m.isAchieved ? (
                    <Check size={12} strokeWidth={3.5} />
                  ) : m.isCurrent ? (
                    <Flame size={13} strokeWidth={2.8} />
                  ) : (
                    <span>{m.icon}</span>
                  )}
                </div>
                <div className={styles.milestoneTextCol}>
                  <div className={styles.milestoneDayLabel}>{m.title}</div>
                  <div className={styles.milestoneRewardVal}>{m.reward}</div>
                </div>
              </div>
            ))}
          </div>
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
