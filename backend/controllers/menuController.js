const MenuItem = require('../models/menuItem');

exports.getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find({ restaurant_id: req.params.restaurant_id });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const menuItem = new MenuItem({
      name,
      price,
      category,
      restaurant_id: req.params.restaurant_id
    });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};