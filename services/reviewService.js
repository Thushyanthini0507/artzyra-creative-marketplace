import Review from "../models/review.js";

class ReviewService {
  async getAllReviews() {
    return await Review.find().populate("customer_id talent_id");
  }

  async getReviewById(id) {
    const review = await Review.findById(id).populate("customer_id talent_id");
    if (!review) {
      throw new Error("Review not found");
    }
    return review;
  }

  async createReview(data) {
    const review = new Review(data);
    return await review.save();
  }

  async updateReview(id, data) {
    const review = await Review.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }
    return await Review.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteReview(id) {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      throw new Error("Review not found");
    }
    return review;
  }
}

export default new ReviewService();



