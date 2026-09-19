import React, { useState } from 'react';
import {
  ChevronLeft,
  Flame,
  Gem,
  Coins,
  Gift,
  Volume2,
  VolumeX,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toggleSound, isSoundEnabled, playClickSound } from '../../utils/audioEffects';
import styles from './Navbar.module.css';

export default function Navbar({ onOpenAuth, onBack }) {
  const { user, wallet, streakStatus, logout } = useAuth();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const navigate = useNavigate();

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playClickSound();
  };

  const handleBackNavigation = () => {
    playClickSound();
    if (onBack) {
      onBack();
    } else {
      // Default navigation back or to home
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const currentStreak = streakStatus?.currentStreak || 0;
  const veBalance = wallet?.veBalance ?? 0;
  const amazonGCAmount = wallet?.totalAmazonGCAmount ?? 0;

  return (
    <header className={styles.navbar}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left Section: Back Action + Daily Streak Title & Streak Indicator */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* Back / Navigation Action */}
          <button
            type="button"
            className={styles.backBtn}
            onClick={handleBackNavigation}
            title="Go Back / Return Home"
            aria-label="Back navigation"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Daily Streak Title & Brand Header */}
          <div className={styles.titleContainer}>
            <div className="d-flex align-items-center gap-1.5">
              <span className={styles.pageTitle}>Daily Streak</span>
              <span className={styles.brandTag}>VELoop</span>
            </div>
            <span className={styles.navSubTitle}>Earn rewards every 24h</span>
          </div>

          {/* Streak Indicator (Backend Driven) */}
          {user && (
            <div
              className={styles.streakIndicator}
              title={`Current active streak: ${currentStreak} consecutive days`}
            >
              <Flame size={16} strokeWidth={2.4} className={styles.flameIcon} />
              <span className={styles.streakCount}>{currentStreak}</span>
              <span className={styles.streakLabel}>{currentStreak === 1 ? 'Day' : 'Days'}</span>
            </div>
          )}
        </div>

        {/* Right Section: Gem/Reward Balances, Audio, User Profile */}
        <div className="d-flex align-items-center gap-2 gap-sm-2.5">
          {/* Backend Gem / Points & Reward Balances */}
          {user && (
            <div className={styles.balanceGroup}>
              {/* Gem / VEs Balance Pill */}
              <div className={`${styles.balancePill} ${styles.gemPill}`} title="VELoop Gems / Points Balance">
                <Gem size={15} strokeWidth={2.4} className={styles.gemIcon} />
                <span className={styles.balanceText}>
                  <strong>{veBalance.toLocaleString()}</strong> <span className={styles.balanceUnit}>VEs</span>
                </span>
              </div>

              {/* Amazon Gift Card Reward Balance Pill */}
              <div className={`${styles.balancePill} ${styles.rewardPill} d-none d-md-flex`} title="Total Amazon Gift Cards Earned">
                <Gift size={15} strokeWidth={2.4} className={styles.rewardIcon} />
                <span className={styles.balanceText}>
                  <strong>₹{amazonGCAmount}</strong> <span className={styles.balanceUnit}>GC</span>
                </span>
              </div>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            type="button"
            className={styles.navActionBtn}
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute Sounds' : 'Unmute Sounds'}
            aria-label="Toggle Sound Effects"
          >
            {soundOn ? (
              <Volume2 size={17} strokeWidth={2.4} />
            ) : (
              <VolumeX size={17} strokeWidth={2.4} />
            )}
          </button>

          {/* User Auth Info / Login CTA */}
          {user ? (
            <div className={styles.userMenu}>
              <img
                src={
                  user.avatar && !user.avatar.includes('bottts')
                    ? user.avatar
                    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || 'Alex')}`
                }
                alt={user.name || 'User'}
                className={styles.avatar}
              />
              <button
                type="button"
                className={styles.logoutBtn}
                onClick={() => {
                  playClickSound();
                  logout();
                }}
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={16} strokeWidth={2.4} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.loginBtn}
              onClick={() => {
                playClickSound();
                onOpenAuth?.();
              }}
            >
              <UserIcon size={16} strokeWidth={2.4} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
