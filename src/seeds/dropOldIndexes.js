/**
 * Drop Old Indexes Script
 * Removes old indexes from the Users collection that are no longer needed
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

dotenv.config();

const dropOldIndexes = async () => {
  try {
    console.log("🔧 Starting index cleanup...\n");

    console.log("📡 Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connected successfully\n");

    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");

    // List all indexes
    const indexes = await usersCollection.indexes();
    console.log(
      "Current indexes:",
      indexes.map((idx) => idx.name)
    );

    // Drop old admin_id index if it exists
    try {
      await usersCollection.dropIndex("admin_id_1");
      console.log("Dropped old admin_id_1 index");
    } catch (error) {
      if (error.code === 27) {
        console.log("admin_id_1 index doesn't exist, skipping");
      } else {
        throw error;
      }
    }

    // Drop any other old indexes that might exist
    const oldIndexes = ["customer_id_1", "artist_id_1", "category_id_1"];
    for (const indexName of oldIndexes) {
      try {
        await usersCollection.dropIndex(indexName);
        console.log(`Dropped old ${indexName} index`);
      } catch (error) {
        if (error.code === 27) {
          console.log(`${indexName} index doesn't exist, skipping`);
        } else {
          console.warn(`Could not drop ${indexName}:`, error.message);
        }
      }
    }

    // List indexes after cleanup
    const indexesAfter = await usersCollection.indexes();
    console.log(
      "\nRemaining indexes:",
      indexesAfter.map((idx) => idx.name)
    );

    // Clean up old indexes from Customer, Artist, and Admin collections
    const collections = ["customers", "artists", "admins"];
    for (const collectionName of collections) {
      try {
        const collection = db.collection(collectionName);
        const indexes = await collection.indexes();
        console.log(
          `\n${collectionName} indexes:`,
          indexes.map((idx) => idx.name)
        );

        // Drop email index (email is now in Users collection)
        try {
          await collection.dropIndex("email_1");
          console.log(`Dropped email_1 index from ${collectionName}`);
        } catch (error) {
          if (error.code === 27) {
            console.log(
              `email_1 index doesn't exist in ${collectionName}, skipping`
            );
          } else {
            console.warn(
              `Could not drop email_1 from ${collectionName}:`,
              error.message
            );
          }
        }
      } catch (error) {
        console.warn(
          `Could not access ${collectionName} collection:`,
          error.message
        );
      }
    }

    console.log("\nIndex cleanup completed successfully!");
  } catch (error) {
    console.error("Error during index cleanup:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

dropOldIndexes();

export default dropOldIndexes;
