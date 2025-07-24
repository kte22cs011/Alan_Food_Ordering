const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");

// Create an order from the user's cart
exports.placeOrder = async (req, res) => {
  try {
    const userCart = await CartModel.findOne({ userId: req.user.id });

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const { deliveryAddress, paymentMethod } = req.body;

    const totalCost = userCart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const discount = 0; // placeholder for coupon logic
    const finalPrice = totalCost - discount;

    const order = new OrderModel({
      userId: req.user.id,
      restaurantId: userCart.restaurantId,
      items: userCart.items,
      totalAmount: totalCost,
      discountApplied: discount,
      finalAmount: finalPrice,
      deliveryAddress,
      paymentMethod,
      isPaid: paymentMethod !== "COD",
      status: "confirmed",
      createdAt: new Date(),
    });

    const savedOrder = await order.save();

    // Empty the cart after order
    userCart.items = [];
    await userCart.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Could not place the order" });
  }
};

// Fetch orders of logged-in user
exports.getMyOrders = async (req, res) => {
  try {
    const myOrders = await OrderModel.find({ userId: req.user.id });
    res.json(myOrders);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve your orders" });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the order" });
  }
};

// Cancel a placed order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order has been cancelled", order });
  } catch (error) {
    res.status(500).json({ message: "Unable to cancel order" });
  }
};

// Fetch orders related to the logged-in restaurant owner
exports.getRestaurantOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find().populate("restaurantId");

    const ownerOrders = allOrders.filter(
      (order) => order.restaurantId?.ownerId?.toString() === req.user.id
    );

    res.json(ownerOrders);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve restaurant orders" });
  }
};

// Admin: Fetch all orders in system
exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find();
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};
