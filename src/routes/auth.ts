import express from 'express';
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  res.status(201).json({ 
    success: true,
    message: 'User registered successfully',
    data: {
      user: { name, email, role: role || 'customer' },
      token: 'mock-jwt-token'
    }
  });
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ 
    success: true,
    message: 'Login successful',
    data: {
      user: { email, role: 'customer' },
      token: 'mock-jwt-token'
    }
  });
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Logout successful' 
  });
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', (req, res) => {
  res.status(200).json({ 
    success: true,
    data: {
      user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'customer' }
    }
  });
});

export default router; 