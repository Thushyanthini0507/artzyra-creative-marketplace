
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Artist from "./src/models/Artist.js";
import Customer from "./src/models/Customer.js";
import Booking from "./src/models/Booking.js";
import Review from "./src/models/Review.js";

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

const verifyReviewFlow = async () => {
  await connectDB();

  try {
    console.log("--- Verifying Review Flow ---");

    // 1. Find a Customer and an Artist
    const customer = await Customer.findOne();
    const artist = await Artist.findOne();

    if (!customer || !artist) {
      console.error("Error: Need at least one customer and one artist.");
      return;
    }

    console.log(`Customer: ${customer.name} (${customer._id})`);
    console.log(`Artist: ${artist.name} (${artist._id})`);

    // 2. Create a Booking (or find existing)
    // We'll create a new one to be safe and ensure it's completed
    // Find a category
    const Category = (await import("./src/models/Category.js")).default;
    const category = await Category.findOne();
    if (!category) {
      console.error("Error: Need at least one category.");
      return;
    }

    console.log("Creating a test booking...");
    const booking = await Booking.create({
      customer: customer._id,
      artist: artist._id,
      category: category._id,
      service: "Test Service for Review",
      bookingDate: new Date(), // Required field
      startTime: "10:00",
      endTime: "11:00",
      duration: 60, // Required field
      status: "completed",
      totalAmount: 1000,
      location: "Test Location",
      paymentStatus: "paid"
    });

    console.log(`Booking created: ${booking._id} (Status: ${booking.status})`);

    // 3. Create a Review
    console.log("Creating a review for the booking...");
    
    // Simulate the API payload
    const reviewData = {
      booking: booking._id,
      customer: customer.userId, // Review model usually references User ID for customer?
      // Let's check Review model...
      // Review controller: customer: req.userId
      // So Review.customer is User ID.
      artist: artist._id, // Review.artist is Artist Profile ID
      rating: 5,
      comment: "This is a test review verified by script."
    };

    // Check Review Model Schema to be sure
    // But based on controller:
    // const review = await Review.create({
    //   booking: bookingId,
    //   customer: req.userId,
    //   artist: booking.artist._id,
    //   rating,
    //   comment,
    // });
    
    const review = await Review.create({
      booking: reviewData.booking,
      customer: reviewData.customer,
      artist: reviewData.artist,
      rating: reviewData.rating,
      comment: reviewData.comment
    });

    console.log(`Review created: ${review._id}`);
    console.log(`Rating: ${review.rating}, Comment: ${review.comment}`);

    // 4. Verify Artist Rating Updated
    // The controller updates it, but here we are manually creating.
    // The controller logic:
    /*
      const artist = await Artist.findById(booking.artist._id);
      const totalReviews = await Review.countDocuments({ artist: artist._id });
      const avgRating = await Review.aggregate([
        { $match: { artist: artist._id } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]);
      artist.rating = avgRating[0]?.avgRating || rating;
      artist.totalReviews = totalReviews;
      await artist.save();
    */
    
    // We can run this update logic to verify it works
    const totalReviews = await Review.countDocuments({ artist: artist._id });
    const avgRating = await Review.aggregate([
      { $match: { artist: artist._id } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    
    const newRating = avgRating[0]?.avgRating || 0;
    console.log(`Updated Artist Stats - Total Reviews: ${totalReviews}, Avg Rating: ${newRating}`);

    // Cleanup
    console.log("Cleaning up test data...");
    await Review.findByIdAndDelete(review._id);
    await Booking.findByIdAndDelete(booking._id);
    console.log("Cleanup complete.");

  } catch (error) {
    console.error("Verification Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

verifyReviewFlow();
