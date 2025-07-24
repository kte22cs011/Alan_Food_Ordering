const express = require('express');
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurantController');

const { protect } = require('../middlewares/authMiddleware');
const { ownerOnly } = require('../middlewares/roleMiddleware');

// OWNER: Add a new restaurant
router.post('/create', protect, ownerOnly, createRestaurant);

// PUBLIC: Get all restaurants
router.get('/all', getAllRestaurants);

// PUBLIC: Get specific restaurant details
router.get('/view/:id', getRestaurantById);

// OWNER: Update existing restaurant
router.patch('/edit/:id', protect, ownerOnly, updateRestaurant);

// OWNER: Delete restaurant
router.delete('/remove/:id', protect, ownerOnly, deleteRestaurant);

module.exports = router;
