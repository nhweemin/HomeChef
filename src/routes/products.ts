import express from 'express';
const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Get all products' });
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Chef only)
router.post('/', (req, res) => {
  res.json({ message: 'Create new product' });
});

export default router; 