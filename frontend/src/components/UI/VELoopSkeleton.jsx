import React from 'react';

export default function VELoopSkeleton() {
  return (
    <div className="container py-4">
      {/* 1. Top Header Skeleton */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-10">
        <div className="d-flex align-items-center gap-3">
          <div className="skeleton-box" style={{ width: '40px', height: '40px', borderRadius: '12px' }} />
          <div className="skeleton-box" style={{ width: '180px', height: '24px' }} />
        </div>
        <div className="d-flex gap-3">
          <div className="skeleton-box d-none d-md-block" style={{ width: '120px', height: '36px', borderRadius: '50px' }} />
          <div className="skeleton-box" style={{ width: '140px', height: '36px', borderRadius: '50px' }} />
        </div>
      </div>

      {/* 2. Hero Reward Banner & Countdown & Ultimate Reward Skeleton */}
      <div
        className="p-4 p-md-5 mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(14, 20, 36, 0.85) 0%, rgba(22, 28, 56, 0.85) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '24px'
        }}
      >
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <div className="d-flex gap-2 mb-3">
              <div className="skeleton-box" style={{ height: '30px', width: '120px', borderRadius: '50px' }} />
              <div className="skeleton-box" style={{ height: '30px', width: '140px', borderRadius: '50px' }} />
            </div>
            <div className="skeleton-box mb-2" style={{ height: '48px', width: '90%' }} />
            <div className="skeleton-box mb-4" style={{ height: '20px', width: '70%' }} />
            <div className="skeleton-box mb-4" style={{ height: '52px', width: '280px', borderRadius: '16px' }} />

            {/* 3. Statistics 4-Cards Skeleton */}
            <div className="d-flex flex-wrap gap-3 pt-3 border-top border-secondary border-opacity-10">
              <div className="skeleton-box" style={{ height: '48px', width: '130px', borderRadius: '12px' }} />
              <div className="skeleton-box" style={{ height: '48px', width: '130px', borderRadius: '12px' }} />
              <div className="skeleton-box" style={{ height: '48px', width: '130px', borderRadius: '12px' }} />
              <div className="skeleton-box" style={{ height: '48px', width: '130px', borderRadius: '12px' }} />
            </div>
          </div>

          <div className="col-lg-5">
            {/* Countdown Box Skeleton */}
            <div className="skeleton-box mb-3" style={{ height: '110px', width: '100%', borderRadius: '18px' }} />
            {/* 4. Ultimate Reward Section Skeleton */}
            <div
              className="p-3 skeleton-box"
              style={{
                height: '95px',
                width: '100%',
                borderRadius: '18px',
                border: '1px solid rgba(255, 215, 0, 0.3)'
              }}
            />
          </div>
        </div>
      </div>

      {/* 5. 7-Day Reward Cards Grid Skeleton */}
      <div className="mb-5">
        <div className="skeleton-box mb-2" style={{ height: '32px', width: '320px' }} />
        <div className="skeleton-box mb-4" style={{ height: '18px', width: '550px' }} />
        <div className="row g-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="col-6 col-md-3 col-lg">
              <div
                className="skeleton-box p-3 d-flex flex-column align-items-center justify-content-between"
                style={{
                  height: '220px',
                  borderRadius: '18px',
                  border: i === 7 ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid rgba(139, 92, 246, 0.15)'
                }}
              >
                <div className="skeleton-box" style={{ width: '50px', height: '14px', borderRadius: '4px' }} />
                <div className="skeleton-box" style={{ width: '48px', height: '48px', borderRadius: '14px' }} />
                <div className="skeleton-box" style={{ width: '70px', height: '18px', borderRadius: '6px' }} />
                <div className="skeleton-box" style={{ width: '90%', height: '24px', borderRadius: '50px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Supporting Benefits / Information Section Skeleton */}
      <div
        className="p-4 mb-4"
        style={{
          background: 'rgba(14, 20, 36, 0.75)',
          border: '1px solid rgba(139, 92, 246, 0.15)',
          borderRadius: '20px'
        }}
      >
        <div className="row g-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="d-flex align-items-start gap-3">
                <div className="skeleton-box flex-shrink-0" style={{ width: '44px', height: '44px', borderRadius: '12px' }} />
                <div className="w-100">
                  <div className="skeleton-box mb-2" style={{ height: '18px', width: '80%' }} />
                  <div className="skeleton-box" style={{ height: '14px', width: '100%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Double-Entry Wallet Ledger Section Skeleton */}
      <div
        className="p-4"
        style={{
          background: 'rgba(14, 20, 36, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px'
        }}
      >
        <div className="skeleton-box mb-3" style={{ height: '28px', width: '280px' }} />
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="skeleton-box" style={{ height: '80px', borderRadius: '16px' }} />
          </div>
          <div className="col-md-6">
            <div className="skeleton-box" style={{ height: '80px', borderRadius: '16px' }} />
          </div>
        </div>
        <div className="skeleton-box" style={{ height: '180px', width: '100%', borderRadius: '16px' }} />
      </div>
    </div>
  );
}
