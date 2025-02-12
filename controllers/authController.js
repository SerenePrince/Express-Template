const { generateToken, signup, login } = require("../services/authService");

const signupController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const { user, token } = await signup(email, password, role);

    // Set JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: { id: user._id, role: user.role },
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await login(email, password);

    // Set JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, role: user.role },
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const logoutController = (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = { signupController, loginController, logoutController };
