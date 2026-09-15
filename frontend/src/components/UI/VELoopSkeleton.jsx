import React from 'react';

export default function VELoopSkeleton() {
  return (
    <div className="container py-4">
      {/* Hero Banner Skeleton */}
      <div className="glass-panel p-4 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <div className="skeleton-box mb-3" style={{ height: '32px', width: '200px' }} />
            <div className="skeleton-box mb-2" style={{ height: '48px', width: '85%' }} />
            <div className="skeleton-box mb-4" style={{ height: '20px', width: '65%' }} />
            <div className="skeleton-box mb-4" style={{ height: '52px', width: '260px', borderRadius: '16px' }} />

            {/* Stats row skeleton */}
            <div className="d-flex gap-4 pt-3 border-top border-secondary border-opacity-10">
              <div className="skeleton-box" style={{ height: '40px', width: '110px' }} />
              <div className="skeleton-box" style={{ height: '40px', width: '110px' }} />
              <div className="skeleton-box" style={{ height: '40px', width: '110px' }} />
            </div>
          </div>

          <div className="col-lg-5">
            {/* Countdown Box Skeleton */}
            <div className="skeleton-box mb-3" style={{ height: '110px', width: '100%', borderRadius: '18px' }} />
            {/* Ultimate Reward Skeleton */}
            <div className="skeleton-box" style={{ height: '85px', width: '100%', borderRadius: '18px' }} />
          </div>
        </div>
      </div>

      {/* 7 Daily Cards Skeleton */}
      <div className="mb-5">
        <div className="skeleton-box mb-3" style={{ height: '28px', width: '300px' }} />
        <div className="row g-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="col-6 col-md-3 col-lg">
              <div className="skeleton-box" style={{ height: '210px', borderRadius: '18px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Ledger Section Skeleton */}
      <div className="glass-panel p-4">
        <div className="skeleton-box mb-3" style={{ height: '28px', width: '260px' }} />
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="skeleton-box" style={{ height: '80px', borderRadius: '16px' }} />
          </div>
          <div className="col-md-6">
            <div className="skeleton-box" style={{ height: '80px', borderRadius: '16px' }} />
          </div>
        </div>
        <div className="skeleton-box" style={{ height: '160px', width: '100%', borderRadius: '16px' }} />
      </div>
    </div>
  );
}
