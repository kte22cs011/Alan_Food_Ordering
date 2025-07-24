const CartModel = require('../models/Cart');
const RestaurantModel = require('../models/Restaurant');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurantId, itemId, quantity } = req.body;

    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const item = restaurant.menuItems.find(menuItem => menuItem._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({
        userId,
        restaurantId,
        items: [],
      });
    }

    const existingItem = cart.items.find(cartItem => cartItem.itemId.toString() === itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        itemId,
        name: item.name,
        price: item.price,
        quantity,
      });
    }

    await cart.save();
    res.status(201).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Unable to add item to cart' });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Failed to retrieve cart' });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await CartModel.findOneAndDelete({ userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Cart item updated", cart });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ message: "Failed to update cart item" });
  }
};
