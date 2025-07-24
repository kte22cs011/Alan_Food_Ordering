const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  items: [
    {
      itemId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  discountApplied: {
    type: Number,
    default: 0,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
  },
  orderStatus: {
    type: String,
    default: 'confirmed',
  },
  orderId: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentMethod: {
    type: String,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
