const CouponModel = require("../models/Coupon");

// Get list of all active coupons (for users)
exports.getCoupons = async (req, res) => {
  try {
    const activeCoupons = await CouponModel.find({ isActive: true });
    res.json(activeCoupons);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve coupons" });
  }
};

// Create a new coupon (admin only)
exports.createCoupon = async (req, res) => {
  try {
    const { code, discountPercent, minOrderValue } = req.body;

    const existingCoupon = await CouponModel.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const newCoupon = new CouponModel({
      code,
      discountPercent,
      minOrderValue,
      isActive: true,
    });

    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: "Could not create coupon" });
  }
};

// Update an existing coupon (admin only)
exports.updateCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    const updatedCoupon = await CouponModel.findByIdAndUpdate(
      couponId,
      req.body,
      { new: true }
    );
    res.json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: "Failed to update coupon" });
  }
};

// Remove a coupon by ID (admin only)
exports.deleteCoupon = async (req, res) => {
  try {
    await CouponModel.findByIdAndDelete(req.params.couponId);
    res.json({ message: "Coupon removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon" });
  }
};

// Check if a coupon is valid during checkout
exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const coupon = await CouponModel.findOne({ code, isActive: true });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found or inactive" });
    }

    if (orderAmount < coupon.minOrderValue) {
      return res
        .status(400)
        .json({ message: "Order amount too low to apply this coupon" });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: "Coupon validation failed" });
  }
};
