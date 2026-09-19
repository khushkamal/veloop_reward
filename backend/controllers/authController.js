const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Streak = require('../models/Streak');
const Wallet = require('../models/Wallet');
const StreakService = require('../services/streakService');
const { JWT_SECRET } = require('../middleware/auth');

function generateToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required.'
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash
    });

    // Initialize Streak and Wallet
    await Streak.create({ userId: user._id });
    await Wallet.create({ userId: user._id });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * 1-Click Evaluator / Demo Login
 * Ensures testers and reviewers can instantly test the full MERN flow without manual form filling.
 */
exports.demoLogin = async (req, res, next) => {
  try {
    const demoEmail = 'evaluator@veloop.demo';
    let user = await User.findOne({ email: demoEmail });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('veloop_demo_pass_2026', salt);

      user = await User.create({
        name: 'VELoop Evaluator',
        email: demoEmail,
        passwordHash,
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=veloop_evaluator',
        role: 'evaluator'
      });

      await Streak.create({ userId: user._id });
      await Wallet.create({ userId: user._id });
    } else {
      // Ensure Streak and Wallet exist in case of initial setup skew
      const [existingStreak, existingWallet] = await Promise.all([
        Streak.findOne({ userId: user._id }),
        Wallet.findOne({ userId: user._id })
      ]);
      if (!existingStreak) await Streak.create({ userId: user._id });
      if (!existingWallet) await Wallet.create({ userId: user._id });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Demo session started successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const streakStatus = await StreakService.getStreakStatus(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        role: req.user.role
      },
      streakStatus
    });
  } catch (err) {
    next(err);
  }
};
