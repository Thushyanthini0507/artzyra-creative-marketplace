import Service from "../models/service.js";

class ServiceService {
  async getAllServices() {
    return await Service.find();
  }

  async getServiceById(id) {
    const service = await Service.findById(id);
    if (!service) {
      throw new Error("Service not found");
    }
    return service;
  }

  async createService(data) {
    const service = new Service(data);
    return await service.save();
  }

  async updateService(id, data) {
    const service = await Service.findById(id);
    if (!service) {
      throw new Error("Service not found");
    }
    return await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteService(id) {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      throw new Error("Service not found");
    }
    return service;
  }
}

export default new ServiceService();



