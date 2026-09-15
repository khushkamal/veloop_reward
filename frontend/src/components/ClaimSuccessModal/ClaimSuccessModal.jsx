import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Gift, Coins, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import styles from './ClaimSuccessModal.module.css';

export default function ClaimSuccessModal({ claimData, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!claimData) return;

    // Trigger confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00e5ff', '#2979ff', '#ffd700', '#ff007f']
    });
  }, [claimData]);

  if (!claimData) return null;

  const { claimedDay, reward, streak } = claimData;
  const isAmazonGC = reward.rewardType === 'AMAZON_GC';
  const isGrand = claimedDay === 7;

  const handleCopyVoucher = () => {
    if (reward.voucherCode) {
      navigator.clipboard.writeText(reward.voucherCode);
      setCopied(true);
      playClickSound();
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        {/* Trophy / Reward Icon */}
        <div className={`${styles.trophyWrapper} ${isGrand ? styles.trophyGrand : ''}`}>
          {isGrand ? (
            <Trophy size={40} />
          ) : isAmazonGC ? (
            <Gift size={38} />
          ) : (
            <Coins size={38} />
          )}
        </div>

        <div className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 px-3 py-2 rounded-pill mb-2">
          <Sparkles size={14} className="me-1" />
          Day {claimedDay} Reward Claimed!
        </div>

        <h2 className={`${styles.rewardHighlight} ${isAmazonGC ? 'text-gradient-gold' : 'text-gradient-cyan'}`}>
          {reward.displayName}
        </h2>

        <p className="text-secondary small mb-3">
          Awesome! Your daily streak is now <strong>{streak.currentStreak} Days</strong>. Keep checking in
          tomorrow to earn your next reward!
        </p>

        {/* Amazon Voucher Code Box */}
        {isAmazonGC && reward.voucherCode && (
          <div className={styles.voucherBox}>
            <div className="text-start">
              <div className="small text-muted mb-1">Your Amazon Voucher Code:</div>
              <div className={styles.voucherCode}>{reward.voucherCode}</div>
            </div>
            <button className={styles.copyBtn} onClick={handleCopyVoucher}>
              {copied ? (
                <>
                  <Check size={14} className="text-success" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Action Button */}
        <button
          className="btn btn-primary w-100 py-3 fw-bold rounded-4 mt-2 d-flex align-items-center justify-content-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #00e5ff 0%, #2979ff 100%)',
            border: 'none',
            color: '#000'
          }}
          onClick={() => {
            playClickSound();
            onClose();
          }}
        >
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
