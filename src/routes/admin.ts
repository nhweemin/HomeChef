import express from 'express';
const router = express.Router();

// @route   GET /api/admin/stats
// @desc    Get platform statistics
// @access  Private (Admin only)
router.get('/stats', (req, res) => {
  res.json({ message: 'Get platform stats' });
});

// @route   GET /api/admin/chefs/pending
// @desc    Get pending chef applications
// @access  Private (Admin only)
router.get('/chefs/pending', (req, res) => {
  res.json({ message: 'Get pending chef applications' });
});

export default router; 