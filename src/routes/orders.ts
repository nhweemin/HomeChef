import express from 'express';
const router = express.Router();

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get user orders' });
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Create new order' });
});

export default router; 