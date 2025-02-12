const jwt = require("jsonwebtoken");
const User = require("../models/user");
const logger = require("../utils/logger");

const requireAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validate Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.error("Authorization token required but not provided.");
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    // Verify token and decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user role (efficiently selecting only necessary fields)
    const user = await User.findById(decoded.userId).select("_id role");

    if (!user) {
      logger.error(`User not found for token: ${decoded.userId}`);
      return res.status(401).json({ error: "User not found" });
    }

    // Check if the user has admin role
    if (user.role !== "admin") {
      logger.error(
        `Access denied: User ${user._id} attempted to access an admin route.`
      );
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    // Attach minimal user data to request object for further use
    req.user = { id: user._id, role: user.role };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    logger.error(`Authorization error: ${error.message}`);

    // Handle token expiration or invalid token
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Token expired. Please log in again."
        : "Invalid token. Authentication failed.";

    res.status(401).json({ error: errorMessage });
  }
};

module.exports = requireAdmin;
