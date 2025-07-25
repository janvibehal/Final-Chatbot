const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const chatRoutes = require('./routes/chat');
require('dotenv').config(); // Load .env variables

const app = express();

// Set the port from environment or default to 6001
const PORT = process.env.PORT || 6001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // change this to your frontend Render URL in production
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/chat', chatRoutes);

// MongoDB connection using .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
