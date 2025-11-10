import Payment from "../models/Payment.js";

class PaymentService {
  async getAllPayments() {
    return await Payment.find().populate("customer_id");
  }

  async getPaymentById(id) {
    const payment = await Payment.findById(id).populate("customer_id");
    if (!payment) {
      throw new Error("Payment not found");
    }
    return payment;
  }

  async createPayment(data) {
    const payment = new Payment(data);
    return await payment.save();
  }

  async updatePayment(id, data) {
    const payment = await Payment.findById(id);
    if (!payment) {
      throw new Error("Payment not found");
    }
    return await Payment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deletePayment(id) {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      throw new Error("Payment not found");
    }
    return payment;
  }
}

export default new PaymentService();



