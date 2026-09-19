import React from 'react';
import {
  Coins,
  Gift,
  Crown,
  Calendar,
  CreditCard
} from 'lucide-react';
import { FaAmazon } from 'react-icons/fa6';

/**
 * Standardized Design System Artwork Badges
 * Powered STRICTLY by Lucide React and React Icons.
 * Ensures 100% consistency across:
 * - Stroke width (2px)
 * - Proportional Sizing
 * - Centered Flex Alignment
 * - Zero external screenshot/image dependencies
 */

// 1. Golden Coins Stack Icon (Days 1, 2, 3, 6 & Stats)
export function CoinsStackArtwork({ size = 56, className = '' }) {
  const iconSize = Math.round(size * 0.55);
  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded-4 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.22) 0%, rgba(217, 119, 6, 0.12) 100%)',
        border: '1.5px solid rgba(251, 191, 36, 0.45)',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25), 0 0 12px rgba(245, 158, 11, 0.15)',
        color: '#fbbf24',
        flexShrink: 0
      }}
    >
      <Coins size={iconSize} strokeWidth={2.2} />
    </div>
  );
}

// 2. Royal Purple Gift Box Icon (Day 4 & Hero Artwork)
export function GiftBoxArtwork({ size = 56, className = '' }) {
  const iconSize = Math.round(size * 0.55);
  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded-4 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(126, 34, 206, 0.15) 100%)',
        border: '1.5px solid rgba(168, 85, 247, 0.5)',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25), 0 0 12px rgba(168, 85, 247, 0.18)',
        color: '#c084fc',
        flexShrink: 0
      }}
    >
      <Gift size={iconSize} strokeWidth={2.2} />
    </div>
  );
}

// 3. Amazon Gift Card Icon (Day 5 & Hero Banner)
export function AmazonCardArtwork({ size = 58, className = '' }) {
  const iconSize = Math.round(size * 0.46);
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center rounded-4 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 0.82}px`,
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        border: '1.5px solid rgba(255, 153, 0, 0.45)',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), 0 0 10px rgba(255, 153, 0, 0.12)',
        color: '#ff9900',
        gap: '2px',
        flexShrink: 0
      }}
    >
      <FaAmazon size={iconSize} color="#ff9900" />
      <span style={{ fontSize: '9px', fontWeight: 800, color: '#f3f4f6', letterSpacing: '0.5px' }}>CARD</span>
    </div>
  );
}

// 4. Golden Crown Icon (Day 7 & Ultimate Reward - Strictly Lucide React / React Icons)
export function CrownArtwork({ size = 68, className = '' }) {
  const iconSize = Math.round(size * 0.55);
  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded-4 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.28) 0%, rgba(217, 119, 6, 0.16) 100%)',
        border: '1.8px solid rgba(251, 191, 36, 0.65)',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3), 0 0 16px rgba(245, 158, 11, 0.25)',
        color: '#f59e0b',
        flexShrink: 0
      }}
    >
      <Crown size={iconSize} strokeWidth={2.2} />
    </div>
  );
}

// 5. Calendar Deskpad Artwork (Hero Left Artwork)
export function CalendarArtwork({ size = 70, className = '' }) {
  const iconSize = Math.round(size * 0.52);
  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded-4 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.12) 100%)',
        border: '1.5px solid rgba(139, 92, 246, 0.45)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), 0 0 12px rgba(139, 92, 246, 0.15)',
        color: '#a78bfa',
        flexShrink: 0
      }}
    >
      <Calendar size={iconSize} strokeWidth={2.2} />
    </div>
  );
}

// 6. Amazon Brand Logo Pill
export function AmazonBrandLogo({ className = '' }) {
  return (
    <div
      className={`d-inline-flex align-items-center gap-1.5 px-2 py-1 rounded-pill ${className}`}
      style={{
        background: 'rgba(31, 41, 55, 0.85)',
        border: '1px solid rgba(255, 153, 0, 0.4)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)'
      }}
    >
      <FaAmazon size={14} color="#ff9900" />
      <span className="fw-bold text-white small" style={{ fontSize: '0.78rem', letterSpacing: '0.2px' }}>
        Amazon Gift Card
      </span>
    </div>
  );
}
