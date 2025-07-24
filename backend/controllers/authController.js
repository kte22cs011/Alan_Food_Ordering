const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const createToken = require("../utils/generateToken");

// Register normal user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registered" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      phone,
      address,
      role: "user",
      password: encryptedPassword,
    });

    const savedUser = await newUser.save();
    const sanitizedUser = savedUser.toObject();
    delete sanitizedUser.password;

    res.status(201).json({
      message: "Registration successful",
      user: sanitizedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

// Register restaurant owner
exports.registerOwner = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const ownerExists = await UserModel.findOne({ email });
    if (ownerExists) {
      return res.status(400).json({ message: "Owner already registered" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newOwner = new UserModel({
      name,
      email,
      phone,
      address,
      role: "restaurant_owner",
      password: encryptedPassword,
    });

    const savedOwner = await newOwner.save();
    const sanitizedOwner = savedOwner.toObject();
    delete sanitizedOwner.password;

    res.status(201).json({
      message: "Owner account created successfully",
      user: sanitizedOwner,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register owner" });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = createToken(existingUser._id, existingUser.role);

    const userData = existingUser.toObject();
    delete userData.password;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: userData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.user.id).select("-password");
    res.json(currentUser);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch profile" });
  }
};

// Logout
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Successfully logged out" });
};

// Check user role
exports.checkUser = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.user.id);
    res.json({ role: currentUser.role });
  } catch (error) {
    res.status(500).json({ message: "Unable to verify user role" });
  }
};
