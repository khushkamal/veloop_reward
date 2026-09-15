const express = require('express');
const router = express.Router();
const devSimulatorController = require('../controllers/devSimulatorController');
const { requireAuth } = require('../middleware/auth');

// Isolated Evaluator & Developer Simulator Endpoints
router.post('/advance-day', requireAuth, devSimulatorController.advanceVirtualDay);
router.post('/simulate-missed-day', requireAuth, devSimulatorController.simulateMissedDay);
router.post('/reset-streak', requireAuth, devSimulatorController.resetUserStreak);
router.post('/reset-clock', requireAuth, devSimulatorController.resetVirtualClock);
router.get('/status', requireAuth, devSimulatorController.getSimulatorStatus);

module.exports = router;
