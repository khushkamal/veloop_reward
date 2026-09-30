import React, { useState } from 'react';
import {
  ChevronLeft,
  Flame,
  Gem,
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
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const currentStreak = streakStatus?.currentStreak || 0;
  const veBalance = wallet?.veBalance ?? 0;

  return (
    <header className={styles.navbar}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left Section: Back Button + Daily Streak & Flame */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          <button
            type="button"
            className={styles.backBtn}
            onClick={handleBackNavigation}
            title="Go Back"
            aria-label="Back navigation"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          <div className="d-flex align-items-center gap-2">
            <span className={styles.pageTitle}>Daily Streak</span>
            <Flame size={20} strokeWidth={2.4} className={styles.flameIcon} />
          </div>
        </div>

        {/* Right Section: Gem Balance Pill + Audio & Profile */}
        <div className="d-flex align-items-center gap-2 gap-sm-2.5">
          {/* Gem / VEs Balance Pill */}
          {user && (
            <div className={`${styles.balancePill} ${styles.gemPill}`} title="Reward Balance">
              <Gem size={15} strokeWidth={2.4} className={styles.gemIcon} />
              <span className={styles.balanceText}>
                <strong>{veBalance.toLocaleString()}</strong>
              </span>
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
              <Volume2 size={16} strokeWidth={2.4} />
            ) : (
              <VolumeX size={16} strokeWidth={2.4} />
            )}
          </button>

          {/* User Profile / Auth */}
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
                <LogOut size={15} strokeWidth={2.4} />
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
              <UserIcon size={15} strokeWidth={2.4} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
