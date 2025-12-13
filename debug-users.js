
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Artist from "./src/models/Artist.js";
import Customer from "./src/models/Customer.js";

dotenv.config({ path: './api/.env' });

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

const debugUsers = async () => {
  await connectDB();

  try {
    console.log("--- Debugging Users ---");

    const users = await User.find({});
    console.log(`Total Users in DB: ${users.length}`);
    users.forEach(u => console.log(`- User: ${u.email} (${u.role}) ID: ${u._id}`));

    const artists = await Artist.find({});
    console.log(`\nTotal Artists in DB: ${artists.length}`);
    artists.forEach(a => console.log(`- Artist: ${a.name} UserID: ${a.userId}`));

    const customers = await Customer.find({});
    console.log(`\nTotal Customers in DB: ${customers.length}`);
    customers.forEach(c => console.log(`- Customer: ${c.name} UserID: ${c.userId}`));

    console.log("\n--- Checking Links ---");
    
    for (const artist of artists) {
      const user = await User.findById(artist.userId);
      if (!user) {
        console.error(`ERROR: Artist ${artist.name} has invalid userId: ${artist.userId}`);
      } else {
        console.log(`OK: Artist ${artist.name} linked to ${user.email}`);
      }
    }

    for (const customer of customers) {
      const user = await User.findById(customer.userId);
      if (!user) {
        console.error(`ERROR: Customer ${customer.name} has invalid userId: ${customer.userId}`);
      } else {
        console.log(`OK: Customer ${customer.name} linked to ${user.email}`);
      }
    }

  } catch (error) {
    console.error("Debug Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

debugUsers();
