const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    // Delete existing admin user if exists
    await User.deleteOne({ email: "admin@wildwood.com" });
    console.log("Removed existing admin user if any");

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@wildwood.com",
      password: "admin123", // Will be hashed by pre-save hook
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@wildwood.com");
    console.log("Password: admin123");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
