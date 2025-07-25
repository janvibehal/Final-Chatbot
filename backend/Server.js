const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const chatRoutes = require('./routes/chat');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(cors());
app.use(express.json());

// Health check root route
app.get('/', (req, res) => {
  res.send('✅ Chatbot backend is working!');
});

// API Routes
app.use('/api/chat', chatRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`==> Your service is live 🎉`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});
