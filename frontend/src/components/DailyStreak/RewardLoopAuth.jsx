import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Gift,
  Coins,
  ShieldCheck,
  Lock,
  Server,
  ArrowRight,
  Flame,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  User as UserIcon,
  Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { playClickSound } from '../../utils/audioEffects';
import styles from './RewardLoopAuth.module.css';

// 7-Day streak ladder metadata for the futuristic orbit
const STREAK_DAYS = [
  { day: 1, ve: 10, reward: '+10 VEs', type: 've', angle: 210 },
  { day: 2, ve: 20, reward: '+20 VEs', type: 've', angle: 250 },
  { day: 3, ve: 30, reward: '+30 VEs + Mystery', type: 'special', angle: 290 },
  { day: 4, ve: 40, reward: '+40 VEs', type: 've', angle: 330 },
  { day: 5, ve: 50, reward: '+50 VEs', type: 've', angle: 10 },
  { day: 6, ve: 60, reward: '+60 VEs', type: 've', angle: 50 },
  { day: 7, ve: 100, reward: '+100 VEs + ₹500 GC', type: 'milestone', isMilestone: true, angle: 90 }
];

export default function RewardLoopAuth({ onOpenAuthModal }) {
  const { login, register, demoLogin, actionLoading } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState('');
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    playClickSound();

    if (isRegisterMode) {
      if (!name.trim()) {
        setFormError('Please enter your full name.');
        return;
      }
      const res = await register(name, email, password);
      if (!res.success) {
        setFormError(res.error || 'Registration failed. Please try again.');
      }
    } else {
      const res = await login(email, password);
      if (!res.success) {
        setFormError(res.error || 'Invalid credentials. Or try 1-Click Demo Login below.');
      }
    }
  };

  const handleDemoLogin = async () => {
    playClickSound();
    setFormError('');
    await demoLogin();
  };

  return (
    <div className={styles.rewardLoopWrapper}>
      {/* Background Ambience & Orbital Light Rings */}
      <div className={styles.bgGlowCore} />
      <div className={styles.bgGlowViolet} />
      <div className={styles.bgParticles} />

      {/* Top Bar / Brand Identifier */}
      <header className={styles.topBar}>
        <div className={styles.brandGroup}>
          <div className={styles.brandIconBox}>
            <Zap size={20} className={styles.brandIcon} strokeWidth={2.8} />
          </div>
          <div className="d-flex flex-column text-start">
            <span className={styles.brandTitle}>
              VELooP <span className={styles.brandAccent}>Rewards</span>
            </span>
            <span className={styles.brandStatus}>
              <span className={styles.statusDot} />
              YOUR REWARD LOOP STARTS HERE
            </span>
          </div>
        </div>

        <div className={styles.topRightHelper}>
          <span className={styles.engineBadge}>
            <Server size={13} className="text-info" /> MERN Engine Live
          </span>
          <button
            type="button"
            className={styles.helpBtn}
            onClick={() => onOpenAuthModal?.()}
            title="Help & Info"
            aria-label="Help and Info"
          >
            <HelpCircle size={17} />
          </button>
        </div>
      </header>

      {/* Main Centered Asymmetric Hero Canvas */}
      <div className={styles.heroCanvas}>
        {/* Left/Center: Futuristic Circular Reward Loop Orbit */}
        <div className={styles.orbitContainer}>
          {/* Outer Orbit Path with Glow */}
          <div className={styles.orbitRingOuter}>
            {/* SVG Orbit Track with Gradient Arc */}
            <svg className={styles.orbitSvg} viewBox="0 0 540 540">
              <defs>
                <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="85%" stopColor="#ffd700" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <circle
                cx="270"
                cy="270"
                r="220"
                fill="none"
                stroke="rgba(139, 92, 246, 0.15)"
                strokeWidth="2"
              />
              <circle
                cx="270"
                cy="270"
                r="220"
                fill="none"
                stroke="url(#orbitGrad)"
                strokeWidth="4"
                strokeDasharray="980 400"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            </svg>

            {/* 7 Orbit Nodes positioned around the 540x540 ring (radius ~220px, center 270) */}
            {STREAK_DAYS.map((item, idx) => {
              // Convert angle to coordinates
              // 0 deg is right (3 o'clock), 90 is top (12 o'clock in standard polar math if inverted)
              const rad = ((item.angle - 90) * Math.PI) / 180;
              const radius = 220;
              const x = 270 + radius * Math.cos(rad);
              const y = 270 + radius * Math.sin(rad);

              return (
                <div
                  key={item.day}
                  className={`${styles.orbitNode} ${item.isMilestone ? styles.milestoneNode : ''}`}
                  style={{ left: `${(x / 540) * 100}%`, top: `${(y / 540) * 100}%` }}
                  onMouseEnter={() => setHoveredNode(item)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className={styles.nodeCore}>
                    {item.isMilestone ? (
                      <Gift size={16} className={styles.nodeIconGold} />
                    ) : item.type === 'special' ? (
                      <Sparkles size={14} className={styles.nodeIconCyan} />
                    ) : (
                      <Coins size={13} className={styles.nodeIconCyan} />
                    )}
                  </div>
                  <span className={styles.nodeLabel}>Day {item.day}</span>

                  {/* Micro Tooltip */}
                  <div className={styles.nodeTooltip}>
                    <strong>Day {item.day}</strong>
                    <span>{item.reward}</span>
                  </div>
                </div>
              );
            })}

            {/* Central Campaign Statement */}
            <div className={styles.orbitCenterContent}>
              <div className={styles.campaignEyebrow}>7-DAY MOMENTUM ENGINE</div>
              <h2 className={styles.campaignStatement}>
                <span>7 DAYS.</span>
                <span>7 CHECK-INS.</span>
                <span className={styles.highlightText}>REWARDS UNLOCKED.</span>
              </h2>
              <div className={styles.loopFlowBadge}>
                <span>CHECK IN</span>
                <span className={styles.flowArrow}>→</span>
                <span>BUILD STREAK</span>
                <span className={styles.flowArrow}>→</span>
                <span className={styles.flowGold}>UNLOCK REWARDS</span>
              </div>
            </div>
          </div>

          {/* Floating Product Elements around Orbit */}
          <div className={`${styles.floatingElement} ${styles.floatCoin1}`}>
            <div className={styles.productBadge}>
              <Coins size={18} className="text-info" />
              <div>
                <div className={styles.badgeVal}>+100 VEs</div>
                <div className={styles.badgeSub}>Points Multiplier</div>
              </div>
            </div>
          </div>

          <div className={`${styles.floatingElement} ${styles.floatGiftCard}`}>
            <div className={styles.productBadgeGold}>
              <Gift size={20} className="text-warning" />
              <div>
                <div className={styles.badgeValGold}>₹500 Amazon GC</div>
                <div className={styles.badgeSubGold}>Day 7 Milestone</div>
              </div>
            </div>
          </div>

          <div className={`${styles.floatingElement} ${styles.floatStreakFlame}`}>
            <div className={styles.flameBadge}>
              <Flame size={16} className={styles.flameIcon} />
              <span>Auto Streak Validation</span>
            </div>
          </div>
        </div>

        {/* Right / Overlapping Floating Authentication Card */}
        <div className={styles.loginCard}>
          {/* Eyebrow & Titles */}
          <div className={styles.cardHeader}>
            <span className={styles.cardEyebrow}>WELCOME TO YOUR REWARD LOOP</span>
            <h1 className={styles.cardTitle}>
              {isRegisterMode ? 'Create your account.' : 'Keep your streak alive.'}
            </h1>
            <p className={styles.cardSubText}>
              {isRegisterMode
                ? 'Join VELooP Rewards to build your daily streak, earn VEs, and claim milestone gift cards.'
                : 'Sign in to continue your daily check-ins, collect VEs, and unlock milestone rewards.'}
            </p>
          </div>

          {/* Error Alert */}
          {formError && (
            <div className={styles.errorBanner} role="alert">
              {formError}
            </div>
          )}

          {/* Sign In / Register Interactive Form */}
          <form onSubmit={handleSubmit} className={styles.authForm}>
            {isRegisterMode && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <UserIcon size={17} className={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.textInput}
                    required={isRegisterMode}
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email address</label>
              <div className={styles.inputWrapper}>
                <Mail size={17} className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.textInput}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className="d-flex justify-content-between align-items-center">
                <label className={styles.inputLabel}>Password</label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    className={styles.forgotLink}
                    onClick={() => {
                      playClickSound();
                      alert('For this demo, use any test email/password or click "1-Click Evaluator Demo Login".');
                    }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <Lock size={17} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.textInput}
                  required
                  minLength={6}
                  autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {!isRegisterMode && (
              <div className={styles.rememberRow}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={styles.checkboxInput}
                  />
                  <span>Remember me for 30 days</span>
                </label>
              </div>
            )}

            {/* Primary CTA */}
            <button
              type="submit"
              className={styles.primarySubmitBtn}
              disabled={actionLoading}
            >
              <span>{actionLoading ? 'Connecting...' : isRegisterMode ? 'Create Account →' : 'Continue to VELooP →'}</span>
            </button>
          </form>

          {/* 1-Click Demo Login Button */}
          <div className={styles.demoSection}>
            <div className={styles.orDivider}>
              <span>or instant evaluator access</span>
            </div>

            <button
              type="button"
              className={styles.demoLoginBtn}
              onClick={handleDemoLogin}
              disabled={actionLoading}
            >
              <Sparkles size={16} className={styles.sparkleIcon} />
              <span>✦ 1-Click Evaluator Demo Login</span>
            </button>
          </div>

          {/* Toggle between Login and Register */}
          <div className={styles.switchModeRow}>
            {isRegisterMode ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  className={styles.modeSwitchBtn}
                  onClick={() => {
                    playClickSound();
                    setIsRegisterMode(false);
                    setFormError('');
                  }}
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                New to VELooP?{' '}
                <button
                  type="button"
                  className={styles.modeSwitchBtn}
                  onClick={() => {
                    playClickSound();
                    setIsRegisterMode(true);
                    setFormError('');
                  }}
                >
                  Create an account
                </button>
              </span>
            )}
          </div>

          {/* Floating Security Trust Badges */}
          <div className={styles.trustBadgesRow}>
            <div className={styles.trustBadge}>
              <CheckCircle2 size={14} className={styles.trustCheck} />
              <span>Backend Verified</span>
            </div>
            <div className={styles.trustBadge}>
              <CheckCircle2 size={14} className={styles.trustCheck} />
              <span>Secure Transactions</span>
            </div>
            <div className={styles.trustBadge}>
              <CheckCircle2 size={14} className={styles.trustCheck} />
              <span>Server-Controlled Streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
