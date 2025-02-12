const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email format."],
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Ensure minimum length for password
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// Hash password before saving (including validation)
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    // Validate password strength
    if (!validator.isStrongPassword(this.password, { minLength: 8 })) {
      throw new Error(
        "Password must contain uppercase, lowercase, number, and special character."
      );
    }

    // Hash the password
    const saltRounds = 12; // You can make this configurable if needed
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error); // Pass error to the next middleware (e.g., error handling middleware)
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
