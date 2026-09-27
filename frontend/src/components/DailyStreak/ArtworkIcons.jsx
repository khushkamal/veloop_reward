import React from 'react';
import { FaAmazon } from 'react-icons/fa6';

/**
 * High-Fidelity 3D Vector Artworks
 * Faithful reproductions of VELoop Rewards Daily Streak design assets.
 * 100% resolution independent, crisp SVG vector assets with rich lighting & shadows.
 */

// 1. 3D Stack of Gold Coins (Days 1, 2, 3, 6 & Stats)
export function CoinsStackArtwork({ size = 58, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 6px 12px rgba(245, 158, 11, 0.35))' }}
      >
        <defs>
          <linearGradient id="coinGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="coinTopGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="coinRimGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {/* Bottom Coin (Coin 3) */}
        <ellipse cx="32" cy="46" rx="20" ry="7" fill="url(#coinRimGold)" />
        <path d="M 12 40 C 12 45 52 45 52 40 L 52 46 C 52 51 12 51 12 46 Z" fill="url(#coinGradGold)" />
        <ellipse cx="32" cy="40" rx="20" ry="6.5" fill="url(#coinTopGold)" stroke="#fef08a" strokeWidth="0.75" />
        <ellipse cx="32" cy="40" rx="16" ry="4.8" fill="none" stroke="#d97706" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

        {/* Middle Coin (Coin 2) */}
        <ellipse cx="32" cy="34" rx="20" ry="7" fill="url(#coinRimGold)" />
        <path d="M 12 28 C 12 33 52 33 52 28 L 52 34 C 52 39 12 39 12 34 Z" fill="url(#coinGradGold)" />
        <ellipse cx="32" cy="28" rx="20" ry="6.5" fill="url(#coinTopGold)" stroke="#fef08a" strokeWidth="0.75" />
        <ellipse cx="32" cy="28" rx="16" ry="4.8" fill="none" stroke="#d97706" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

        {/* Top Coin (Coin 1) */}
        <ellipse cx="32" cy="22" rx="20" ry="7" fill="url(#coinRimGold)" />
        <path d="M 12 16 C 12 21 52 21 52 16 L 52 22 C 52 27 12 27 12 22 Z" fill="url(#coinGradGold)" />
        <ellipse cx="32" cy="16" rx="20" ry="6.5" fill="url(#coinTopGold)" stroke="#fffbeb" strokeWidth="0.9" />
        <ellipse cx="32" cy="16" rx="15" ry="4.5" fill="none" stroke="#b45309" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        
        {/* Embossed VR star / symbol on top coin */}
        <path d="M 32 13.5 L 33.2 15.5 L 35.5 16 L 33.8 17.5 L 34.2 19.5 L 32 18.3 L 29.8 19.5 L 30.2 17.5 L 28.5 16 L 30.8 15.5 Z" fill="#b45309" opacity="0.65" />

        {/* Sparkle glint */}
        <path d="M 44 11 L 45.5 14 L 48.5 15.5 L 45.5 17 L 44 20 L 42.5 17 L 39.5 15.5 L 42.5 14 Z" fill="#ffffff" opacity="0.95" />
        <circle cx="44" cy="15.5" r="1.5" fill="#fef08a" />
      </svg>
    </div>
  );
}

// 2. 3D Royal Purple Gift Box with Golden Ribbons (Day 4 & Hero Artwork)
export function GiftBoxArtwork({ size = 58, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 6px 14px rgba(168, 85, 247, 0.45))' }}
      >
        <defs>
          <linearGradient id="giftBoxBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="50%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="giftBoxLid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#6b21a8" />
          </linearGradient>
          <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* Box Shadow */}
        <ellipse cx="32" cy="56" rx="20" ry="4" fill="rgba(0,0,0,0.35)" />

        {/* Box Body */}
        <rect x="14" y="27" width="36" height="26" rx="5" fill="url(#giftBoxBody)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />

        {/* Vertical Ribbon Body */}
        <rect x="28.5" y="27" width="7" height="26" fill="url(#goldRibbon)" />

        {/* Box Lid */}
        <rect x="11" y="20" width="42" height="10" rx="4" fill="url(#giftBoxLid)" stroke="#e9d5ff" strokeWidth="0.6" />
        <rect x="28.5" y="20" width="7" height="10" fill="url(#goldRibbon)" />

        {/* 3D Ribbon Bow */}
        {/* Left Bow Loop */}
        <path d="M 32 20 C 26 12 16 13 18 19 C 20 22 28 20 32 20 Z" fill="url(#goldRibbon)" stroke="#fef08a" strokeWidth="0.5" />
        {/* Right Bow Loop */}
        <path d="M 32 20 C 38 12 48 13 46 19 C 44 22 36 20 32 20 Z" fill="url(#goldRibbon)" stroke="#fef08a" strokeWidth="0.5" />
        {/* Center Knot */}
        <circle cx="32" cy="20" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="0.8" />

        {/* Sparkle Glint */}
        <path d="M 46 14 L 47 16 L 49 17 L 47 18 L 46 20 L 45 18 L 43 17 L 45 16 Z" fill="#ffffff" />
      </svg>
    </div>
  );
}

