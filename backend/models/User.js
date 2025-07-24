const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },          // ✅ name, not fullName
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },          // ✅ phone, not contactNumber
  password: { type: String, required: true },       // ✅ password, not hashedPassword
  address: { type: String },
  role: {
    type: String,
    enum: ['user', 'restaurant_owner', 'admin'],
    default: 'user',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
