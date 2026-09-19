// routes/user.js
const express = require("express");
const router = express.Router();
const { signup, verifyEmail, login } = require("../controller/user");

// Public routes
router.post("/signup", signup);
router.get("/verify-email", verifyEmail);
router.post("/login", login);

module.exports = router;
