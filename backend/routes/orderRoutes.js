const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getRestaurantOrders,
  getAllOrders,
} = require('../controllers/orderController');

const { protect } = require('../middlewares/authMiddleware');
const { userOnly, ownerOnly, adminOnly } = require('../middlewares/roleMiddleware');

// USER ROUTES
router.post('/place', protect, userOnly, placeOrder);          // <-- renamed to /place
router.get('/my', protect, userOnly, getMyOrders);
router.get('/details/:id', protect, userOnly, getOrderById);
router.patch('/cancel/:id', protect, userOnly, cancelOrder);

// OWNER ROUTES
router.get('/owner/list', protect, ownerOnly, getRestaurantOrders);

// ADMIN ROUTES
router.get('/admin/list', protect, adminOnly, getAllOrders);

module.exports = router;
