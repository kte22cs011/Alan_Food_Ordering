const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authMiddleware, isOwner, requireRoles } = require('../middleware/auth');

// Public routes
router.get('/', restaurantController.getAllRestaurants);

// Protected routes
router.post(
  '/',
  authMiddleware,          // Verify JWT token
  isOwner,                 // Original specific middleware
  restaurantController.createRestaurant
);

// Alternative role-based protection (choose one approach)
router.patch(
  '/:id',
  authMiddleware,
  requireRoles(['restaurant_owner', 'admin']), // Flexible multi-role check
  restaurantController.updateRestaurant
);

// Admin-only route example
router.delete(
  '/:id',
  authMiddleware,
  requireRoles(['admin']), // Strict admin requirement
  restaurantController.deleteRestaurant
);

module.exports = router;