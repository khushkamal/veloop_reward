import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import StreakHero from './components/StreakHero/StreakHero';
import StreakLadder from './components/StreakLadder/StreakLadder';
import CPADemoModal from './components/CPADemoModal/CPADemoModal';
import ClaimSuccessModal from './components/ClaimSuccessModal/ClaimSuccessModal';
import WalletLedger from './components/WalletLedger/WalletLedger';
import EvaluatorPanel from './components/EvaluatorPanel/EvaluatorPanel';
import AuthModal from './components/AuthModal/AuthModal';
import TrustStrip from './components/TrustStrip/TrustStrip';
import VELoopLoader from './components/UI/VELoopLoader';
import VELoopSkeleton from './components/UI/VELoopSkeleton';
import { Sparkles, Shield, Flame, AlertCircle } from 'lucide-react';
import { playClickSound } from './utils/audioEffects';

export default function App() {
  const { user, streakStatus, wallet, loading, actionLoading, error, claimDailyReward, demoLogin, fetchStreakStatus } =
    useAuth();

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

  // On CPA ad demo verified: finalize claim through backend API
  const handleCompleteAdDemo = async () => {
    setIsCPAOpen(false);
    const result = await claimDailyReward();
    if (result?.success) {
      setClaimSuccessData(result.data);
    }
  };

  if (loading) {
    return <VELoopLoader />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Top Navigation */}
      <Navbar
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
              {/* Streak Hero Banner with Live Countdown & Status */}
              <StreakHero
                streakStatus={streakStatus}
                actionLoading={actionLoading}
                onTriggerClaimFlow={handleTriggerClaimFlow}
                onCountdownComplete={fetchStreakStatus}
              />

              {/* 7-Day Exact Ladder Grid */}
              <StreakLadder
                streakLadder={streakStatus?.streakLadder}
                onTriggerClaimFlow={handleTriggerClaimFlow}
              />

              {/* Wallet & Ledger Transactions View */}
              <WalletLedger wallet={wallet} />
            </>
          ) : (
            <VELoopSkeleton />
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
          </div>
        )}

        {/* Supporting Benefits & Trust Strip */}
        <TrustStrip />
      </main>

      {/* Footer */}
      <footer className="py-4 border-top border-secondary border-opacity-10 text-center text-muted small">
        <div className="container">
          <span>VELoop Rewards Daily Streak & Rewards Engine • Master MERN Internship Project</span>
        </div>
      </footer>

      {/* CPA Advertisement Demo State Modal */}
      <CPADemoModal
        isOpen={isCPAOpen}
        onClose={() => setIsCPAOpen(false)}
        onCompleteAdDemo={handleCompleteAdDemo}
        nextReward={streakStatus?.nextReward}
        dayIndex={streakStatus?.nextDayIndex}
      />

      {/* Claim Celebration Modal */}
      <ClaimSuccessModal
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
