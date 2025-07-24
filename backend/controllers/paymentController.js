const Payment = require("../models/Payment");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

// USER creates a payment
exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, transactionId } = req.body;

    const payment = new Payment({
      orderId,
      userId: req.user.id,
      amount,
      paymentMethod,
      transactionId,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(500).json({ message: "Error creating payment" });
  }
};

// USER sees own payments
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

// ADMIN gets all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all payments" });
  }
};

// OWNER gets payments for their restaurant
exports.getOwnerPayments = async (req, res) => {
  try {
    const orders = await Order.find().populate("restaurantId");

    const ownerOrders = orders.filter(
      (order) => order.restaurantId?.ownerId?.toString() === req.user.id
    );

    const orderIds = ownerOrders.map((order) => order._id);
    const payments = await Payment.find({ orderId: { $in: orderIds } });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching owner payments" });
  }
};
