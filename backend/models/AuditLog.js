const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      enum: [
        'STREAK_CLAIM_REQUEST',
        'STREAK_CLAIM_SUCCESS',
        'STREAK_CLAIM_REJECTED',
        'STREAK_RESET',
        'DUPLICATE_CLAIM',
        'INVALID_CLAIM'
      ],
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1'
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: { createdAt: 'timestamp', updatedAt: false }
  }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
