const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Fetch the connection URI from the environment variables
    const dbURI = process.env.MONGODB_URI;

    if (!dbURI) {
      throw new Error('MONGODB_URI is not defined in the .env file');
    }

    // Connect to MongoDB without the deprecated options
    await mongoose.connect(dbURI, {
      useNewUrlParser: true, // Option still required for legacy reasons
      // useUnifiedTopology is not needed anymore
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err; // Rethrow error to handle it in server.js
  }
};

module.exports = connectDB;
