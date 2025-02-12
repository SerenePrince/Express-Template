const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
} = require("../controllers/authController");
const requireAuth = require("../middleware/requireAuth"); // Importing requireAuth

const router = express.Router();

// Signup route - No authentication required
router.post("/signup", signupController);

// Login route - No authentication required
router.post("/login", loginController);

// Logout route - Require authentication to log out
router.post("/logout", requireAuth, logoutController);

module.exports = router;
