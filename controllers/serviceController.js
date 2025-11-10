import Service from "../models/service.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { NotFoundError } from "../utils/errors.js";

// Get all services
export const getAllService = asyncHandler(async (req, res) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    length: services.length,
    services,
  });
});

// Get a service by Id
export const getServiceById = asyncHandler(async (req, res) => {
  const serviceId = req.params.id;
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new NotFoundError("Service");
  }

  res.status(200).json({
    success: true,
    service,
  });
});

// Create a service
export const createService = asyncHandler(async (req, res) => {
  const newService = new Service(req.body);
  const savedService = await newService.save();

  res.status(201).json({
    success: true,
    message: "Service created successfully",
    service: savedService,
  });
});

// Update a service by Id
export const updateService = asyncHandler(async (req, res) => {
  const serviceId = req.params.id;
  const service = await Service.findByIdAndUpdate(serviceId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new NotFoundError("Service");
  }

  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    service,
  });
});

// Delete a service by Id
export const deleteService = asyncHandler(async (req, res) => {
  const serviceId = req.params.id;
  const service = await Service.findByIdAndDelete(serviceId);

  if (!service) {
    throw new NotFoundError("Service");
  }

  res.status(200).json({
    success: true,
    message: "Service removed successfully",
    deletedService: service,
  });
});
