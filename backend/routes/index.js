const express = require('express');
const router = express.Router();

// ✅ Import route modules
const authRoutes = require('./authRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const menuRoutes = require('./menuRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const couponRoutes = require('./couponRoutes');
const paymentRoutes = require('./paymentRoutes');

// ✅ Mount all route groups under their respective paths
router.use('/auth', authRoutes);             // /api/auth
router.use('/restaurants', restaurantRoutes); // /api/restaurants
router.use('/menus', menuRoutes);           // /api/menus
router.use('/cart', cartRoutes);            // /api/cart
router.use('/orders', orderRoutes);         // /api/orders
router.use('/coupons', couponRoutes);       // /api/coupons
router.use('/payments', paymentRoutes);     // /api/payments

module.exports = router;
