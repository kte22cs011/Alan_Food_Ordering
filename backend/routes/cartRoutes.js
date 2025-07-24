const express = require('express');
const router = express.Router();

const {
  addToCart,
  getCart,
  clearCart,
  updateCartItem,
} = require('../controllers/cartController');

const { protect } = require('../middlewares/authMiddleware');

// Add item to cart
router.post('/add', protect, addToCart);

// View cart
router.get('/view', protect, getCart);

// Clear cart
router.delete('/clear', protect, clearCart);

// Update cart item quantity
router.patch('/update/:itemId', protect, updateCartItem);

module.exports = router;
