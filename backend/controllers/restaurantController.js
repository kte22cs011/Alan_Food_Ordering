const RestaurantModel = require('../models/Restaurant');

// Create a new restaurant (Owner only)
exports.createRestaurant = async (req, res) => {
  try {
    console.log("➡️ Received create request:", req.body);
    console.log("➡️ Authenticated Owner ID:", req.user.id);

    const { title, imageUrl, address } = req.body;

    if (!title || !address) {
      return res.status(400).json({ message: "Title and address are required" });
    }

    const newRestaurant = new RestaurantModel({
      title,
      imageUrl,
      address,
      ownerRef: req.user.id,
    });

    const savedRestaurant = await newRestaurant.save();
    console.log("✅ Saved restaurant:", savedRestaurant);

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.error("❌ Error while creating restaurant:", error);
    res.status(500).json({ message: "Failed to create restaurant" });
  }
};

// Get all restaurants (Public)
exports.getAllRestaurants = async (_req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("❌ Error fetching restaurants:", error);
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

// Get restaurant by ID (Public)
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("❌ Error fetching restaurant:", error);
    res.status(500).json({ message: "Failed to fetch restaurant" });
  }
};

// Update a restaurant (Owner only)
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await RestaurantModel.findOneAndUpdate(
      { _id: id, ownerRef: req.user.id },
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Restaurant not found or unauthorized" });
    }

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: updated,
    });
  } catch (error) {
    console.error("❌ Error updating restaurant:", error);
    res.status(500).json({ message: "Failed to update restaurant" });
  }
};

// Delete a restaurant (Owner only)
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await RestaurantModel.findOneAndDelete({
      _id: id,
      ownerRef: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Restaurant not found or unauthorized" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting restaurant:", error);
    res.status(500).json({ message: "Failed to delete restaurant" });
  }
};
