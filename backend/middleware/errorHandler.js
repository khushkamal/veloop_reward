/**
 * Global Error Handler Middleware
 * Sanitizes and maps internal errors into clean, user-friendly messages.
 * Never exposes raw MongoDB, Mongoose, or driver exceptions.
 */
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let userFriendlyMessage = err.message || 'Unable to process your reward. Please try again.';
  let code = err.code || 'SERVER_ERROR';

  // Specific user-friendly error mappings
  if (err.code === 'ALREADY_CLAIMED_TODAY' || err.name === 'AlreadyClaimedError') {
    statusCode = 400;
    userFriendlyMessage = 'This reward has already been claimed.';
    code = 'ALREADY_CLAIMED';
  } else if (err.code === 'CONCURRENT_CLAIM_PREVENTED' || err.code === 11000) {
    statusCode = 409;
    userFriendlyMessage = 'This reward has already been claimed.';
    code = 'ALREADY_CLAIMED';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    userFriendlyMessage = 'Please log in to continue.';
    code = 'UNAUTHORIZED';
  } else if (err.name === 'CastError' || err.name === 'ValidationError') {
    statusCode = 400;
    userFriendlyMessage = 'Invalid request parameters.';
    code = 'INVALID_REQUEST';
  } else if (statusCode === 500) {
    // Hide raw database/system traces from the client
    userFriendlyMessage = 'Unable to process your reward. Please try again.';
  }

  res.status(statusCode).json({
    success: false,
    error: userFriendlyMessage,
    code,
    countdownSeconds: err.countdownSeconds,
    nextClaimAvailableAt: err.nextClaimAvailableAt,
    nextClaimAt: err.nextClaimAvailableAt
  });
}

module.exports = errorHandler;
