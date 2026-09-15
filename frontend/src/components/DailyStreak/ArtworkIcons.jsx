import React from 'react';

/**
 * High-Definition 3D Vector Artworks matching VELoop Rewards PDF Designs (Pages 62 & 63)
 * Provides pixel-perfect visual fidelity for Coins, Amazon Gift Cards, Gift Boxes, Crowns & Calendar.
 */

// 1. Stacked 3D Golden Coins (Used in Days 1, 2, 3, 6 & Stats)
export function CoinsStackArtwork({ size = 56, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 6px 12px rgba(234, 179, 8, 0.35))' }}
    >
      <defs>
        {/* Gold Gradients */}
        <linearGradient id="coinGoldTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="25%" stopColor="#FCD34D" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="coinGoldSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="coinRimShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Bottom Coin (Coin 3) */}
      <g transform="translate(0, 18)">
        <ellipse cx="40" cy="46" rx="28" ry="11" fill="url(#coinGoldSide)" />
        <ellipse cx="40" cy="43" rx="28" ry="11" fill="url(#coinGoldTop)" />
        <ellipse cx="40" cy="43" rx="24" ry="9" stroke="url(#coinRimShine)" strokeWidth="1.5" fill="none" opacity="0.7" />
      </g>

      {/* Middle Coin (Coin 2) */}
      <g transform="translate(0, 9)">
        <ellipse cx="40" cy="38" rx="29" ry="11.5" fill="url(#coinGoldSide)" />
        <ellipse cx="40" cy="35" rx="29" ry="11.5" fill="url(#coinGoldTop)" />
        <ellipse cx="40" cy="35" rx="25" ry="9.5" stroke="url(#coinRimShine)" strokeWidth="1.5" fill="none" opacity="0.8" />
      </g>

      {/* Top Front Coin (Coin 1) */}
      <g>
        <ellipse cx="40" cy="28" rx="30" ry="12" fill="url(#coinGoldSide)" />
        <ellipse cx="40" cy="25" rx="30" ry="12" fill="url(#coinGoldTop)" />
        <ellipse cx="40" cy="25" rx="26" ry="10" stroke="url(#coinRimShine)" strokeWidth="2" fill="none" />
        
        {/* Inner Embossed VE Star / Diamond Emblem */}
        <polygon
          points="40,18 43,23 48,25 43,27 40,32 37,27 32,25 37,23"
          fill="#FFFBEB"
          opacity="0.9"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(180, 83, 9, 0.6))' }}
        />
        
        {/* Specular Highlight Streak */}
        <path
          d="M22 23 C28 17, 44 16, 56 22"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
    </svg>
  );
}

// 2. 3D Royal Purple Gift Box with Golden Bow (Used in Day 4 & Hero Artwork)
export function GiftBoxArtwork({ size = 56, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 8px 16px rgba(168, 85, 247, 0.45))' }}
    >
      <defs>
        {/* Box Gradients */}
        <linearGradient id="boxFront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#581C87" />
        </linearGradient>
        <linearGradient id="boxSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7E22CE" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>
        <linearGradient id="boxLid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>
        <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Main Cube Body */}
      <path d="M18 36 L40 46 L40 70 L18 58 Z" fill="url(#boxFront)" />
      <path d="M40 46 L62 36 L62 58 L40 70 Z" fill="url(#boxSide)" />
      <path d="M18 36 L40 26 L62 36 L40 46 Z" fill="url(#boxLid)" />

      {/* Vertical Golden Ribbon */}
      <path d="M28 32 L34 35 L34 67 L28 63 Z" fill="url(#goldRibbon)" opacity="0.95" />
      <path d="M46 39 L52 36 L52 61 L46 64 Z" fill="url(#goldRibbon)" opacity="0.85" />

      {/* Horizontal Golden Ribbon */}
      <path d="M18 45 L40 55 L40 59 L18 49 Z" fill="url(#goldRibbon)" opacity="0.9" />
      <path d="M40 55 L62 45 L62 49 L40 59 Z" fill="url(#goldRibbon)" opacity="0.9" />

      {/* 3D Golden Bow on Top */}
      <g transform="translate(40, 24)">
        {/* Left Bow Loop */}
        <path
          d="M0 0 C-10 -12, -22 -6, -8 4 C-3 6, 0 1, 0 0 Z"
          fill="url(#goldRibbon)"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        />
        {/* Right Bow Loop */}
        <path
          d="M0 0 C10 -12, 22 -6, 8 4 C3 6, 0 1, 0 0 Z"
          fill="url(#goldRibbon)"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        />
        {/* Center Knot */}
        <circle cx="0" cy="1" r="4.5" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
        {/* Sparkle star */}
        <path d="M14 -6 L15 -3 L18 -2 L15 -1 L14 2 L13 -1 L10 -2 L13 -3 Z" fill="#FDE047" />
      </g>
    </svg>
  );
}

