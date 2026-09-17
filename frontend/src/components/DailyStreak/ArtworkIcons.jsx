import React from 'react';

/**
 * High-Definition 3D Vector Artworks matching VELoop Rewards PDF Designs (Pages 62 & 63)
 * Provides pixel-perfect visual fidelity for Coins, Amazon Gift Cards, Gift Boxes, Crowns & Calendar.
 */

// 1. Stacked 3D Golden Coins with VR Stamped Emblem (Used in Days 1, 2, 3, 6 & Stats)
export function CoinsStackArtwork({ size = 56, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 6px 14px rgba(234, 179, 8, 0.4))' }}
    >
      <defs>
        {/* Gold Gradients */}
        <linearGradient id="coinFaceGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9DB" />
          <stop offset="30%" stopColor="#FCD34D" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient id="coinSideGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="40%" stopColor="#B45309" />
          <stop offset="80%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        <linearGradient id="coinRimGlint" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFDEB" />
          <stop offset="50%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient id="coinEmbossGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>

      {/* Back Stack Coin 3 (Bottom Right) */}
      <g transform="translate(18, 14)">
        {/* Side Cylinder */}
        <path d="M22 36 L22 43 C22 49, 58 49, 58 43 L58 36 Z" fill="url(#coinSideGold)" />
        {/* Top Face */}
        <ellipse cx="40" cy="36" rx="18" ry="7.5" fill="url(#coinFaceGold)" stroke="#B45309" strokeWidth="0.8" />
        <ellipse cx="40" cy="36" rx="15" ry="6" stroke="url(#coinRimGlint)" strokeWidth="0.8" fill="none" opacity="0.8" />
      </g>

      {/* Back Stack Coin 2 (Middle Right) */}
      <g transform="translate(18, 4)">
        {/* Side Cylinder */}
        <path d="M22 36 L22 43 C22 49, 58 49, 58 43 L58 36 Z" fill="url(#coinSideGold)" />
        {/* Top Face */}
        <ellipse cx="40" cy="36" rx="18" ry="7.5" fill="url(#coinFaceGold)" stroke="#B45309" strokeWidth="0.8" />
        <ellipse cx="40" cy="36" rx="15" ry="6" stroke="url(#coinRimGlint)" strokeWidth="0.8" fill="none" opacity="0.8" />
      </g>

      {/* Back Stack Coin 1 (Top Right) */}
      <g transform="translate(18, -6)">
        {/* Side Cylinder */}
        <path d="M22 36 L22 43 C22 49, 58 49, 58 43 L58 36 Z" fill="url(#coinSideGold)" />
        {/* Top Face */}
        <ellipse cx="40" cy="36" rx="18" ry="7.5" fill="url(#coinFaceGold)" stroke="#B45309" strokeWidth="0.8" />
        <ellipse cx="40" cy="36" rx="15" ry="6" stroke="url(#coinRimGlint)" strokeWidth="0.8" fill="none" opacity="0.8" />
        {/* Embossed Symbol */}
        <text
          x="40"
          y="39"
          fill="url(#coinEmbossGold)"
          fontSize="9"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          style={{ letterSpacing: '0.5px' }}
        >
          VR
        </text>
      </g>

      {/* Front Hero Coin (Prominent, foreground, left) */}
      <g transform="translate(-2, 12)">
        {/* Drop shadow underneath */}
        <ellipse cx="36" cy="62" rx="24" ry="7" fill="#090514" opacity="0.4" />

        {/* 3D Side Thickness */}
        <path
          d="M12 44 L12 53 C12 62, 60 62, 60 53 L60 44 Z"
          fill="url(#coinSideGold)"
          stroke="#78350F"
          strokeWidth="0.8"
        />

        {/* Coin Edge Ridge Texture Lines */}
        <path d="M14 47 L14 54 M20 50 L20 57 M28 52 L28 59 M36 53 L36 60 M44 52 L44 59 M52 50 L52 57 M58 47 L58 54" stroke="#D97706" strokeWidth="0.8" opacity="0.6" />

        {/* Top Face Ellipse */}
        <ellipse
          cx="36"
          cy="44"
          rx="24"
          ry="10.5"
          fill="url(#coinFaceGold)"
          stroke="#92400E"
          strokeWidth="1"
        />

        {/* Inner Concentric Rim */}
        <ellipse
          cx="36"
          cy="44"
          rx="20"
          ry="8.5"
          stroke="url(#coinRimGlint)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Embossed VR Emblem on Front Face */}
        <g transform="translate(36, 44)">
          {/* Subtle 3D stamp shadow */}
          <text
            x="0"
            y="3.5"
            fill="#78350F"
            fontSize="12"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
            opacity="0.7"
          >
            VR
          </text>
          {/* Embossed Gold VR text */}
          <text
            x="0"
            y="2.5"
            fill="url(#coinEmbossGold)"
            fontSize="12"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
            style={{ letterSpacing: '0.5px' }}
          >
            VR
          </text>
        </g>

        {/* Specular Highlight Arc on Rim */}
        <path
          d="M18 43 C24 38, 48 38, 54 43"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
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
export function AmazonCardArtwork({ size = 58, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.5))' }}
    >
      <defs>
        {/* Dark Matte Card Gradient */}
        <linearGradient id="amzCardMatte" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2E39" />
          <stop offset="40%" stopColor="#1C1F26" />
          <stop offset="100%" stopColor="#0F1115" />
        </linearGradient>

        {/* Orange Smile Gradient */}
        <linearGradient id="amzOrangeSmile" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF9900" />
          <stop offset="100%" stopColor="#FFB347" />
        </linearGradient>

        <linearGradient id="cardBorderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
        </linearGradient>
      </defs>

      {/* Card Base Container */}
      <rect
        x="10"
        y="18"
        width="64"
        height="48"
        rx="8"
        fill="url(#amzCardMatte)"
        stroke="url(#cardBorderGlow)"
        strokeWidth="1.2"
      />

      {/* Subtle Top Sheen */}
      <path
        d="M11 26 C25 21, 55 20, 73 26"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Amazon 'a' Letter Logo */}
      <text
        x="42"
        y="45"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="24"
        fontWeight="bold"
        textAnchor="middle"
      >
        a
      </text>

      {/* Iconic Amazon Orange Smile Arrow */}
      <g transform="translate(25, 43)">
        {/* Smile Arc */}
        <path
          d="M5 7 C14 15, 23 15, 31 7"
          stroke="url(#amzOrangeSmile)"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Smile Arrowhead */}
        <path
          d="M28 3.5 L34 7 L29 10 Z"
          fill="#FF9900"
          transform="rotate(-10 32 7)"
        />
      </g>
    </svg>
  );
}

// 4. Golden Crown Icon (Day 7 & Ultimate Reward)
export function CrownArtwork({ size = 68, className = '' }) {
  return (
    <img
      src="https://cdn-icons-png.flaticon.com/128/9028/9028075.png"
      alt="Crown Reward"
      width={size}
      height={size}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        filter: 'drop-shadow(0 6px 16px rgba(234, 179, 8, 0.45))',
        display: 'inline-block'
      }}
      loading="lazy"
    />
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
