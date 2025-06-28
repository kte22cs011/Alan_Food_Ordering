const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../controllers/authController');

// Proper parameterized routes
router.get('/:id', protect, userController.getUser);
router.put('/:id', protect, userController.updateUser);

module.exports = router;