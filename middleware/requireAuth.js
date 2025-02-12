require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Using Authorization header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user to check if it exists
    const user = await User.findById(decoded.userId).select("_id role");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user info to request for further use
    req.user = { id: user._id, role: user.role };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Token expired. Please log in again."
        : "Invalid or expired token.";

    res.status(401).json({ error: errorMessage });
  }
};

module.exports = requireAuth;
