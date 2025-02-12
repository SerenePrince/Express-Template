const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/userModel");

// Generate JWT
const generateToken = (user) => {
  const expiresIn = process.env.JWT_EXPIRATION || "1h"; // Make expiration configurable
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

// Sign up user
const signup = async (email, password, role = "user") => {
  if (!email || !password) {
    throw new Error("Both email and password are required.");
  }

  if (role !== "user" && role !== "admin") {
    throw new Error(
      "Invalid role assignment. Only 'user' or 'admin' are allowed."
    );
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain uppercase, lowercase, number, and special character."
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const newUser = await User.create({
    email,
    password,
    role,
  });

  const token = generateToken(newUser); // Generate token for new user

  return { user: newUser, token }; // Return both user and token
};

// Login user
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password.");
  }

  const token = generateToken(user); // Generate token for the logged-in user

  return { user, token }; // Return both user and token
};

module.exports = { generateToken, signup, login };
