import express from 'express';
const router = express.Router();

// @route   GET /api/chefs
// @desc    Get all chefs
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Get all chefs' });
});

// @route   GET /api/chefs/:id
// @desc    Get chef by ID
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ message: `Get chef ${req.params.id}` });
});

export default router; 