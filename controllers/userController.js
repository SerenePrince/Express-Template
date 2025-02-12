const userService = require("../services/userService");
const logger = require("../utils/logger");

// Helper function to handle error responses
const handleError = (res, error, statusCode = 500) => {
  logger.error(error); // Log the error for debugging and traceability
  res.status(statusCode).json({ success: false, message: error.message });
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get Single User
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUser(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: user,
    });
  } catch (error) {
    handleError(res, error, 400);
  }
};

// Create User (Admin Only)
const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await userService.createUser(email, password, role);
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    handleError(res, error, 400);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.deleteUser(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: user,
    });
  } catch (error) {
    handleError(res, error, 400);
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  let { ...updates } = req.body;

  try {
    const user = await userService.updateUser(id, updates);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: user,
    });
  } catch (error) {
    handleError(res, error, 400);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
