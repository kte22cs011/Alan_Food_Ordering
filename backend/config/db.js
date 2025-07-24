const mongoose = require('mongoose');
require('dotenv').config();

const initializeDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URL;
    if (!mongoUri) throw new Error("❌ MONGO_URL is not defined in .env");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB successfully connected");
  } catch (err) {
    console.error("🚫 MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = initializeDatabase;
