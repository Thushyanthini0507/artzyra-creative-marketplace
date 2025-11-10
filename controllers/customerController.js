import Customer from "../models/Customer.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { NotFoundError } from "../utils/errors.js";

// Get all customers
export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();

  res.status(200).json({
    success: true,
    length: customers.length,
    customers,
  });
});

// Get a customer by Id
export const getCustomerById = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findById(customerId);

  if (!customer) {
    throw new NotFoundError("Customer");
  }

  res.status(200).json({
    success: true,
    customer,
  });
});

// Create a customer
export const createCustomer = asyncHandler(async (req, res) => {
  const newCustomer = new Customer(req.body);
  const savedCustomer = await newCustomer.save();

  res.status(201).json({
    success: true,
    message: "Customer created successfully",
    customer: savedCustomer,
  });
});

// Update a customer by Id
export const updateCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findByIdAndUpdate(customerId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!customer) {
    throw new NotFoundError("Customer");
  }

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    customer,
  });
});

// Delete a customer by Id
export const deleteCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findByIdAndDelete(customerId);

  if (!customer) {
    throw new NotFoundError("Customer");
  }

  res.status(200).json({
    success: true,
    message: "Customer removed successfully",
    deletedCustomer: customer,
  });
});
