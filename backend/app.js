const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const router = require('./routes/index');

// Load environment variables
dotenv.config();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Health check route
app.get('/', (_req, res) => {
  res.send('🚀 Server is up and running!');
});

// Connect to MongoDB
connectDB()
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Mount routes under /api
app.use('/api', router);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📡 Server is live on port ${PORT}`);
});
