import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Flame, CheckCircle2, Clock, Gift, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { getHistory } from '../../services/streakApi';
import { playClickSound } from '../../utils/audioEffects';

export default function StreakCalendarModal({ isOpen, onClose, streakStatus }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      fetchClaimHistory();
    }
  }, [isOpen]);

  const fetchClaimHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistory();
      if (res?.success && res.data) {
        setHistory(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch streak history:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentStreak = streakStatus?.currentStreak || 0;
  const currentDayIndex = streakStatus?.nextDayIndex || 1;
  const alreadyClaimed = streakStatus?.alreadyClaimedToday;

  // Month Calendar computations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Map history to day of month
  const claimedDatesSet = new Set(
    history.map((item) => {
      const d = new Date(item.createdAt || item.claimedAt);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  const todayObj = new Date();
  const isCurrentMonth = todayObj.getFullYear() === year && todayObj.getMonth() === month;
  const todayDateNum = todayObj.getDate();

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(5, 2, 14, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1060
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playClickSound();
          onClose();
        }
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content text-white rounded-4 border"
          style={{
            background: 'linear-gradient(180deg, #130924 0%, #0c0517 100%)',
            borderColor: 'rgba(147, 51, 234, 0.35)',
            boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.25), 0 0 40px rgba(0,0,0,0.8)'
          }}
        >
          {/* Header */}
          <div className="modal-header border-bottom border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 p-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(168, 85, 247, 0.2))',
                  border: '1px solid rgba(234, 179, 8, 0.4)'
                }}
              >
                <CalendarIcon size={22} className="text-warning" />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0 d-flex align-items-center gap-2">
                  Streak Calendar
                  <span
                    className="badge rounded-pill px-2 py-1"
                    style={{
                      background: 'rgba(234, 179, 8, 0.15)',
                      color: '#fbbf24',
                      border: '1px solid rgba(234, 179, 8, 0.3)',
                      fontSize: '0.75rem'
                    }}
                  >
                    🔥 {currentStreak} Day Streak
                  </span>
                </h5>
                <p className="text-secondary small mb-0">Track your daily check-in activity & rewards history</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-circle p-2 text-white border-0"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4">
            {/* Top Quick Stats */}
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div
                  className="p-3 rounded-3 text-center"
                  style={{
                    background: 'rgba(147, 51, 234, 0.12)',
                    border: '1px solid rgba(147, 51, 234, 0.25)'
                  }}
                >
                  <div className="text-secondary small mb-1">Current Streak</div>
                  <div className="h4 fw-bold text-warning mb-0">🔥 {currentStreak} Days</div>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="p-3 rounded-3 text-center"
                  style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <div className="text-secondary small mb-1">Today's Status</div>
                  <div className="h4 fw-bold text-success mb-0">
                    {alreadyClaimed ? '✓ Claimed' : 'Available'}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="p-3 rounded-3 text-center"
                  style={{
                    background: 'rgba(59, 130, 246, 0.12)',
                    border: '1px solid rgba(59, 130, 246, 0.25)'
                  }}
                >
                  <div className="text-secondary small mb-1">Total Claims</div>
                  <div className="h4 fw-bold text-info mb-0">{history.length} Done</div>
                </div>
              </div>
            </div>

            {/* Calendar Month Header */}
            <div className="d-flex align-items-center justify-content-between mb-3 px-2">
              <h6 className="fw-bold text-white mb-0">
                {monthName} {year}
              </h6>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary py-1 px-2"
                  onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary py-1 px-2"
                  onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Calendar Day Labels */}
            <div
              className="d-grid text-center mb-2"
              style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}
            >
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="text-secondary small fw-bold py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Day Grid */}
            <div
              className="d-grid text-center"
              style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}
            >
              {/* Empty padding slots */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2 opacity-0"></div>
              ))}

              {/* Days of Month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isToday = isCurrentMonth && dayNum === todayDateNum;
                const dateKey = `${year}-${month}-${dayNum}`;
                const isClaimed = claimedDatesSet.has(dateKey);
                const isPast = isCurrentMonth ? dayNum < todayDateNum : currentDate < todayObj;

                let cellBg = 'rgba(255, 255, 255, 0.03)';
                let cellBorder = '1px solid rgba(255, 255, 255, 0.06)';
                let textColor = '#94a3b8';

                if (isToday) {
                  cellBg = alreadyClaimed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.18)';
                  cellBorder = alreadyClaimed
                    ? '2px solid rgba(16, 185, 129, 0.7)'
                    : '2px solid rgba(234, 179, 8, 0.7)';
                  textColor = '#fff';
                } else if (isClaimed) {
                  cellBg = 'rgba(16, 185, 129, 0.15)';
                  cellBorder = '1px solid rgba(16, 185, 129, 0.4)';
                  textColor = '#10b981';
                }

                return (
                  <div
                    key={`day-${dayNum}`}
                    className="p-2 rounded-3 d-flex flex-column align-items-center justify-content-center position-relative"
                    style={{
                      minHeight: '52px',
                      background: cellBg,
                      border: cellBorder,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span className="fw-bold small" style={{ color: textColor }}>
                      {dayNum}
                    </span>
                    {isToday && (
                      <span
                        className="badge position-absolute"
                        style={{
                          top: '2px',
                          right: '2px',
                          fontSize: '0.55rem',
                          background: alreadyClaimed ? '#10b981' : '#f59e0b',
                          color: '#000',
                          padding: '1px 3px'
                        }}
                      >
                        {alreadyClaimed ? '✓' : 'TODAY'}
                      </span>
                    )}
                    {isClaimed && !isToday && (
                      <span style={{ fontSize: '0.7rem', color: '#10b981' }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Recent Check-in Logs List */}
            <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
              <h6 className="fw-bold text-white mb-2 d-flex align-items-center gap-2">
                <Clock size={16} className="text-secondary" />
                Recent Claim Activity
              </h6>
              {loading ? (
                <div className="text-center py-3 text-secondary small">Loading history...</div>
              ) : history.length === 0 ? (
                <div className="text-center py-3 text-secondary small">
                  No claims yet this cycle. Click "Claim Reward" to start your streak!
                </div>
              ) : (
                <div
                  className="overflow-auto pe-1"
                  style={{ maxHeight: '140px' }}
                >
                  {history.slice(0, 6).map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="d-flex align-items-center justify-content-between py-2 px-3 mb-1 rounded-2"
                      style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                        <span className="small text-white fw-semibold">
                          Day {item.metadata?.streakDay || item.day || 1} Claim
                        </span>
                        {item.metadata?.amazonGiftCardCode && (
                          <span className="badge bg-warning bg-opacity-25 text-warning small ms-1">
                            Gift Card
                          </span>
                        )}
                      </div>
                      <div className="text-end">
                        <span className="small text-warning fw-bold d-block">
                          +{item.amount} {item.currency}
                        </span>
                        <span className="text-secondary" style={{ fontSize: '0.7rem' }}>
                          {new Date(item.createdAt || item.claimedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-top border-secondary border-opacity-25 justify-content-between p-3">
            <span className="text-secondary small">
              Maintain daily logins to unlock Day 7 VIP Ultimate Rewards!
            </span>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 fw-semibold rounded-3"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                border: 'none'
              }}
              onClick={() => {
                playClickSound();
                onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
