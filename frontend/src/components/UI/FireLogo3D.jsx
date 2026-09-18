import React from 'react';

/**
 * Exact Flaticon 426833 Flame Icon (Clean Vector, No Box, Zero Clipping)
 */
export default function FireLogo3D({ size = 30, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 530"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        overflow: 'visible'
      }}
      aria-label="VELooP Flame Logo"
    >
      <defs>
        {/* Flaticon 426833 Outer Flame Gradient */}
        <linearGradient id="flameOuterGrad426833" x1="256" y1="16" x2="256" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA000" />
          <stop offset="40%" stopColor="#FF5722" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>

        {/* Flaticon 426833 Inner Flame Gradient */}
        <linearGradient id="flameInnerGrad426833" x1="256" y1="190" x2="256" y2="490" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEE58" />
          <stop offset="100%" stopColor="#FFCA28" />
        </linearGradient>
      </defs>

      {/* 1. Outer Flame Body */}
      <path
        d="M256 16C256 16 312 96 312 168C312 192 300 214 286 230C312 210 334 176 340 140C404 198 444 284 444 374C444 478 360 496 256 496C152 496 68 478 68 374C68 274 136 186 218 140C232 176 258 210 282 232C270 190 256 102 256 16Z"
        fill="url(#flameOuterGrad426833)"
      />

      {/* 2. Inner Flame Core */}
      <path
        d="M256 190C256 190 310 270 310 340C310 370 294 394 278 408C296 394 310 370 314 346C348 388 366 438 366 470C366 484 320 490 256 490C192 490 146 484 146 470C146 414 186 350 236 304C244 328 258 350 270 364C262 334 256 260 256 190Z"
        fill="url(#flameInnerGrad426833)"
      />
    </svg>
  );
}
