require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI from environment variable
const mongoURI = process.env.MONGODB_URI; 

// Connect to MongoDB
mongoose.connect(mongoURI)  // Removed useNewUrlParser
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

// Sample route (you can replace this with actual routes later)
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