// 3. 3D Amazon Gift Card Artwork (Day 5 & Hero Banner)
export function AmazonCardArtwork({ size = 58, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}
    >
      <svg
        width={size}
        height={Math.round(size * 0.78)}
        viewBox="0 0 64 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 6px 14px rgba(255, 153, 0, 0.35))' }}
      >
        <defs>
          <linearGradient id="amazonCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#232f3e" />
            <stop offset="60%" stopColor="#131921" />
            <stop offset="100%" stopColor="#0f141d" />
          </linearGradient>
          <linearGradient id="amazonGoldSmile" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9900" />
            <stop offset="100%" stopColor="#ffb84d" />
          </linearGradient>
        </defs>

        {/* Card Body */}
        <rect x="2" y="2" width="60" height="46" rx="7" fill="url(#amazonCardGrad)" stroke="rgba(255, 153, 0, 0.5)" strokeWidth="1.2" />

        {/* Subtle Chip / Hologram */}
        <rect x="8" y="10" width="8" height="6" rx="1.5" fill="rgba(255, 215, 0, 0.35)" stroke="#fbbf24" strokeWidth="0.5" />

        {/* Amazon bold 'a' logo in center */}
        <text
          x="32"
          y="28"
          fill="#ffffff"
          fontSize="20"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          textAnchor="middle"
        >
          a
        </text>

        {/* Amazon smile arrow under 'a' */}
        <path
          d="M 22 33 Q 32 39 42 33"
          stroke="url(#amazonGoldSmile)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 39 31.5 L 43 33.5 L 40 36.5 Z"
          fill="#ff9900"
        />

        {/* "GIFT CARD" tag at top right */}
        <text
          x="55"
          y="12"
          fill="#94a3b8"
          fontSize="5.5"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          textAnchor="end"
          letterSpacing="0.4"
        >
          GIFT CARD
        </text>
      </svg>
    </div>
  );
}

// 4. 3D Imperial Gold Crown Artwork (Day 7 & Ultimate Reward Banner)
export function CrownArtwork({ size = 68, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 18px rgba(245, 158, 11, 0.55))' }}
      >
        <defs>
          <linearGradient id="crownGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="crownVelvet" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>
        </defs>

        {/* Velvet Inner Dome Cushion */}
        <ellipse cx="32" cy="34" rx="16" ry="12" fill="url(#crownVelvet)" opacity="0.9" />

        {/* Crown Base Rim */}
        <rect x="12" y="42" width="40" height="8" rx="3" fill="url(#crownGradGold)" stroke="#fef08a" strokeWidth="0.8" />
        {/* Crown Rim Jewels */}
        <circle cx="18" cy="46" r="2" fill="#ef4444" stroke="#fff" strokeWidth="0.5" />
        <circle cx="27" cy="46" r="2" fill="#3b82f6" stroke="#fff" strokeWidth="0.5" />
        <circle cx="36" cy="46" r="2.2" fill="#10b981" stroke="#fff" strokeWidth="0.5" />
        <circle cx="45" cy="46" r="2" fill="#ef4444" stroke="#fff" strokeWidth="0.5" />

        {/* Crown 5 Peaks / Arches */}
        <path
          d="M 12 42 L 10 24 L 20 33 L 32 16 L 44 33 L 54 24 L 52 42 Z"
          fill="url(#crownGradGold)"
          stroke="#fffbeb"
          strokeWidth="0.8"
        />

        {/* Crown Jewels on 5 Peak Tips */}
        <circle cx="10" cy="24" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
        <circle cx="20" cy="33" r="2.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.6" />
        <circle cx="32" cy="16" r="4.2" fill="#fffbeb" stroke="#d97706" strokeWidth="1" />
        <circle cx="32" cy="16" r="2.2" fill="#ef4444" />
        <circle cx="44" cy="33" r="2.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.6" />
        <circle cx="54" cy="24" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />

        {/* Sparkles around crown */}
        <path d="M 48 12 L 49.5 15 L 52.5 16.5 L 49.5 18 L 48 21 L 46.5 18 L 43.5 16.5 L 46.5 15 Z" fill="#ffffff" />
        <path d="M 16 14 L 17 16 L 19 17 L 17 18 L 16 20 L 15 18 L 13 17 L 15 16 Z" fill="#fef08a" />
      </svg>
    </div>
  );
}

// 5. 3D Desk Calendar Artwork (Hero Left Banner Visual)
export function CalendarArtwork({ size = 74, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 74 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 18px rgba(124, 58, 237, 0.45))' }}
      >
        <defs>
          <linearGradient id="calHeader" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id="calPage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>

        {/* Desk Pad Base / Shadow */}
        <rect x="12" y="16" width="50" height="48" rx="10" fill="url(#calHeader)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* Binder Rings */}
        <rect x="22" y="10" width="5" height="11" rx="2.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
        <rect x="47" y="10" width="5" height="11" rx="2.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />

        {/* White Calendar Sheet */}
        <rect x="16" y="25" width="42" height="34" rx="7" fill="url(#calPage)" />

        {/* Big Golden Yellow Checkmark */}
        <path
          d="M 26 42 L 33 49 L 48 33"
          stroke="#eab308"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Golden Coin in corner */}
        <circle cx="56" cy="54" r="10" fill="url(#crownGradGold)" stroke="#fffbeb" strokeWidth="1" />
        <text x="56" y="58" fill="#78350f" fontSize="11" fontWeight="900" textAnchor="middle">★</text>
      </svg>
    </div>
  );
}

// 6. Amazon Brand Logo Pill
export function AmazonBrandLogo({ className = '' }) {
  return (
    <div
      className={`d-inline-flex align-items-center gap-1.5 px-2 py-1 rounded-pill ${className}`}
      style={{
        background: 'rgba(31, 41, 55, 0.95)',
        border: '1px solid rgba(255, 153, 0, 0.45)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)'
      }}
    >
      <FaAmazon size={14} color="#ff9900" />
      <span className="fw-bold text-white small" style={{ fontSize: '0.78rem', letterSpacing: '0.2px' }}>
        Amazon Gift Card
      </span>
    </div>
  );
}
