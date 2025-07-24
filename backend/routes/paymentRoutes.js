const express = require('express');
const router = express.Router();

const {
  createPayment,
  getUserPayments,
  getAllPayments,
  getOwnerPayments,
} = require('../controllers/paymentController');

const { protect } = require('../middlewares/authMiddleware');
const { adminOnly, ownerOnly } = require('../middlewares/roleMiddleware');

// USER: Make a payment
router.post('/initiate', protect, createPayment);

// USER: Get user's own payments
router.get('/history', protect, getUserPayments);

// ADMIN: Get all payment records
router.get('/records/all', protect, adminOnly, getAllPayments);

// OWNER: View payments related to their restaurant
router.get('/records/owner', protect, ownerOnly, getOwnerPayments);

module.exports = router;

