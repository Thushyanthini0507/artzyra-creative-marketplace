
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Artist from "./src/models/Artist.js";
import Customer from "./src/models/Customer.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

const repairUsers = async () => {
  await connectDB();

  try {
    console.log("--- Repairing Users ---");

    const users = await User.find({});
    console.log(`Found ${users.length} users to check.`);

    let createdArtists = 0;
    let createdCustomers = 0;

    for (const user of users) {
      if (user.role === "admin") continue;

      const name = user.email.split("@")[0]; // Default name from email

      if (user.role === "artist") {
        const existing = await Artist.findOne({ userId: user._id });
        if (!existing) {
          console.log(`Creating profile for Artist: ${user.email}`);
          await Artist.create({
            userId: user._id,
            name: name,
            email: user.email, // Some models might have email duplicated, checking schema... Artist schema doesn't have email, but let's check.
            // Artist schema: userId, name, phone, bio, profileImage, category, skills, hourlyRate, ...
            // It does NOT have email.
            bio: "Auto-generated profile",
            skills: ["General"],
            hourlyRate: 1000,
            status: "approved" // Auto-approve for now to make them visible? Or pending?
            // Admin view filters by status? getUsersByRole doesn't filter by status unless requested.
          });
          createdArtists++;
        }
      } else if (user.role === "customer") {
        const existing = await Customer.findOne({ userId: user._id });
        if (!existing) {
          console.log(`Creating profile for Customer: ${user.email}`);
          await Customer.create({
            userId: user._id,
            name: name,
            // Customer schema: userId, name, phone, address, ...
          });
          createdCustomers++;
        }
      }
    }

    console.log(`\nRepair Complete.`);
    console.log(`Created ${createdArtists} Artist profiles.`);
    console.log(`Created ${createdCustomers} Customer profiles.`);

  } catch (error) {
    console.error("Repair Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

repairUsers();
