import React from 'react';
import { Calendar, TrendingUp, Gift, ShieldCheck, ChevronRight, Shield } from 'lucide-react';
import styles from './DailyStreak.module.css';

export default function WhyStreak() {
  const benefits = [
    {
      icon: <Calendar size={22} className="text-info" />,
      title: 'Stay Active',
      description: 'Keep your streak alive & earn more!'
    },
    {
      icon: <TrendingUp size={22} className="text-warning" />,
      title: 'Bigger Streak',
      description: 'More consecutive logins, bigger rewards!'
    },
    {
      icon: <Gift size={22} className="text-primary" />,
      title: 'Exclusive Rewards',
      description: 'Get coins, gift cards & special bonuses!'
    },
    {
      icon: <ShieldCheck size={22} className="text-success" />,
      title: "Don't Miss Out",
      description: 'Come back every day & unlock all rewards!'
    }
  ];

  return (
    <section className={styles.whyStreakSection}>
      <div className="container">
        {/* Header Title with Sparkles */}
        <div className={styles.whyHeader}>
          <span className={styles.sparkleIcon}>✦</span>
          <h2 className={styles.whyTitle}>Why Maintain Your Streak?</h2>
          <span className={styles.sparkleIcon}>✦</span>
        </div>

        {/* 4 Benefits Cards Grid */}
        <div className={styles.whyGrid}>
          {benefits.map((benefit, idx) => (
            <div key={idx} className={styles.whyCard}>
              <div className={styles.whyIconContainer}>
                {benefit.icon}
              </div>
              <div className={styles.whyCardTitle}>{benefit.title}</div>
              <div className={styles.whyCardDesc}>{benefit.description}</div>
            </div>
          ))}
        </div>

        {/* Official Rewards Trust Strip */}
        <div className={styles.officialTrustStrip}>
          <div className="d-flex align-items-center gap-3">
            <div className={styles.vrBadge}>
              <span>VR</span>
            </div>
            <div>
              <div className={styles.trustTitle}>
                Official rewards only on <span className="text-white fw-bold">VeloopRewards.in</span>
              </div>
              <div className={styles.trustSubtitle}>Stay active, stay rewarded!</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-secondary" />
        </div>
      </div>
    </section>
  );
}
