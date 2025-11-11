import mongoose from "mongoose";
import Customer from "./Customer.js";
import artist from "./artist.js";

const reviewSchema = new mongoose.Schema(
  {
   
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Customer,
      required: true,
    },
    talent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: artist,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // adds createdAt & updatedAt automatically

export default mongoose.model("Review", reviewSchema);
