const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { restaurant_id, items, delivery_address } = req.body;
    
    const order = new Order({
      user_id: req.user.id,
      restaurant_id,
      delivery_address,
      items: items.map(item => ({
        menu_item_id: item.menu_item_id,
        item_name: item.item_name,
        quantity: item.quantity,
        price_at_order: item.price
      })),
      total_amount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.user_id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};