// 3. Authentic Amazon Gift Card with Curved Orange Smile Arrow (Day 5 & Hero Banner)
export function AmazonCardArtwork({ size = 56, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 6px 14px rgba(255, 153, 0, 0.3))' }}
    >
      <defs>
        {/* Matte Black Card Gradient */}
        <linearGradient id="amznCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D333B" />
          <stop offset="60%" stopColor="#1C2128" />
          <stop offset="100%" stopColor="#0D1117" />
        </linearGradient>
        {/* Orange Smile Gradient */}
        <linearGradient id="amznSmileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF9900" />
          <stop offset="100%" stopColor="#FFB84D" />
        </linearGradient>
      </defs>

      {/* Card Base */}
      <rect
        x="10"
        y="16"
        width="60"
        height="48"
        rx="8"
        fill="url(#amznCardBg)"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1.5"
      />

      {/* Subtle Card Glow / Chip */}
      <rect x="16" y="24" width="9" height="7" rx="2" fill="#F59E0B" opacity="0.35" />

      {/* White Classic 'a' Logo */}
      <text
        x="33"
        y="45"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="26"
        fontWeight="bold"
        textAnchor="middle"
      >
        a
      </text>

      {/* Iconic Amazon Curved Smile Arrow */}
      <g transform="translate(18, 43)">
        <path
          d="M5 6 C13 14, 25 14, 34 5"
          stroke="url(#amznSmileGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrowhead */}
        <path
          d="M31 1 L36 6 L31 9 Z"
          fill="#FF9900"
          transform="rotate(-15 34 5)"
        />
      </g>
    </svg>
  );
}

// 4. Majestic 3D Golden Crown with Gemstones & Velvet (Day 7 & Ultimate Reward)
export function CrownArtwork({ size = 56, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 8px 20px rgba(234, 179, 8, 0.5))' }}
    >
      <defs>
        {/* Rich Gold Gradient */}
        <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="30%" stopColor="#FCD34D" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        {/* Velvet Purple Cushion */}
        <radialGradient id="crownVelvet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="70%" stopColor="#581C87" />
          <stop offset="100%" stopColor="#2E1065" />
        </radialGradient>
      </defs>

      {/* Purple Velvet Royal Cushion */}
      <path
        d="M18 52 C18 36, 62 36, 62 52 Z"
        fill="url(#crownVelvet)"
        opacity="0.9"
      />

      {/* 5-Peak Golden Imperial Crown Structure */}
      <path
        d="M12 52 L15 30 L28 42 L40 20 L52 42 L65 30 L68 52 Z"
        fill="url(#crownGold)"
        stroke="#78350F"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Bottom Golden Studded Band */}
      <rect
        x="12"
        y="50"
        width="56"
        height="12"
        rx="4"
        fill="url(#crownGold)"
        stroke="#78350F"
        strokeWidth="1"
      />

      {/* Gemstones on the 5 Peaks */}
      <circle cx="15" cy="29" r="3.5" fill="#EF4444" stroke="#FFF" strokeWidth="0.8" />
      <circle cx="28" cy="41" r="2.8" fill="#06B6D4" stroke="#FFF" strokeWidth="0.8" />
      <circle cx="40" cy="19" r="4.5" fill="#EF4444" stroke="#FFFBEB" strokeWidth="1" />
      <circle cx="52" cy="41" r="2.8" fill="#06B6D4" stroke="#FFF" strokeWidth="0.8" />
      <circle cx="65" cy="29" r="3.5" fill="#EF4444" stroke="#FFF" strokeWidth="0.8" />

      {/* Diamond / Ruby Inlays on Base Band */}
      <circle cx="22" cy="56" r="2" fill="#06B6D4" />
      <circle cx="31" cy="56" r="2.5" fill="#EF4444" />
      <circle cx="40" cy="56" r="3" fill="#10B981" stroke="#FFF" strokeWidth="0.5" />
      <circle cx="49" cy="56" r="2.5" fill="#EF4444" />
      <circle cx="58" cy="56" r="2" fill="#06B6D4" />

      {/* Specular Light Glows */}
      <path
        d="M38 23 L42 23"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 5. 3D Purple Calendar Deskpad Artwork (Used in Hero Left Artwork)
export function CalendarArtwork({ size = 70, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 8px 18px rgba(147, 51, 234, 0.4))' }}
    >
      <defs>
        <linearGradient id="calBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient id="calPage" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>

      {/* Calendar Backing Stand */}
      <rect x="12" y="18" width="66" height="58" rx="10" fill="url(#calBg)" />

      {/* White Front Page */}
      <rect x="18" y="28" width="54" height="42" rx="6" fill="url(#calPage)" />

      {/* Silver Binder Rings */}
      <rect x="26" y="12" width="6" height="14" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <rect x="42" y="12" width="6" height="14" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <rect x="58" y="12" width="6" height="14" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />

      {/* Big Golden Success Checkmark */}
      <path
        d="M32 48 L41 57 L58 38"
        stroke="#F59E0B"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.4))' }}
      />

      {/* Mini Gold Coin on Corner */}
      <g transform="translate(56, 54)">
        <circle cx="10" cy="10" r="9" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="6" stroke="#FEF3C7" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

// 6. Amazon Brand Pill Logo with Smile (Used in Ultimate Reward Banner)
export function AmazonBrandLogo({ className = '' }) {
  return (
    <div className={`d-inline-flex align-items-center gap-1.5 ${className}`}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22px',
          height: '22px',
          backgroundColor: '#111827',
          color: '#ffffff',
          borderRadius: '5px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: '15px',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          position: 'relative'
        }}
      >
        a
        <span
          style={{
            position: 'absolute',
            bottom: '2px',
            width: '10px',
            height: '3px',
            borderBottom: '2px solid #ff9900',
            borderRadius: '50%'
          }}
        ></span>
      </span>
      <span className="fw-bold text-white small" style={{ letterSpacing: '0.2px' }}>
        Amazon Gift Card
      </span>
    </div>
  );
}
