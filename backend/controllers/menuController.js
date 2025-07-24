const RestaurantModel = require("../models/Restaurant");

// Fetch menu of a specific restaurant
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "No such restaurant found" });
    }

    res.json(restaurant.menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve menu" });
  }
};

// Add new item to restaurant menu
exports.addMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not located" });
    }

    const itemToAdd = req.body;
    restaurant.menuItems.push(itemToAdd);

    await restaurant.save();
    res.status(201).json(restaurant.menuItems);
  } catch (error) {
    res.status(500).json({ message: "Unable to add menu item" });
  }
};

// Modify an existing menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not located" });
    }

    const item = restaurant.menuItems.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    item.description = req.body.description || item.description;
    item.available = req.body.available ?? item.available;

    await restaurant.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Unable to update menu item" });
  }
};

// Remove a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;

    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const index = restaurant.menuItems.findIndex(
      (menuItem) => menuItem._id.toString() === itemId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    restaurant.menuItems.splice(index, 1);
    await restaurant.save();

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete menu item" });
  }
};
