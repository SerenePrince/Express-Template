const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    logger.error("MONGO_URI is not set in the environment variables.");
    process.exit(1); // Exit the process if the Mongo URI is missing
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true, // Optional in newer versions of mongoose
      useUnifiedTopology: true, // Optional in newer versions of mongoose
      // add more options here if necessary for newer mongoose versions
    });
    logger.info("MongoDB connected successfully.");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process on failure
  }
};

// Handle graceful shutdown (enhanced)
const gracefulShutdown = () => {
  mongoose.connection.close(() => {
    logger.info("MongoDB connection closed due to app termination.");
    process.exit(0);
  });
};

// Optional: Handle SIGTERM in addition to SIGINT for better production shutdown handling
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

module.exports = connectDB;
