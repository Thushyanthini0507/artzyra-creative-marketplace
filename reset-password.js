
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'api/.env') });

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const email = 'kaya@gmail.com';
    const newPassword = 'password123';

    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User ${email} not found`);
      process.exit(1);
    }

    user.password = newPassword;
    await user.save();
    
    console.log(`Password for ${email} reset to ${newPassword}`);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
};

resetPassword();
