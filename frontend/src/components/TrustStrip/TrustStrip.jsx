import React from 'react';
import { ShieldCheck, Zap, Lock, Sparkles, Award } from 'lucide-react';
import styles from './TrustStrip.module.css';

export default function TrustStrip() {
  const benefits = [
    {
      icon: <ShieldCheck size={22} className={styles.iconViolet} />,
      title: '100% Server-Authoritative',
      description: 'Streaks & rewards calculated exclusively on backend with atomic concurrency protection.'
    },
    {
      icon: <Zap size={22} className={styles.iconGold} />,
      title: 'Instant Amazon Vouchers',
      description: 'Milestone rewards (Days 4, 5, 7) generated and stored securely in your transaction ledger.'
    },
    {
      icon: <Lock size={22} className={styles.iconEmerald} />,
      title: 'Double-Entry Audit Ledger',
      description: 'Every VEs point credit is immutably recorded with balance before/after verification.'
    },
    {
      icon: <Sparkles size={22} className={styles.iconPurple} />,
      title: 'Fair 7-Day Resets & Cycles',
      description: 'Transparent 24h grace window with smooth cycle rollover upon Day 7 completion.'
    }
  ];

  return (
    <section className={styles.trustSection}>
      <div className="container">
        <div className={styles.trustCard}>
          <div className="row g-4 align-items-center">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className={styles.benefitItem}>
                  <div className={styles.iconBox}>
                    {benefit.icon}
                  </div>
                  <div className={styles.benefitContent}>
                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                    <p className={styles.benefitDescription}>{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
