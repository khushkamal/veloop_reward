const rateLimit = require('express-rate-limit');

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Strict Auth endpoints rate limiter (prevents brute-force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 login/register attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again in 15 minutes.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  }
});

// Claim action rate limiter (prevents claim endpoint flooding)
const claimLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 claims per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many claim requests. Please slow down.',
    code: 'CLAIM_RATE_LIMIT_EXCEEDED'
  }
});

module.exports = {
  generalLimiter,
  authLimiter,
  claimLimiter
};
