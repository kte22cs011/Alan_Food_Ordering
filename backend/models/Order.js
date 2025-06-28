const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  status: { type: String, enum: ['pending', 'preparing', 'delivered', 'cancelled'], default: 'pending' },
  delivery_address: { type: String, required: true },
  total_amount: { type: Number, required: true },
  items: [{
    menu_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    item_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price_at_order: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);