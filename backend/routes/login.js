const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // 3. Create JWT with user._id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "your_jwt_secret_key", {
      expiresIn: "1d",
    });

    // 4. Send token and user data
    res.status(200).json({
      message: "Login successful", // ✅ This is required for frontend check
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
