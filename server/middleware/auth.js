// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This middleware protects routes. Attach it to any route that needs authentication.
exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check if token exists in headers (Format: "Bearer <token>")
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user and attach to the request object
    // We exclude the password field for security
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // Attach user to the request so controllers can access it via req.user
    req.user = user;
    next(); // Move to the next middleware or controller
  } catch (error) {
    console.error("Auth middleware error:", error);
    res
      .status(401)
      .json({ message: "Not authorized, token failed or expired" });
  }
};
