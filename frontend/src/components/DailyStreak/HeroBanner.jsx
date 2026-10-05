import React, { useState, useEffect } from 'react';
import {
  Flame,
  Clock,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  ChevronRight,
  Check,
  Volume2,
  VolumeX,
  Zap,
  Gift,
  Trophy
} from 'lucide-react';
import { playClickSound, toggleSound, isSoundEnabled } from '../../utils/audioEffects';
import {
  CalendarArtwork,
  GiftBoxArtwork,
  StreakFlameArtwork
} from './ArtworkIcons';
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
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

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

  // Format seconds into HH, MM, SS
  const formatTimeParts = (totalSec) => {
    if (totalSec <= 0) return { hrs: '00', mins: '00', secs: '00' };
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return { hrs, mins, secs };
  };

  const timeParts = formatTimeParts(secondsLeft);
  const formattedTimeStr = `${timeParts.hrs}:${timeParts.mins}:${timeParts.secs}`;

  const currentStreak = streakStatus?.currentStreak || 0;
  const canClaim = streakStatus?.canClaim;
  const alreadyClaimed = streakStatus?.alreadyClaimedToday;
  const isStreakBroken = streakStatus?.isStreakBroken;
  const nextReward = streakStatus?.nextReward;

  // Streak Progression
  const claimedCount = alreadyClaimed ? currentStreak : Math.max(0, currentStreak);
  const progressPercent = Math.min(100, Math.round((claimedCount / 7) * 100));
  const daysToJackpot = Math.max(0, 7 - claimedCount);

  // Dynamic milestone data from ladder configuration
  const ladder = streakStatus?.streakLadder || [];
  const getRewardForDay = (dayNum, fallbackTitle) => {
    const item = ladder.find((r) => r.day === dayNum);
    if (!item) return fallbackTitle;
    if (item.rewardType === 'AMAZON_GC') return `₹${item.amount} Amazon GC`;
    return `+${item.amount} VEs`;
  };

  // 7-Day Road Journey Nodes
  const journeyNodes = [
    { day: 1, title: getRewardForDay(1, '+5 VEs'), shortTitle: '+5 VEs', icon: '🪙', isMilestone: false },
    { day: 2, title: getRewardForDay(2, '+10 VEs'), shortTitle: '+10 VEs', icon: '🪙', isMilestone: false },
    { day: 3, title: getRewardForDay(3, '+15 VEs'), shortTitle: 'Boost +15', icon: '⚡', isMilestone: true },
    { day: 4, title: getRewardForDay(4, '₹1 Amazon GC'), shortTitle: '₹1 Voucher', icon: '🎁', isMilestone: true },
    { day: 5, title: getRewardForDay(5, '₹2 Amazon GC'), shortTitle: '₹2 Voucher', icon: '💳', isMilestone: true },
    { day: 6, title: getRewardForDay(6, '+30 VEs'), shortTitle: 'Surge +30', icon: '🔥', isMilestone: true },
    { day: 7, title: getRewardForDay(7, '₹5 Amazon GC'), shortTitle: '₹5 Crown', icon: '👑', isMilestone: true }
  ];

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playClickSound();
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.streakContainer}>
        {/* Top Hero Banner with 3D Artwork Illustration */}
        <div className={styles.heroMainBanner}>
          {/* Subtle Ambient Cosmic Orbs */}
          <div className={styles.heroOrbLeft}></div>
          <div className={styles.heroOrbRight}></div>

          <div className="d-flex align-items-center justify-content-between g-2 g-md-4 position-relative" style={{ zIndex: 2 }}>
            {/* Left 3D Calendar Artwork */}
            <div className={`${styles.heroArtCol} d-flex align-items-center justify-content-center`}>
              <div className="animate-float">
                <CalendarArtwork size={76} className={styles.heroArtDesktop} />
                <CalendarArtwork size={54} className={styles.heroArtMobile} />
              </div>
            </div>

            {/* Middle Content: Badge, Title, Subtitle, CTA */}
            <div className={`${styles.heroTextCol} text-center px-1 px-md-3`}>
              <div className={styles.heroBadgePill}>
                <Zap size={13} className="text-warning" />
                <span>VELOOP REWARDS • 7-DAY STREAK ENGINE</span>
              </div>

              <h1 className={styles.heroHeading}>
                Login Daily & Claim{' '}
                <span className={styles.heroGoldText}>Exclusive Rewards!</span>
              </h1>
              <p className={styles.heroSubText}>
                Maintain consecutive logins to unlock VEs coins, mystery gift boxes, and the{' '}
                <strong className="text-warning">₹5 Amazon Grand Crown!</strong>
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
                    <Sparkles size={19} className={styles.btnSparkleIcon} />
                    <span>
                      {actionLoading
                        ? 'Validating Claim...'
                        : `Claim Day ${streakStatus?.nextDayIndex} Reward (${nextReward?.displayName || 'Claim Now'})`}
                    </span>
                    <ChevronRight size={17} strokeWidth={2.8} />
                  </button>
                </div>
              )}

              {/* Live High-Tech Countdown Timer (if already claimed today) */}
              {alreadyClaimed && (
                <div className="mt-3 d-flex flex-column align-items-center">
                  <div className={styles.countdownHudContainer}>
                    <div className={styles.countdownHeaderRow}>
                      <Clock size={14} className={styles.clockIcon} />
                      <span className={styles.countdownStatusText}>Next Reward Unlocks In</span>
                      <span className={styles.livePulseDot}></span>
                    </div>

                    <div className={styles.countdownDigitBlocks}>
                      <div className={styles.digitBox}>
                        <span className={styles.digitNum}>{timeParts.hrs}</span>
                        <span className={styles.digitLabel}>HRS</span>
                      </div>
                      <span className={styles.digitColon}>:</span>
                      <div className={styles.digitBox}>
                        <span className={styles.digitNum}>{timeParts.mins}</span>
                        <span className={styles.digitLabel}>MIN</span>
                      </div>
                      <span className={styles.digitColon}>:</span>
                      <div className={styles.digitBox}>
                        <span className={styles.digitNum}>{timeParts.secs}</span>
                        <span className={styles.digitLabel}>SEC</span>
                      </div>
                    </div>

                    <span className={styles.countdownSubHint}>Midnight Reset • Asia/Kolkata (IST)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right 3D Gift Box Artwork */}
            <div className={`${styles.heroArtCol} d-flex align-items-center justify-content-center`}>
              <div className="animate-float" style={{ animationDelay: '1.2s' }}>
                <GiftBoxArtwork size={76} className={styles.heroArtDesktop} />
                <GiftBoxArtwork size={54} className={styles.heroArtMobile} />
              </div>
            </div>
          </div>
        </div>

        {/* Broken Streak Warning if any */}
        {isStreakBroken && (
          <div className={styles.brokenNotice}>
            <AlertTriangle size={20} className="flex-shrink-0 text-danger" />
            <div>
              <strong className="d-block text-white">Streak Broken Yesterday!</strong>
              <span>Your streak was reset to Day 1. Claim your reward today to restart your progression toward the Grand Crown!</span>
            </div>
          </div>
        )}

        {/* Streak Command & Action Bar */}
        <div className={styles.streakActionBar}>
          <div className={styles.streakIndicatorPill}>
            <StreakFlameArtwork size={22} className={styles.flameWrapper} />
            <div className="d-flex align-items-center gap-1.5">
              <span className={styles.streakDaysCount}>
                {currentStreak > 0 ? `${currentStreak} Day Streak` : '1 Day Streak'}
              </span>
              {currentStreak >= 3 ? (
                <span className={styles.streakRankPill}>🔥 On Fire!</span>
              ) : (
                <span className={styles.streakRankPill}>⚡ Level 1</span>
              )}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Audio Feedback Toggle */}
            <button
              className={styles.soundActionBtn}
              onClick={handleToggleSound}
              title={soundOn ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
            >
              {soundOn ? <Volume2 size={16} className="text-warning" /> : <VolumeX size={16} className="text-secondary" />}
              <span className="d-none d-sm-inline">{soundOn ? 'Audio FX' : 'Muted'}</span>
            </button>

            {/* Streak Calendar Modal Action */}
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
        </div>

        {/* Interactive 7-Day Gamified Progression Road */}
        <div className={styles.streakProgressContainer}>
          <div className={styles.progressHeader}>
            <div className="d-flex align-items-center gap-2">
              <span className={styles.progressTitle}>7-Day Reward Journey</span>
              <span className={styles.progressPercentPill}>{progressPercent}% Completed</span>
            </div>
            <div className={styles.progressNextMilestone}>
              <Trophy size={13} className="text-warning" />
              <span>
                {daysToJackpot > 0
                  ? `${daysToJackpot} ${daysToJackpot === 1 ? 'day' : 'days'} to ₹5 Amazon Grand Crown`
                  : '🏆 Grand Crown Achieved!'}
              </span>
            </div>
          </div>

          {/* Interactive 7-Node Journey Path */}
          <div className={styles.journeyTrackWrapper}>
            {/* Continuous Glowing Progress Track Line */}
            <div className={styles.journeyTrackBackground}>
              <div
                className={styles.journeyTrackFill}
                style={{ width: `${Math.max(4, Math.min(100, (claimedCount / 6.8) * 100))}%` }}
              >
                <div className={styles.journeyGlowHead}></div>
              </div>
            </div>

            {/* 7 Checkpoint Nodes */}
            <div className={styles.journeyNodesRow}>
              {journeyNodes.map((node) => {
                const isClaimedNode = claimedCount >= node.day;
                const isCurrentNode = !isClaimedNode && claimedCount === node.day - 1 && canClaim;
                const isUpcomingNode = !isClaimedNode && !isCurrentNode;

                let nodeStateClass = styles.nodeLocked;
                if (isClaimedNode) nodeStateClass = styles.nodeClaimed;
                else if (isCurrentNode) nodeStateClass = styles.nodeActive;

                return (
                  <div key={node.day} className={`${styles.journeyNodeItem} ${nodeStateClass}`}>
                    <div className={styles.nodeBubble}>
                      {isClaimedNode ? (
                        <Check size={13} strokeWidth={3.5} className="text-white" />
                      ) : isCurrentNode ? (
                        <Sparkles size={14} className="text-white animate-spin-slow" />
                      ) : (
                        <span className={styles.nodeIcon}>{node.icon}</span>
                      )}
                    </div>
                    <div className={styles.nodeLabelDay}>Day {node.day}</div>
                    <div className={styles.nodeLabelReward}>{node.shortTitle}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Statistics 3-Card Telemetry Row */}
        <StreakStats streakStatus={streakStatus} />

        {/* Ultimate Reward Banner */}
        <UltimateReward
          ultimateReward={streakStatus?.ultimateReward}
          currentStreak={currentStreak}
          canClaim={canClaim && currentStreak >= 6}
          onTriggerClaimFlow={onTriggerClaimFlow}
        />

        {/* Decorative Separator */}
        <div className={styles.decorativeSeparator}>
          <span className={styles.sparkleIcon}>✦</span>
          <span>
            {alreadyClaimed
              ? `Next reward unlocks in ${formattedTimeStr} • Come back tomorrow to keep your streak alive!`
              : 'Claim your daily reward to keep your streak on fire!'}
          </span>
          <span className={styles.sparkleIcon}>✦</span>
        </div>
      </div>
    </section>
  );
}
