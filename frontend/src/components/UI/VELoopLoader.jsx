import React from 'react';
import { Zap, Flame } from 'lucide-react';

export default function VELoopLoader() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{
        background: 'radial-gradient(circle at 50% 40%, rgba(0, 229, 255, 0.1) 0%, #070a13 70%)',
        color: '#ffffff'
      }}
    >
      <div className="position-relative mb-4">
        {/* Glowing Logo Circle */}
        <div
          className="rounded-4 d-flex align-items-center justify-content-center animate-pulse-glow"
          style={{
            width: '84px',
            height: '84px',
            background: 'linear-gradient(135deg, #00e5ff 0%, #2979ff 100%)',
            boxShadow: '0 0 40px rgba(0, 229, 255, 0.6)'
          }}
        >
          <Zap size={44} color="#000" strokeWidth={2.8} />
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 mb-2">
        <Flame size={20} className="text-warning animate-float" />
        <h2 className="h4 fw-bold font-heading mb-0 text-white">
          VELoop <span className="text-gradient-cyan">Rewards</span>
        </h2>
      </div>

      <div className="text-secondary small d-flex align-items-center gap-2">
        <div className="spinner-border spinner-border-sm text-info" role="status"></div>
        <span>Loading your streak...</span>
      </div>
    </div>
  );
}
