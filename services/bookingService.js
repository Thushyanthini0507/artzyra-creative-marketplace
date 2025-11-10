import Booking from "../models/Booking.js";

class BookingService {
  async getAllBookings() {
    return await Booking.find().populate("customer_id talent_id");
  }

  async getBookingById(id) {
    const booking = await Booking.findById(id).populate("customer_id talent_id");
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  }

  async createBooking(data) {
    const booking = new Booking(data);
    return await booking.save();
  }

  async updateBooking(id, data) {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return await Booking.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteBooking(id) {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  }
}

export default new BookingService();



