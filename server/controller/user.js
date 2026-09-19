// controllers/user.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// @desc    Register a new user
// @route   POST /api/users/signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. BACKEND VALIDATION (The Source of Truth)
    if (!username || username.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long." });
    }

    // Basic email format check (Mongoose also checks this, but good to fail fast)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address." });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // 3. Hash the password (Now we know it's safe and valid)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const emailMessage = `
      <h1>Welcome to the Quest App!</h1>
      <p>Please click the link below to verify your email address and activate your account:</p>
      <a href="${verificationUrl}" target="_blank">Verify My Email</a>
      <p>This link will expire in 24 hours.</p>
    `;

    await sendEmail({
      email: newUser.email,
      subject: "Verify Your Email Address",
      message: emailMessage,
    });

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// @desc    Verify email address
// @route   GET /api/users/verify-email?token=xyz
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Email verified successfully! You are now logged in.",
      token: jwtToken,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ message: "Server error during email verification" });
  }
};

// @desc    Login user
// @route   POST /api/users/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. BACKEND VALIDATION
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // 2. Find the user
    const user = await User.findOne({ email });
    if (!user) {
      // Note: We say "Invalid email or password" (not "Email not found")
      // to prevent hackers from guessing which emails are registered.
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // SAFETY NET: Check if unverified AND expired
    if (!user.isVerified) {
      if (
        user.verificationTokenExpires &&
        user.verificationTokenExpires < Date.now()
      ) {
        await User.deleteOne({ _id: user._id });
        return res.status(400).json({
          message:
            "Verification link expired. Your account has been deleted. Please sign up again.",
        });
      }

      return res.status(403).json({
        message:
          "Please verify your email address before logging in. Check your inbox.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
