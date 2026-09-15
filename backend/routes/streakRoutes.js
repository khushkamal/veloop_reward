const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streakController');
const { requireAuth } = require('../middleware/auth');

// Public reward config
router.get('/rewards-config', streakController.getRewardsConfig);

// Protected streak endpoints
router.get('/', requireAuth, streakController.getStreakStatus);
router.get('/status', requireAuth, streakController.getStreakStatus);
router.get('/stats', requireAuth, streakController.getStreakStats);
router.get('/history', requireAuth, streakController.getStreakHistory);
router.post('/claim', requireAuth, streakController.claimDailyReward);

module.exports = router;
