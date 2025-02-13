const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const logger = require("./logger");

const createAdmin = async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      logger.error("Admin credentials are not set in the .env file.");
      return;
    }

    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      // Create admin user with hashed password
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });

      logger.info("Admin account created successfully.");
    } else {
      logger.info("Admin account already exists.");
    }
  } catch (error) {
    logger.error("Error creating admin account:", error.message);
  }
};

module.exports = createAdmin;
