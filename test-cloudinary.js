import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
import { v2 as cloudinary } from "cloudinary";

const config = {
  cloud_name: "dvmqpz0fp", // Trying the old cloud name
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

console.log("Testing Cloudinary Configuration:");
console.log("Cloud Name:", config.cloud_name);
console.log(
  "API Key:",
  config.api_key ? "***" + config.api_key.slice(-4) : "Missing"
);
console.log("API Secret:", config.api_secret ? "***" : "Missing");

cloudinary.config(config);

cloudinary.api
  .ping()
  .then((res) => {
    console.log("Cloudinary Connection Successful!");
    console.log("Response:", res);
  })
  .catch((err) => {
    console.error("Cloudinary Connection Failed!");
    console.error("Error:", err);
  });
