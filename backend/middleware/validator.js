/**
 * Input validation and sanitization middleware
 */

// Email regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate user registration payload
const validateRegister = (req, res, next) => {
  let { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Valid name of at least 2 characters is required.',
      code: 'INVALID_NAME'
    });
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'A valid email address is required.',
      code: 'INVALID_EMAIL'
    });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters long.',
      code: 'INVALID_PASSWORD'
    });
  }

  // Sanitize
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  next();
};

// Validate user login payload
const validateLogin = (req, res, next) => {
  let { email, password } = req.body;

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'A valid email address is required.',
      code: 'INVALID_EMAIL'
    });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Password is required.',
      code: 'PASSWORD_REQUIRED'
    });
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

// Sanitize pagination queries
const validatePagination = (req, res, next) => {
  let page = parseInt(req.query.page, 10);
  let limit = parseInt(req.query.limit, 10);

  req.pagination = {
    page: isNaN(page) || page < 1 ? 1 : page,
    limit: isNaN(limit) || limit < 1 || limit > 100 ? 20 : limit
  };

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validatePagination
};
