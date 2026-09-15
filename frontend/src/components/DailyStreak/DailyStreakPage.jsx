import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StreakHeader from './StreakHeader';
import HeroBanner from './HeroBanner';
import RewardGrid from './RewardGrid';
import WhyStreak from './WhyStreak';
import TrustFooter from './TrustFooter';
import ClaimModal from './ClaimModal';
import CpaDemo from './CpaDemo';
import StreakLoader from './StreakLoader';
import StreakSkeleton from './StreakSkeleton';
import WalletLedger from '../WalletLedger/WalletLedger';
import EvaluatorPanel from '../EvaluatorPanel/EvaluatorPanel';
import AuthModal from '../AuthModal/AuthModal';
import { Sparkles, Shield, Flame, AlertCircle } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';

export default function DailyStreakPage() {
  const {
    user,
    streakStatus,
    wallet,
    loading,
    actionLoading,
    error,
    claimDailyReward,
    demoLogin,
    fetchStreakStatus
  } = useAuth();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCPAOpen, setIsCPAOpen] = useState(false);
  const [isEvaluatorOpen, setIsEvaluatorOpen] = useState(false);
  const [claimSuccessData, setClaimSuccessData] = useState(null);

  // Trigger claim workflow (opens polished CPA ad demo modal first)
  const handleTriggerClaimFlow = () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setIsCPAOpen(true);
  };

  // On CPA ad demo verified: finalize claim through centralized backend API
  const handleCompleteAdDemo = async () => {
    setIsCPAOpen(false);
    const result = await claimDailyReward();
    if (result?.success) {
      setClaimSuccessData(result.data);
    }
  };

  if (loading) {
    return <StreakLoader />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Top Header Navigation */}
      <StreakHeader
        onOpenAuth={() => setIsAuthOpen(true)}
        onToggleEvaluator={() => setIsEvaluatorOpen((prev) => !prev)}
        isEvaluatorOpen={isEvaluatorOpen}
      />

      {/* Global Error Banner if any */}
      {error && (
        <div className="container mt-3">
          <div className="alert alert-danger d-flex align-items-center justify-content-between py-2 rounded-4 shadow-sm border border-danger border-opacity-40">
            <div className="d-flex align-items-center gap-2">
              <AlertCircle size={18} className="text-danger flex-shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow-1">
        {user ? (
          streakStatus ? (
            <>
              {/* Dedicated Mobile Reward Balances Bar */}
              <div className="container d-lg-none mt-2">
                <div
                  className="d-flex align-items-center justify-content-between p-2 px-3 rounded-4"
                  style={{
                    background: 'rgba(18, 26, 47, 0.8)',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-info fw-bold" style={{ fontSize: '0.85rem' }}>
                      🪙 {wallet?.veBalance ?? 0} VEs
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-warning fw-bold" style={{ fontSize: '0.85rem' }}>
                      🎁 ₹{wallet?.totalAmazonGCAmount ?? 0} Amazon GC
                    </span>
                  </div>
                </div>
              </div>

              {/* Streak Hero Banner with Live Countdown & Status */}
              <HeroBanner
                streakStatus={streakStatus}
                actionLoading={actionLoading}
                onTriggerClaimFlow={handleTriggerClaimFlow}
                onCountdownComplete={fetchStreakStatus}
              />

              {/* 7-Day Exact Ladder Grid */}
              <RewardGrid
                streakLadder={streakStatus?.streakLadder}
                onTriggerClaimFlow={handleTriggerClaimFlow}
              />

              {/* Supporting Benefits & Trust Strip */}
              <WhyStreak />

              {/* Immutable Wallet & Ledger Transactions View */}
              <WalletLedger wallet={wallet} />
            </>
          ) : (
            <StreakSkeleton />
          )
        ) : (
          /* Guest / First Time Welcome Screen */
          <div className="container py-5 text-center">
            <div
              className="glass-panel mx-auto p-5"
              style={{ maxWidth: '640px', marginTop: '2rem' }}
            >
              <div className="d-inline-flex p-3 rounded-4 bg-info bg-opacity-10 text-info mb-3">
                <Flame size={42} className="animate-float" />
              </div>
              <h1 className="h2 fw-bold text-white mb-3">
                VELoop Rewards <span className="text-gradient-cyan">Daily Streak System</span>
              </h1>
              <p className="text-secondary mb-4">
                Experience the full-stack MERN daily streak rewards engine. Claim consecutive daily
                points (VEs) and milestone Amazon Gift Cards backed by strict server-side validation.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <button
                  className="btn btn-primary px-4 py-3 fw-bold rounded-4 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #00e5ff 0%, #2979ff 100%)',
                    border: 'none',
                    color: '#000'
                  }}
                  onClick={() => {
                    playClickSound();
                    demoLogin();
                  }}
                >
                  <Sparkles size={18} />
                  <span>1-Click Evaluator Demo Login</span>
                </button>

                <button
                  className="btn btn-outline-light px-4 py-3 fw-semibold rounded-4"
                  onClick={() => {
                    playClickSound();
                    setIsAuthOpen(true);
                  }}
                >
                  Sign In / Register
                </button>
              </div>

              <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-center gap-2 text-muted small">
                <Shield size={14} className="text-info" />
                <span>Strict MERN Backend • Atomic DB Transactions • Anti-Tamper Time Math</span>
              </div>
            </div>

            {/* Benefits Strip for Guest */}
            <div className="mt-4">
              <WhyStreak />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <TrustFooter />

      {/* CPA Advertisement Demo State Modal */}
      <CpaDemo
        isOpen={isCPAOpen}
        onClose={() => setIsCPAOpen(false)}
        onCompleteAdDemo={handleCompleteAdDemo}
        nextReward={streakStatus?.nextReward}
        dayIndex={streakStatus?.nextDayIndex}
      />

      {/* Claim Celebration Modal */}
      <ClaimModal
        claimData={claimSuccessData}
        onClose={() => setClaimSuccessData(null)}
      />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Floating Evaluator Testing Simulator Panel */}
      <EvaluatorPanel
        isOpen={isEvaluatorOpen}
        onClose={() => setIsEvaluatorOpen(false)}
      />
    </div>
  );
}
