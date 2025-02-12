require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./utils/logger");
const { generalLimiter, sensitiveLimiter } = require("./middleware/limiter");
const { corsOption } = require("./middleware/corsOptions");

const app = express();

// Check if essential environment variables are set
if (!process.env.JWT_SECRET) {
  logger.error("JWT_SECRET is not set in .env. Authentication will not work.");
  process.exit(1); // Stop the server if JWT_SECRET is missing
}
if (!process.env.MONGO_URI) {
  logger.error("MONGO_URI is not set in .env. Database connection will fail.");
  process.exit(1); // Stop the server if MONGO_URI is missing
}
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  logger.warn(
    "Admin credentials are missing in .env. Admin account creation may fail."
  );
}

// Security & Middleware
app.use(helmet()); // Protect against well-known vulnerabilities
app.use(generalLimiter); // Apply rate-limiting to all routes
app.use(cors(corsOption)); // Enable CORS with custom options
app.use(express.json()); // Middleware to parse JSON bodies

// Request Logger Middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Catch-all route for undefined routes (404 handling)
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error Handling Middleware (should be placed after all routes)
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// 404 Route Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
});

// Graceful shutdown (optional)
const gracefulShutdown = () => {
  logger.info("Shutting down gracefully...");
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

module.exports = app;
