import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Flame,
  Zap,
  Coins,
  Gift,
  Volume2,
  VolumeX,
  Terminal,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toggleSound, isSoundEnabled, playClickSound } from '../../utils/audioEffects';
import styles from './Navbar.module.css';

export default function Navbar({ onOpenAuth, onToggleEvaluator, isEvaluatorOpen }) {
  const { user, wallet, streakStatus, logout } = useAuth();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const navigate = useNavigate();

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playClickSound();
  };

  const handleBack = () => {
    playClickSound();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentStreak = streakStatus?.currentStreak || 0;

  return (
    <header className={styles.navbar}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left Section: Back Button + Brand / Daily Streak Title */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* Back / Navigation Action */}
          <button
            className={styles.backBtn}
            onClick={handleBack}
            title="Go Back"
            aria-label="Navigate Back"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            <span className="d-none d-md-inline">Back</span>
          </button>

          {/* Brand Logo & Daily Streak Header Title */}
          <a href="#home" className={styles.brand} onClick={playClickSound}>
            <div className={styles.logoIcon}>
              <Zap size={20} strokeWidth={2.8} />
            </div>
            <div className="d-flex flex-column">
              <span className={styles.brandText}>
                VELoop <span className={styles.brandHighlight}>Rewards</span>
              </span>
              <span className={styles.navSubTitle}>Daily Streak</span>
            </div>
          </a>

          {/* Header Streak Indicator Badge (Backend Driven) */}
          {user && (
            <div
              className={styles.navStreakBadge}
              title={`Current active streak: ${currentStreak} consecutive days`}
            >
              <Flame size={16} strokeWidth={2.4} className={styles.flameIcon} />
              <span>{currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}</span>
            </div>
          )}
        </div>

        {/* Right Section: Balances, Evaluator, Audio, User Profile */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* Real-time Backend Wallet Balances */}
          {user && (
            <div className={`${styles.walletGroup} d-none d-lg-flex`}>
              <div className={styles.balancePill} title="VELoop Points Balance (VEs)">
                <Coins size={16} strokeWidth={2.4} className={styles.veIcon} />
                <span>
                  <strong className={styles.veText}>{wallet?.veBalance ?? 0}</strong> VEs
                </span>
              </div>
              <div className={styles.balancePill} title="Amazon Gift Cards Total Won">
                <Gift size={16} strokeWidth={2.4} className={styles.amazonIcon} />
                <span>
                  <strong className={styles.amazonText}>₹{wallet?.totalAmazonGCAmount ?? 0}</strong> Amazon GC
                </span>
              </div>
            </div>
          )}

          {/* Evaluator Simulator Drawer Toggle */}
          <button
            className={`${styles.evaluatorToggleBtn} ${isEvaluatorOpen ? styles.evaluatorToggleBtnActive : ''}`}
            onClick={() => {
              playClickSound();
              onToggleEvaluator();
            }}
            title="Open Evaluator Testing & Time Simulator Panel"
          >
            <Terminal size={15} strokeWidth={2.4} />
            <span className="d-none d-sm-inline">Evaluator Mode</span>
          </button>

          {/* Sound Toggle */}
          <button
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

          {/* User Auth Info / Login button */}
          {user ? (
            <div className={styles.userMenu}>
              <img src={user.avatar} alt={user.name} className={styles.avatar} />
              <div className="d-none d-xl-block text-start">
                <div className={styles.userName}>{user.name}</div>
              </div>
              <button
                className={styles.navActionBtn}
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
              className="btn btn-primary d-flex align-items-center gap-2 fw-semibold px-3 py-2 rounded-pill"
              onClick={() => {
                playClickSound();
                onOpenAuth();
              }}
              style={{
                background: 'linear-gradient(135deg, #00e5ff 0%, #2979ff 100%)',
                border: 'none',
                color: '#000'
              }}
            >
              <UserIcon size={16} strokeWidth={2.4} />
              <span>Login / Demo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
