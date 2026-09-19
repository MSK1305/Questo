// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User"); // Adjust path to your actual model paths
const Campaign = require("../models/Campaign");
const Task = require("../models/Task");

// 1. Connect to your database (replace with your actual connection string)
const MONGO_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 2. Clear existing data (Optional: Comment this out if you want to keep existing data)
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await Task.deleteMany({});
    console.log("🧹 Cleared existing data");

    // 3. Create a Dummy User
    const dummyUser = await User.create({
      username: "hero_of_code",
      email: "hero@example.com",
      password: "hashed_password_123", // In a real app, use bcrypt to hash this!
      stats: {
        strength: 5,
        stamina: 3,
        intelligence: 8,
      },
    });
    console.log(`👤 Created User: ${dummyUser.username}`);

    // 4. Create a Dummy Campaign
    const dummyCampaign = await Campaign.create({
      user: dummyUser._id,
      name: "Learn Node.js Quest",
      status: "active",
    });
    console.log(`🏰 Created Campaign: ${dummyCampaign.name}`);

    // 5. Create Dummy Tasks
    const tasksData = [
      {
        user: dummyUser._id,
        campaign: dummyCampaign._id,
        name: "Set up Express server",
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        difficulty: "easy",
        status: "completed",
      },
      {
        user: dummyUser._id,
        campaign: dummyCampaign._id,
        name: "Design Mongoose schemas",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        difficulty: "medium",
        status: "ongoing",
      },
      {
        user: dummyUser._id,
        campaign: null, // Standalone task, not part of a campaign
        name: "Drink 2L of water",
        date: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000), // Today
        difficulty: "easy",
        status: "issued",
      },
    ];

    const createdTasks = await Task.insertMany(tasksData);
    console.log(`⚔️ Created ${createdTasks.length} Tasks`);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // 6. Always close the connection when done
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

seedDatabase();
