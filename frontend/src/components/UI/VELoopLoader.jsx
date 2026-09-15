import React from 'react';
import { Zap, Flame, Sparkles } from 'lucide-react';

export default function VELoopLoader() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{
        background: 'radial-gradient(circle at 50% 35%, rgba(139, 92, 246, 0.15) 0%, #070a13 70%)',
        color: '#ffffff'
      }}
    >
      <div className="position-relative mb-4">
        {/* Glowing Violet/Cyan Logo Container */}
        <div
          className="rounded-4 d-flex align-items-center justify-content-center animate-pulse-glow"
          style={{
            width: '88px',
            height: '88px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            boxShadow: '0 0 45px rgba(139, 92, 246, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Zap size={46} color="#ffffff" strokeWidth={2.8} />
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 mb-2">
        <Flame size={22} className="text-warning animate-float" />
        <h2 className="h4 fw-bold font-heading mb-0 text-white">
          VELoop <span className="text-gradient-purple">Rewards</span>
        </h2>
      </div>

      <div className="text-secondary small d-flex align-items-center gap-2 mb-3">
        <Sparkles size={14} className="text-warning" />
        <span style={{ letterSpacing: '0.04em', fontWeight: 600 }}>Loading your streak...</span>
      </div>

      {/* Sleek Animated Progress Bar */}
      <div
        style={{
          width: '180px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50px',
          overflow: 'hidden'
        }}
      >
        <div
          className="skeleton-box"
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #8b5cf6 0%, #ffd700 100%)'
          }}
        />
      </div>
    </div>
  );
}
