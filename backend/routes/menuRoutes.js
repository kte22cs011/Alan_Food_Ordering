const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authMiddleware, isOwner } = require('../middleware/auth');

router.get('/:restaurant_id', menuController.getMenu);
router.post('/:restaurant_id', authMiddleware, isOwner, menuController.addMenuItem);

module.exports = router;