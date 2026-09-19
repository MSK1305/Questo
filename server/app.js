const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();

// --- Security & Utility Middleware ---
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// --- Rate Limiting ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use("/api", limiter);

// --- Background Services & Cron Jobs ---
// (Starts the cleanup cron job automatically upon import)
require("./services/cleanupUnverifiedUsers");

// --- Route Imports ---
const userRoutes = require("./routes/user");
// const taskRoutes = require("./routes/task");         // Ready for later
// const campaignRoutes = require("./routes/campaign"); // Ready for later

// --- Route Mounting ---
app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/campaigns", campaignRoutes);

// --- Test Route ---
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Questo API is running",
  });
});

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
    console.log(`📦 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
    process.exit(1);
  }
};

// --- Start Server ---
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Questo server running on port ${PORT}`);
  });
};

startServer();
