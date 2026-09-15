import React, { useState, useEffect } from 'react';
import { ShieldCheck, Eye, Sparkles, X, CheckCircle } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import styles from './CPADemoModal.module.css';

export default function CPADemoModal({ isOpen, onClose, onCompleteAdDemo, nextReward, dayIndex }) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCompleted(false);
      return;
    }

    // 3-second simulated sponsor verification progress
    const duration = 3000;
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          setCompleted(true);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} title="Cancel">
          <X size={16} />
        </button>

        {/* Header Badge */}
        <div className={styles.cpaBadge}>
          <ShieldCheck size={14} />
          <span>CPA Advertisement Demo State</span>
        </div>

        <h3 className="fw-bold text-white mb-2">Claim Verification</h3>
        <p className="text-muted small mb-0">
          Viewing sponsor engagement to authorize Day {dayIndex} Reward: <strong>{nextReward?.displayName}</strong>
        </p>

        {/* Sponsor Preview Box */}
        <div className={styles.sponsorPreviewBox}>
          <div className={styles.sponsorHeader}>
            <div className={styles.sponsorLogo}>
              <Eye size={22} />
            </div>
            <div>
              <div className={styles.sponsorName}>VELoop Featured Partner</div>
              <div className={styles.sponsorTag}>Verified Sponsor Engagement • Simulated Demo</div>
            </div>
          </div>
          <p className="small text-secondary mb-0">
            "Unlock instant perks and premium rewards every day across the VELoop ecosystem."
          </p>

          {/* Progress Bar */}
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.progressText}>
            <span>{completed ? 'Verification Complete!' : 'Verifying sponsor interaction...'}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="btn w-100 py-3 fw-bold rounded-4 d-flex align-items-center justify-content-center gap-2"
          style={{
            background: completed
              ? 'linear-gradient(135deg, #00e5ff 0%, #2979ff 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            color: completed ? '#000' : '#64748b',
            border: 'none',
            cursor: completed ? 'pointer' : 'not-allowed'
          }}
          disabled={!completed}
          onClick={() => {
            playClickSound();
            onCompleteAdDemo();
          }}
        >
          {completed ? (
            <>
              <Sparkles size={18} />
              <span>Confirm & Claim {nextReward?.displayName}</span>
            </>
          ) : (
            <>
              <CheckCircle size={18} />
              <span>Verifying ({Math.ceil((100 - progress) / 33)}s remaining)...</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
