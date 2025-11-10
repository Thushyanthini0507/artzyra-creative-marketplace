import Customer from "../models/Customer.js";

/**
 * Customer Service - Business logic for customer operations
 */
class CustomerService {
  async getAllCustomers() {
    return await Customer.find();
  }

  async getCustomerById(id) {
    const customer = await Customer.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  }

  async createCustomer(data) {
    const customer = new Customer(data);
    return await customer.save();
  }

  async updateCustomer(id, data) {
    const customer = await Customer.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return await Customer.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteCustomer(id) {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  }
}

export default new CustomerService();



