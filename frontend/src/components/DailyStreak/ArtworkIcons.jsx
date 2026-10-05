import React from 'react';
import { FaAmazon } from 'react-icons/fa6';

/**
 * High-Fidelity 3D Vector Artworks for VELoop Rewards Daily Streak
 * 100% resolution independent, crisp SVG vector assets with rich multi-stop
 * gradients, specular reflections, 3D shading, and vibrant particle glows.
 */

// 1. 3D Stack of Gold Coins (Days 1, 2, 3 & Stats) with VR Embossed Star
export function CoinsStackArtwork({ size = 58, tier = 'normal', className = '' }) {
  const isMega = tier === 'mega';
  const width = size;
  const height = Math.round(size * (isMega ? 1.05 : 0.95));

  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        flexShrink: 0,
        position: 'relative'
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: isMega
            ? 'drop-shadow(0 8px 18px rgba(245, 158, 11, 0.6)) drop-shadow(0 0 12px rgba(251, 191, 36, 0.4))'
            : 'drop-shadow(0 6px 14px rgba(245, 158, 11, 0.45))'
        }}
      >
        <defs>
          <linearGradient id={`coinGradGold_${isMega ? 'mega' : 'std'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="20%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#fbbf24" />
            <stop offset="75%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id={`coinTopFace_${isMega ? 'mega' : 'std'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="90%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="coinRimShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id="coinGlintBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="coinAuraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo Glow */}
        <circle cx="36" cy="36" r="32" fill="url(#coinAuraGlow)" />

        {/* Bottom Coin (Coin 3) */}
        <ellipse cx="36" cy="52" rx="22" ry="7.5" fill="url(#coinRimShade)" />
        <path d="M 14 45 C 14 51 58 51 58 45 L 58 52 C 58 58 14 58 14 52 Z" fill={`url(#coinGradGold_${isMega ? 'mega' : 'std'})`} />
        <ellipse cx="36" cy="45" rx="22" ry="7" fill={`url(#coinTopFace_${isMega ? 'mega' : 'std'})`} stroke="#fef08a" strokeWidth="0.8" />
        <ellipse cx="36" cy="45" rx="18" ry="5.2" fill="none" stroke="#d97706" strokeWidth="0.75" strokeDasharray="2 1.5" />

        {/* Middle Coin (Coin 2) */}
        <ellipse cx="36" cy="38" rx="22" ry="7.5" fill="url(#coinRimShade)" />
        <path d="M 14 31 C 14 37 58 37 58 31 L 58 38 C 58 44 14 44 14 38 Z" fill={`url(#coinGradGold_${isMega ? 'mega' : 'std'})`} />
        <ellipse cx="36" cy="31" rx="22" ry="7" fill={`url(#coinTopFace_${isMega ? 'mega' : 'std'})`} stroke="#fef08a" strokeWidth="0.8" />
        <ellipse cx="36" cy="31" rx="18" ry="5.2" fill="none" stroke="#d97706" strokeWidth="0.75" strokeDasharray="2 1.5" />

        {/* Extra Coin for Mega Tier (Day 6) */}
        {isMega && (
          <g>
            <ellipse cx="36" cy="24" rx="22" ry="7.5" fill="url(#coinRimShade)" />
            <path d="M 14 17 C 14 23 58 23 58 17 L 58 24 C 58 30 14 30 14 24 Z" fill="url(#coinGradGold_mega)" />
            <ellipse cx="36" cy="17" rx="22" ry="7" fill="url(#coinTopFace_mega)" stroke="#fef08a" strokeWidth="0.8" />
          </g>
        )}

        {/* Top Coin (Coin 1) */}
        <g transform={isMega ? 'translate(0, -6)' : ''}>
          <ellipse cx="36" cy="24" rx="22" ry="7.5" fill="url(#coinRimShade)" />
          <path d="M 14 17 C 14 23 58 23 58 17 L 58 24 C 58 30 14 30 14 24 Z" fill={`url(#coinGradGold_${isMega ? 'mega' : 'std'})`} />
          <ellipse cx="36" cy="17" rx="22" ry="7.2" fill={`url(#coinTopFace_${isMega ? 'mega' : 'std'})`} stroke="#ffffff" strokeWidth="0.9" />
          <ellipse cx="36" cy="17" rx="17" ry="5" fill="none" stroke="#b45309" strokeWidth="0.85" strokeDasharray="2 1.5" />

          {/* Embossed VELoop 5-point star emblem */}
          <path
            d="M 36 12.8 L 37.8 15.5 L 41 16.2 L 38.6 18.2 L 39.2 21.2 L 36 19.6 L 32.8 21.2 L 33.4 18.2 L 31 16.2 L 34.2 15.5 Z"
            fill="#b45309"
            stroke="#fef08a"
            strokeWidth="0.4"
          />

          {/* Specular sheen beam across top surface */}
          <ellipse cx="32" cy="15.5" rx="14" ry="3.5" fill="url(#coinGlintBeam)" opacity="0.65" />

          {/* Sparkle Glint 1 */}
          <path d="M 50 11 L 51.5 14 L 54.5 15.5 L 51.5 17 L 50 20 L 48.5 17 L 45.5 15.5 L 48.5 14 Z" fill="#ffffff" />
          <circle cx="50" cy="15.5" r="1.5" fill="#fef08a" />

          {/* Sparkle Glint 2 (for mega) */}
          {isMega && (
            <g>
              <path d="M 22 9 L 23 11 L 25 12 L 23 13 L 22 15 L 21 13 L 19 12 L 21 11 Z" fill="#ffffff" />
              <circle cx="22" cy="12" r="1.2" fill="#fef08a" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

// 2. 3D Royal Purple Mystery Gift Box with Golden Ribbons (Day 4 & Hero)
export function GiftBoxArtwork({ size = 58, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0, position: 'relative' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 18px rgba(168, 85, 247, 0.5))' }}
      >
        <defs>
          <linearGradient id="giftBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="40%" stopColor="#7e22ce" />
            <stop offset="85%" stopColor="#581c87" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>

          <linearGradient id="giftLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="30%" stopColor="#a855f7" />
            <stop offset="70%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>

          <linearGradient id="ribbonGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#fbbf24" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <radialGradient id="giftAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="36" cy="38" r="30" fill="url(#giftAura)" />

        {/* Ground Drop Shadow */}
        <ellipse cx="36" cy="63" rx="23" ry="5.5" fill="rgba(0, 0, 0, 0.45)" />

        {/* Gift Box Main Body */}
        <rect
          x="15"
          y="31"
          width="42"
          height="30"
          rx="7"
          fill="url(#giftBodyGrad)"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="0.8"
        />

        {/* Front Specular Highlight strip */}
        <rect x="17" y="33" width="3" height="26" rx="1.5" fill="#ffffff" opacity="0.35" />

        {/* Vertical Ribbon on Body */}
        <rect x="32" y="31" width="8" height="30" fill="url(#ribbonGoldGrad)" stroke="#b45309" strokeWidth="0.4" />
        <line x1="36" y1="31" x2="36" y2="61" stroke="#fef08a" strokeWidth="0.6" strokeDasharray="2 1" />

        {/* Horizontal Ribbon on Body */}
        <rect x="15" y="43" width="42" height="7" fill="url(#ribbonGoldGrad)" stroke="#b45309" strokeWidth="0.4" />

        {/* Gift Box Lid */}
        <rect
          x="11"
          y="22"
          width="50"
          height="12"
          rx="5"
          fill="url(#giftLidGrad)"
          stroke="#e9d5ff"
          strokeWidth="0.8"
        />
        {/* Vertical Ribbon on Lid */}
        <rect x="32" y="22" width="8" height="12" fill="url(#ribbonGoldGrad)" stroke="#b45309" strokeWidth="0.4" />

        {/* 3D Golden Ribbon Bow */}
        {/* Left Loop */}
        <path
          d="M 36 22 C 28 12 14 13 18 21 C 21 25 31 23 36 22 Z"
          fill="url(#ribbonGoldGrad)"
          stroke="#fef08a"
          strokeWidth="0.6"
        />
        {/* Right Loop */}
        <path
          d="M 36 22 C 44 12 58 13 54 21 C 51 25 41 23 36 22 Z"
          fill="url(#ribbonGoldGrad)"
          stroke="#fef08a"
          strokeWidth="0.6"
        />
        {/* Center Knot Sphere */}
        <circle cx="36" cy="22" r="4.2" fill="url(#ribbonGoldGrad)" stroke="#ffffff" strokeWidth="0.8" />

        {/* Sparkle Glints */}
        <path d="M 52 14 L 53.5 17 L 56.5 18.5 L 53.5 20 L 52 23 L 50.5 20 L 47.5 18.5 L 50.5 17 Z" fill="#ffffff" />
        <circle cx="52" cy="18.5" r="1.5" fill="#fef08a" />
      </svg>
    </div>
  );
}

// 3. 3D Amazon Gift Card Artwork (Day 5 & Hero Banner)
export function AmazonCardArtwork({ size = 58, className = '' }) {
  const width = size;
  const height = Math.round(size * 0.82);

  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px`, flexShrink: 0, position: 'relative' }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 72 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 18px rgba(255, 153, 0, 0.45))' }}
      >
        <defs>
          <linearGradient id="amzCardDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c3746" />
            <stop offset="35%" stopColor="#1f2937" />
            <stop offset="70%" stopColor="#131921" />
            <stop offset="100%" stopColor="#0b0f19" />
          </linearGradient>

          <linearGradient id="amzGoldSmileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9900" />
            <stop offset="60%" stopColor="#ffb84d" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="amzHoloSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#ff9900" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="amzCardAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff9900" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff9900" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="36" cy="29" r="28" fill="url(#amzCardAura)" />

        {/* Card Body */}
        <rect
          x="3"
          y="4"
          width="66"
          height="50"
          rx="8"
          fill="url(#amzCardDarkGrad)"
          stroke="rgba(255, 153, 0, 0.6)"
          strokeWidth="1.2"
        />

        {/* Diagonal Specular Foil Reflection Beam */}
        <path d="M 3 14 L 38 4 L 48 4 L 3 36 Z" fill="url(#amzHoloSheen)" opacity="0.6" />

        {/* Gold EMV Microchip */}
        <rect x="9" y="11" width="10" height="7.5" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />
        <line x1="14" y1="11" x2="14" y2="18.5" stroke="#b45309" strokeWidth="0.5" />
        <line x1="9" y1="14.8" x2="19" y2="14.8" stroke="#b45309" strokeWidth="0.5" />

        {/* Amazon bold 'a' mark */}
        <text
          x="36"
          y="31"
          fill="#ffffff"
          fontSize="22"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          textAnchor="middle"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
        >
          a
        </text>

        {/* Amazon Smile Arrow */}
        <path
          d="M 24 37 Q 36 44 48 37"
          stroke="url(#amzGoldSmileGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M 45 35 L 49.5 37.5 L 46 41 Z" fill="#ff9900" />

        {/* "GIFT CARD" text */}
        <text
          x="62"
          y="15"
          fill="#94a3b8"
          fontSize="6"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          letterSpacing="0.6"
          textAnchor="end"
        >
          GIFT CARD
        </text>

        {/* Sparkle Glint on Corner */}
        <path d="M 60 7 L 61 9 L 63 10 L 61 11 L 60 13 L 59 11 L 57 10 L 59 9 Z" fill="#ffffff" />
      </svg>
    </div>
  );
}

// 4. 3D Imperial Gold Crown Artwork (Day 7 & Ultimate Reward Banner)
export function CrownArtwork({ size = 68, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0, position: 'relative' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 74 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 10px 24px rgba(245, 158, 11, 0.7)) drop-shadow(0 0 16px rgba(251, 191, 36, 0.5))'
        }}
      >
        <defs>
          <linearGradient id="crownGoldBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="crownVelvetCushion" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="60%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>

          <radialGradient id="crownAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Golden Halo */}
        <circle cx="37" cy="37" r="33" fill="url(#crownAura)" />

        {/* Velvet Inner Dome Cushion */}
        <ellipse cx="37" cy="38" rx="19" ry="14" fill="url(#crownVelvetCushion)" opacity="0.95" />

        {/* Crown Lower Base Rim */}
        <rect
          x="12"
          y="47"
          width="50"
          height="10"
          rx="4"
          fill="url(#crownGoldBodyGrad)"
          stroke="#fffbeb"
          strokeWidth="1"
        />

        {/* Crown Rim Jewels (Ruby, Sapphire, Emerald, Ruby, Sapphire) */}
        <circle cx="19" cy="52" r="2.4" fill="#ef4444" stroke="#fff" strokeWidth="0.6" />
        <circle cx="28" cy="52" r="2.4" fill="#3b82f6" stroke="#fff" strokeWidth="0.6" />
        <circle cx="37" cy="52" r="2.8" fill="#10b981" stroke="#fff" strokeWidth="0.6" />
        <circle cx="46" cy="52" r="2.4" fill="#ef4444" stroke="#fff" strokeWidth="0.6" />
        <circle cx="55" cy="52" r="2.4" fill="#3b82f6" stroke="#fff" strokeWidth="0.6" />

        {/* 5 Crown Peaks (Majestic Arches) */}
        <path
          d="M 12 47 L 11 25 L 23 37 L 37 17 L 51 37 L 63 25 L 62 47 Z"
          fill="url(#crownGoldBodyGrad)"
          stroke="#fffbeb"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* 5 Golden Sphere / Diamond Tips */}
        {/* Far Left */}
        <circle cx="11" cy="25" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
        {/* Mid Left */}
        <circle cx="23" cy="37" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="0.7" />
        {/* Center Peak (Grand Ruby + Star Tip) */}
        <circle cx="37" cy="17" r="5" fill="#ffffff" stroke="#d97706" strokeWidth="1.2" />
        <circle cx="37" cy="17" r="2.8" fill="#ef4444" />
        {/* Mid Right */}
        <circle cx="51" cy="37" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="0.7" />
        {/* Far Right */}
        <circle cx="63" cy="25" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />

        {/* Embossed Center Star on Crown Front */}
        <path
          d="M 37 36 L 38.6 39.5 L 42.5 40 L 39.5 42.5 L 40.5 46.5 L 37 44.5 L 33.5 46.5 L 34.5 42.5 L 31.5 40 L 35.4 39.5 Z"
          fill="#ffffff"
          stroke="#b45309"
          strokeWidth="0.6"
          opacity="0.9"
        />

        {/* Sparkle Glints around Crown */}
        <path d="M 55 12 L 56.5 15 L 59.5 16.5 L 56.5 18 L 55 21 L 53.5 18 L 50.5 16.5 L 53.5 15 Z" fill="#ffffff" />
        <circle cx="55" cy="16.5" r="1.5" fill="#fef08a" />

        <path d="M 18 14 L 19 16.5 L 21.5 17.5 L 19 18.5 L 18 21 L 17 18.5 L 14.5 17.5 L 17 16.5 Z" fill="#ffffff" />
      </svg>
    </div>
  );
}

// 5. 3D Holographic Desk Calendar Artwork (Hero Left Banner Visual)
export function CalendarArtwork({ size = 74, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0, position: 'relative' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 10px 22px rgba(124, 58, 237, 0.55))' }}
      >
        <defs>
          <linearGradient id="calStandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>

          <linearGradient id="calSheetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="calGoldCheck" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <radialGradient id="calAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo */}
        <circle cx="38" cy="38" r="32" fill="url(#calAura)" />

        {/* Desk Base Stand */}
        <rect
          x="11"
          y="16"
          width="54"
          height="50"
          rx="11"
          fill="url(#calStandGrad)"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.2"
        />

        {/* Metallic Binder Rings */}
        <rect x="23" y="10" width="5.5" height="12" rx="2.75" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />
        <rect x="47" y="10" width="5.5" height="12" rx="2.75" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />

        {/* White Calendar Sheet */}
        <rect x="16" y="25" width="44" height="36" rx="8" fill="url(#calSheetGrad)" stroke="#cbd5e1" strokeWidth="0.8" />

        {/* Header month line on sheet */}
        <rect x="22" y="29" width="32" height="3" rx="1.5" fill="#c084fc" />

        {/* Big Radiant Gold Checkmark */}
        <path
          d="M 26 43 L 34 51 L 50 33"
          stroke="url(#calGoldCheck)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 2px 6px rgba(245, 158, 11, 0.5))' }}
        />

        {/* Golden Star Badge in bottom right corner */}
        <circle cx="58" cy="56" r="11" fill="url(#crownGoldBodyGrad)" stroke="#ffffff" strokeWidth="1.2" />
        <text x="58" y="60.5" fill="#78350f" fontSize="12" fontWeight="900" textAnchor="middle">
          ★
        </text>
      </svg>
    </div>
  );
}

// 6. 3D Stylized Streak Flame Artwork
export function StreakFlameArtwork({ size = 28, className = '' }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}
    >
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="flameOuter" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="60%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Outer Flame */}
        <path
          d="M16 2 C16 2 20 8 20 12 C20 14 19 16 18 17 C22 17 26 21 26 25 C26 28.5 21.5 30 16 30 C10.5 30 6 28.5 6 25 C6 21 10 18 12 15 C12 11 16 2 16 2 Z"
          fill="url(#flameOuter)"
          style={{ filter: 'drop-shadow(0 0 6px rgba(234, 88, 12, 0.7))' }}
        />

        {/* Inner White/Yellow Core Flame */}
        <path
          d="M16 12 C16 12 19 16 19 19 C19 21 17.5 22 16 22 C14.5 22 13 21 13 19 C13 16 16 12 16 12 Z"
          fill="url(#flameInner)"
        />
      </svg>
    </div>
  );
}

// 7. Amazon Brand Logo Pill
export function AmazonBrandLogo({ className = '' }) {
  return (
    <div
      className={`d-inline-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill ${className}`}
      style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(255, 153, 0, 0.55)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.45)'
      }}
    >
      <FaAmazon size={14} color="#ff9900" />
      <span
        className="fw-bold text-white small"
        style={{ fontSize: '0.78rem', letterSpacing: '0.2px', whiteSpace: 'nowrap' }}
      >
        Amazon Gift Card
      </span>
    </div>
  );
}
