import React, { useState } from 'react';
import { Zap, Coins, Gift, Volume2, VolumeX, Terminal, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toggleSound, isSoundEnabled, playClickSound } from '../../utils/audioEffects';
import styles from './Navbar.module.css';

export default function Navbar({ onOpenAuth, onToggleEvaluator, isEvaluatorOpen }) {
  const { user, wallet, logout } = useAuth();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playClickSound();
  };

  return (
    <header className={styles.navbar}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Brand Logo */}
        <a href="#home" className={styles.brand} onClick={playClickSound}>
          <div className={styles.logoIcon}>
            <Zap size={22} strokeWidth={2.8} />
          </div>
          <span className={styles.brandText}>
            VELoop <span className={styles.brandHighlight}>Rewards</span>
          </span>
        </a>

        {/* Center / Right controls */}
        <div className="d-flex align-items-center gap-3">
          {/* Real-time Wallet Balances (when logged in) */}
          {user && (
            <div className={`${styles.walletGroup} d-none d-md-flex`}>
              <div className={styles.balancePill} title="VELoop Points Balance">
                <Coins size={18} className={styles.veIcon} />
                <span>
                  <strong className={styles.veText}>{wallet?.veBalance ?? 0}</strong> VEs
                </span>
              </div>
              <div className={styles.balancePill} title="Total Amazon Gift Cards Won">
                <Gift size={18} className={styles.amazonIcon} />
                <span>
                  <strong className={styles.amazonText}>₹{wallet?.totalAmazonGCAmount ?? 0}</strong> Amazon GC
                </span>
              </div>
            </div>
          )}

          {/* Evaluator Simulator Toggle */}
          <button
            className={`${styles.evaluatorToggleBtn} ${isEvaluatorOpen ? styles.evaluatorToggleBtnActive : ''}`}
            onClick={() => {
              playClickSound();
              onToggleEvaluator();
            }}
            title="Open Evaluator Testing & Time Simulator Panel"
          >
            <Terminal size={15} />
            <span className="d-none d-sm-inline">Evaluator Mode</span>
          </button>

          {/* Sound Toggle */}
          <button
            className={styles.navActionBtn}
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* User Auth Info / Login button */}
          {user ? (
            <div className={styles.userMenu}>
              <img src={user.avatar} alt={user.name} className={styles.avatar} />
              <div className="d-none d-lg-block text-start">
                <div className={styles.userName}>{user.name}</div>
              </div>
              <button
                className={styles.navActionBtn}
                onClick={() => {
                  playClickSound();
                  logout();
                }}
                title="Logout"
              >
                <LogOut size={16} />
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
              <UserIcon size={16} />
              <span>Login / Demo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
