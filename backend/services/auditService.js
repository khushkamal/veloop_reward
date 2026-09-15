const AuditLog = require('../models/AuditLog');

class AuditService {
  /**
   * Log critical streak and security events
   * @param {string} eventType
   * @param {string|ObjectId} userId
   * @param {object} details
   * @param {string} [ipAddress='127.0.0.1']
   */
  static async logEvent(eventType, userId, details = {}, ipAddress = '127.0.0.1') {
    try {
      return await AuditLog.create({
        eventType,
        userId,
        details,
        ipAddress,
        timestamp: new Date()
      });
    } catch (err) {
      console.error('[AuditService Error]: Failed to write audit log:', err);
    }
  }

  static async getRecentLogs(limit = 50) {
    return await AuditLog.find().sort({ timestamp: -1 }).limit(limit);
  }
}

module.exports = AuditService;
