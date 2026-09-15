/**
 * VELoop Rewards - Server-Authoritative Time Service
 * Handles server time calculations, timezone consistency (IST default UTC+5:30),
 * and isolated development simulator virtual time offsets.
 */

// Global virtual offset in milliseconds (used ONLY when DEV_MODE is active for evaluation)
let virtualTimeOffsetMs = 0;

class TimeService {
  /**
   * Get the authoritative server time (with dev offset if applied)
   * @returns {Date}
   */
  static getNow() {
    return new Date(Date.now() + virtualTimeOffsetMs);
  }

  /**
   * Get calendar date key (YYYY-MM-DD) in configured timezone (default: Asia/Kolkata / IST)
   * @param {Date} [date]
   * @param {string} [timeZone='Asia/Kolkata']
   * @returns {string}
   */
  static getDateString(date = this.getNow(), timeZone = 'Asia/Kolkata') {
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formatter.format(date); // outputs YYYY-MM-DD
    } catch {
      // Fallback
      return date.toISOString().split('T')[0];
    }
  }

  /**
   * Calculate difference in whole calendar days between two dates in timezone
   * @param {Date|string} dateEarlier
   * @param {Date|string} dateLater
   * @param {string} [timeZone='Asia/Kolkata']
   * @returns {number}
   */
  static getCalendarDayDiff(dateEarlier, dateLater = this.getNow(), timeZone = 'Asia/Kolkata') {
    if (!dateEarlier) return Infinity;

    const d1Str = this.getDateString(new Date(dateEarlier), timeZone);
    const d2Str = this.getDateString(new Date(dateLater), timeZone);

    const [y1, m1, day1] = d1Str.split('-').map(Number);
    const [y2, m2, day2] = d2Str.split('-').map(Number);

    const utc1 = Date.UTC(y1, m1 - 1, day1);
    const utc2 = Date.UTC(y2, m2 - 1, day2);

    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  }

  /**
   * Get next midnight timestamp and remaining seconds in configured timezone
   * @param {Date} [now]
   * @param {string} [timeZone='Asia/Kolkata']
   * @returns {{ nextMidnight: Date, secondsRemaining: number }}
   */
  static getNextMidnightInfo(now = this.getNow(), timeZone = 'Asia/Kolkata') {
    const todayStr = this.getDateString(now, timeZone);
    const [y, m, d] = todayStr.split('-').map(Number);

    // Next calendar day at 00:00:00 in IST (UTC+5:30)
    // Construct local midnight
    const nextDate = new Date(Date.UTC(y, m - 1, d + 1, 0, 0, 0));
    // Offset for IST (UTC+5:30 = -330 minutes to UTC)
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const nextMidnightUtcMs = nextDate.getTime() - istOffsetMs;
    const nextMidnight = new Date(nextMidnightUtcMs);

    const diffMs = Math.max(0, nextMidnight.getTime() - now.getTime());
    const secondsRemaining = Math.floor(diffMs / 1000);

    return {
      nextMidnight,
      secondsRemaining
    };
  }

  // --- Evaluator Simulator Controls (Isolated Dev Tools) ---

  static advanceVirtualDays(days = 1) {
    virtualTimeOffsetMs += days * 24 * 60 * 60 * 1000;
    return {
      virtualTime: this.getNow(),
      offsetDays: virtualTimeOffsetMs / (24 * 60 * 60 * 1000)
    };
  }

  static resetVirtualClock() {
    virtualTimeOffsetMs = 0;
    return {
      virtualTime: this.getNow(),
      offsetDays: 0
    };
  }

  static getVirtualOffsetInfo() {
    return {
      isShifted: virtualTimeOffsetMs !== 0,
      offsetMs: virtualTimeOffsetMs,
      offsetDays: virtualTimeOffsetMs / (24 * 60 * 60 * 1000),
      currentServerTime: this.getNow()
    };
  }
}

module.exports = TimeService;
