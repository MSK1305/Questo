const cron = require("node-cron");
const User = require("../models/User");

// Schedule a task to run every hour: '0 * * * *'
// (Minute, Hour, Day of Month, Month, Day of Week)
// '0 * * * *' means at minute 0 of every hour.
cron.schedule("0 * * * *", async () => {
  try {
    console.log("🕒 Running scheduled cleanup of unverified users...");

    const now = Date.now();

    // Find and delete users who are NOT verified AND whose token has expired
    const result = await User.deleteMany({
      isVerified: false,
      verificationTokenExpires: { $lt: now }, // $lt means "less than" (expired)
    });

    if (result.deletedCount > 0) {
      console.log(
        `🧹 Successfully cleaned up ${result.deletedCount} expired, unverified accounts.`,
      );
    } else {
      console.log("✨ No expired unverified accounts found.");
    }
  } catch (error) {
    console.error("❌ Error during scheduled cleanup:", error);
  }
});

console.log("✅ Scheduled cleanup task initialized.");
