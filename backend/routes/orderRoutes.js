const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/user/:user_id', authMiddleware, orderController.getUserOrders);

module.exports = router;