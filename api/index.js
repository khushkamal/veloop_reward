const app = require('../backend/server');
const { connectDB } = require('../backend/config/db');

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error('Serverless entry error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during request execution',
      message: err.message
    });
  }
};
