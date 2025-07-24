const express = require('express');
const router = express.Router();

// Controllers
const {
  registerUser,
  registerOwner,
  loginUser,
  getProfile,
  checkUser,
  logoutUser,
} = require('../controllers/authController');

// Middleware
const { protect } = require('../middlewares/authMiddleware');

// User Registration
router.post('/register/user', registerUser);

// Restaurant Owner Registration
router.post('/register/owner', registerOwner);

// Common Login Route
router.post('/login', loginUser);

// Get Profile (Protected)
router.get('/me', protect, getProfile);

// Check User Role (Protected)
router.get('/verify-role', protect, checkUser);

// Logout
router.get('/logout', logoutUser);

module.exports = router;
