const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// Get all users - Admin only
router.get("/", requireAdmin, getUsers);

// Get a single user - Authenticated users only (can view their own data)
router.get("/:id", requireAuth, getUser);

// Create user - No restrictions (open for all)
router.post("/", createUser);

// Update user - Admin only
router.put("/:id", requireAdmin, updateUser);

// Delete user - Admin only
router.delete("/:id", requireAdmin, deleteUser);

module.exports = router;
