import React, { useState } from 'react';
import { Sparkles, Flame, Check, Eye, EyeOff, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { playClickSound } from '../../utils/audioEffects';
import styles from './MinimalAuthPage.module.css';

export default function MinimalAuthPage() {
  const { login, register, demoLogin, actionLoading } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    playClickSound();

    if (isRegister) {
      if (!name.trim()) {
        setFormError('Please enter your full name.');
        return;
      }
      const res = await register(name, email, password);
      if (!res.success) {
        setFormError(res.error || 'Registration failed.');
      }
    } else {
      const res = await login(email, password);
      if (!res.success) {
        setFormError(res.error || 'Invalid credentials. Or try 1-Click Demo Login.');
      }
    }
  };

  const handleDemoLogin = async () => {
    playClickSound();
    setFormError('');
    await demoLogin();
  };

  return (
    <div className={styles.authWrapper}>
      {/* Subtle Atmospheric Purple Lighting */}
      <div className={styles.ambientGlow} />

      {/* Top Left Brand Logo */}
      <header className={styles.header}>
        <div className={styles.brand} onClick={playClickSound} role="button" tabIndex={0}>
          <Flame size={24} strokeWidth={2.4} className={styles.flameLogoIcon} />
          <span className={styles.brandName}>VELooP</span>
        </div>
      </header>

      {/* Two-Column Main Content */}
      <main className={styles.contentGrid}>
        {/* Left Column: Brand & Marketing Messaging */}
        <div className={styles.leftCol}>
          {/* Eyebrow */}
          <div className={styles.eyebrowContainer}>
            <span className={styles.eyebrowDash} />
            <span className={styles.eyebrowText}>DAILY REWARDS</span>
          </div>

          {/* Main Headline */}
          <h1 className={styles.headline}>
            Build your streak.
            <br />
            <span className={styles.headlineAccent}>Earn your rewards.</span>
          </h1>

          {/* Supporting Copy */}
          <p className={styles.supportingCopy}>
            Check in every day, grow your streak, earn VEs, and unlock milestone rewards.
          </p>

          {/* Minimal 7-Day Streak Indicator */}
          <div className={styles.streakIndicatorWrapper} aria-label="7-day streak progress">
            <div className={styles.streakHeaderRow}>
              <span className={styles.streakLabel}>7-Day Streak Loop</span>
              <span className={styles.milestoneLabel}>Milestone Day 7</span>
            </div>
            <div className={styles.streakTrack}>
              <div className={`${styles.streakSegment} ${styles.segmentActive}`} />
              <div className={`${styles.streakSegment} ${styles.segmentActive}`} />
              <div className={`${styles.streakSegment} ${styles.segmentActive}`} />
              <div className={`${styles.streakSegment} ${styles.segmentActive}`} />
              <div className={`${styles.streakSegment} ${styles.segmentActive}`} />
              <div className={styles.streakSegment} />
              <div className={`${styles.streakNodeGold}`}>
                <span className={styles.goldDot} />
              </div>
            </div>
          </div>

          {/* Benefit Line */}
          <div className={styles.benefitLine}>
            <Check size={16} className={styles.checkIcon} strokeWidth={2.5} />
            <span>Secure rewards. Verified claims. Real progress.</span>
          </div>
        </div>

        {/* Right Column: Clean Premium Authentication Panel */}
        <div className={styles.rightCol}>
          <div className={styles.authPanel}>
            {/* Panel Eyebrow & Headline */}
            <span className={styles.panelEyebrow}>
              {isRegister ? 'GET STARTED' : 'WELCOME BACK'}
            </span>
            <h2 className={styles.panelTitle}>
              {isRegister ? 'Create your account.' : 'Sign in to VELooP.'}
            </h2>
            <p className={styles.panelSubText}>
              {isRegister
                ? 'Start your daily streak and begin earning rewards today.'
                : 'Continue where your reward loop left off.'}
            </p>

            {formError && (
              <div className={styles.errorAlert} role="alert">
                {formError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
              {isRegister && (
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    required={isRegister}
                    autoComplete="name"
                  />
                </div>
              )}

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="email"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                    minLength={6}
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggleBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Primary CTA Button (Warm Gold Accent) */}
              <button
                type="submit"
                className={styles.primaryCtaBtn}
                disabled={actionLoading}
              >
                <span>{actionLoading ? 'Please wait...' : isRegister ? 'Create account →' : 'Sign in →'}</span>
              </button>
            </form>

            {/* Switch Mode Link */}
            <div className={styles.switchModeWrap}>
              {isRegister ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className={styles.switchLink}
                    onClick={() => {
                      playClickSound();
                      setIsRegister(false);
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
                    className={styles.switchLink}
                    onClick={() => {
                      playClickSound();
                      setIsRegister(true);
                      setFormError('');
                    }}
                  >
                    Create an account
                  </button>
                </span>
              )}
            </div>

            {/* Evaluator CTA Button */}
            <div className={styles.demoSection}>
              <button
                type="button"
                className={styles.demoCtaBtn}
                onClick={handleDemoLogin}
                disabled={actionLoading}
              >
                <Sparkles size={15} className={styles.sparkleIcon} />
                <span>✦ 1-Click Demo Login</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>VELooP Rewards · Daily Streak & Rewards</span>
      </footer>
    </div>
  );
}
