const express = require('express');
const router = express.Router();

const {
  getMenuByRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

const { protect } = require('../middlewares/authMiddleware');
const { ownerOnly } = require('../middlewares/roleMiddleware');

// Public: Get menu of a specific restaurant
router.get('/view/:restaurantId', getMenuByRestaurant);

// Owner: Add a menu item
router.post('/add/:restaurantId', protect, ownerOnly, addMenuItem);

// Owner: Update a specific menu item
router.patch('/update/:restaurantId/:itemId', protect, ownerOnly, updateMenuItem);

// Owner: Delete a specific menu item
router.delete('/remove/:restaurantId/:itemId', protect, ownerOnly, deleteMenuItem);

module.exports = router;
