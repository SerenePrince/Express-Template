require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const createAdmin = require("./utils/initAdmin");

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB(); // Attempt to connect to the database
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      createAdmin(); // Ensure admin user exists on startup
    });
  } catch (error) {
    logger.error(`Error starting the server: ${error.message}`);
    process.exit(1); // Exit the process if the server cannot start
  }
};

// Graceful shutdown (optional)
const gracefulShutdown = () => {
  logger.info("Shutting down gracefully...");
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

startServer(); // Start the server
