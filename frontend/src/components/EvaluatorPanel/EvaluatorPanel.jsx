import React from 'react';
import { FastForward, AlertOctagon, RotateCcw, Clock, X, Terminal, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { playClickSound } from '../../utils/audioEffects';
import styles from './EvaluatorPanel.module.css';

export default function EvaluatorPanel({ isOpen, onClose }) {
  const { streakStatus, advanceVirtualDay, simulateMissedDay, resetUserStreak, resetVirtualClock, actionLoading } =
    useAuth();

  if (!isOpen) return null;

  const devInfo = streakStatus?.devTimeInfo;

  return (
    <div className={styles.evaluatorDrawer}>
      <div className="container">
        <div className={styles.evaluatorHeader}>
          <div className={styles.evaluatorTitle}>
            <Terminal size={18} className="text-warning" />
            <span>Evaluator & Development Testing Simulator</span>
            <span className="badge bg-purple bg-opacity-25 text-purple border border-purple border-opacity-25 small ms-2">
              Isolated Dev Helper
            </span>
          </div>

          <button className="btn btn-sm text-secondary p-1" onClick={onClose} title="Close Evaluator Panel">
            <X size={18} />
          </button>
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          {/* Action Buttons */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            <button
              className={styles.simBtn}
              onClick={() => {
                playClickSound();
                advanceVirtualDay(1);
              }}
              disabled={actionLoading}
              title="Fast forward virtual server clock by +24 hours to test next day claim"
            >
              <FastForward size={16} className="text-info" />
              <span>Fast-Forward +1 Day (+24h)</span>
            </button>

            <button
              className={`${styles.simBtn} ${styles.simBtnWarning}`}
              onClick={() => {
                playClickSound();
                simulateMissedDay();
              }}
              disabled={actionLoading}
              title="Skip +48 hours to test missed-day reset behavior"
            >
              <AlertOctagon size={16} className="text-danger" />
              <span>Simulate Missed Day (+48h)</span>
            </button>

            <button
              className={styles.simBtn}
              onClick={() => {
                playClickSound();
                resetUserStreak();
              }}
              disabled={actionLoading}
              title="Reset streak progress to Day 0 for fresh testing"
            >
              <RotateCcw size={16} className="text-warning" />
              <span>Reset Streak (Day 0)</span>
            </button>

            {devInfo?.isShifted && (
              <button
                className={styles.simBtn}
                onClick={() => {
                  playClickSound();
                  resetVirtualClock();
                }}
                disabled={actionLoading}
                title="Reset virtual offset to real server clock"
              >
                <Clock size={16} className="text-success" />
                <span>Reset Real Clock</span>
              </button>
            )}
          </div>

          {/* Clock Offset Status readout */}
          <div className="d-flex align-items-center gap-2">
            <div className={styles.clockBadge}>
              <span>Virtual Offset: </span>
              <strong className={devInfo?.isShifted ? 'text-warning' : 'text-success'}>
                {devInfo?.offsetDays ? `+${devInfo.offsetDays} Days` : 'Real-time (0 offset)'}
              </strong>
            </div>
          </div>
        </div>

        <div className="text-muted small mt-2 d-flex align-items-center gap-1">
          <ShieldAlert size={12} />
          <span>
            Strict server verification remains enforced. The simulator shifts the server-side test clock to enable rapid multi-day evaluation.
          </span>
        </div>
      </div>
    </div>
  );
}
