const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Only admins can access these
router.get('/users', auth(['admin']), adminController.getAllUsers);
router.delete('/users/:id', auth(['admin']), adminController.deleteUser);

module.exports = router;