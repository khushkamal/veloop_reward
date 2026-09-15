const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streakController');
const { requireAuth } = require('../middleware/auth');

router.get('/rewards-config', streakController.getRewardsConfig);
router.get('/status', requireAuth, streakController.getStreakStatus);
router.post('/claim', requireAuth, streakController.claimDailyReward);

module.exports = router;
