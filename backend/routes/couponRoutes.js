const express = require('express');
const router = express.Router();

const {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} = require('../controllers/couponController');

const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/roleMiddleware');

// User: Fetch available coupons
router.get('/list', protect, getCoupons);

// User: Validate coupon at checkout
router.post('/check', protect, validateCoupon);

// Admin: Create a new coupon
router.post('/create', protect, adminOnly, createCoupon);

// Admin: Update existing coupon
router.patch('/edit/:couponId', protect, adminOnly, updateCoupon);

// Admin: Delete a coupon
router.delete('/remove/:couponId', protect, adminOnly, deleteCoupon);

module.exports = router;
