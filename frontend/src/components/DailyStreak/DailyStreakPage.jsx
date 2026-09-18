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
import StreakCalendarModal from './StreakCalendarModal';
import MinimalAuthPage from './MinimalAuthPage';
import { AlertCircle } from 'lucide-react';
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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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
      {/* Top Header Navigation (Logged In) */}
      {user && (
        <StreakHeader
          onOpenAuth={() => setIsAuthOpen(true)}
          onToggleEvaluator={() => setIsEvaluatorOpen((prev) => !prev)}
          isEvaluatorOpen={isEvaluatorOpen}
        />
      )}

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
                onToggleCalendar={() => setIsCalendarOpen(true)}
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
          /* Minimal & Elegant Two-Column Authentication Page */
          <MinimalAuthPage />
        )}
      </main>

      {/* Footer (Logged In View) */}
      {user && <TrustFooter />}

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

      {/* Streak Calendar Modal */}
      <StreakCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        streakStatus={streakStatus}
      />

      {/* Floating Evaluator Testing Simulator Panel */}
      <EvaluatorPanel
        isOpen={isEvaluatorOpen}
        onClose={() => setIsEvaluatorOpen(false)}
      />
    </div>
  );
}
