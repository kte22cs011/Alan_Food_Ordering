const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: String,
  available: {
    type: Boolean,
    default: true,
  },
});

const RestaurantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: String,
  address: {
    type: String,
    required: true,
  },
  ownerRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  menuItems: [MenuItemSchema], // Subdocument schema used here
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
