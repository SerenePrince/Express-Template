const User = require("../models/userModel");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

// Helper function for ID validation
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get All Users
const getUsers = async () => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    logger.info(`Fetched ${users.length} users.`);
    return users;
  } catch (error) {
    logger.error("Error retrieving users:", error);
    throw new Error("Unable to retrieve users. Please try again later.");
  }
};

// Get Single User
const getUser = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("Invalid user ID format.");
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    logger.error(`Error fetching user ${id}:`, error);
    throw new Error("Unable to retrieve user. Please try again later.");
  }
};

// Create User
const createUser = async (email, password, role = "user") => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const user = await User.create({ email, password, role });
    logger.info(`Created user with email: ${email}`);
    return user;
  } catch (error) {
    logger.error(`Error creating user ${email}:`, error);
    throw new Error("Unable to create user. Please try again later.");
  }
};

// Delete User
const deleteUser = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("Invalid user ID format.");
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found.");
    }
    logger.info(`Deleted user with ID: ${id}`);
    return user;
  } catch (error) {
    logger.error(`Error deleting user ${id}:`, error);
    throw new Error("Unable to delete user. Please try again later.");
  }
};

// Update User
const updateUser = async (id, updates) => {
  if (!isValidObjectId(id)) {
    throw new Error("Invalid user ID format.");
  }

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      throw new Error("User not found.");
    }
    logger.info(`Updated user with ID: ${id}`);
    return user;
  } catch (error) {
    logger.error(`Error updating user ${id}:`, error);
    throw new Error("Unable to update user. Please try again later.");
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
