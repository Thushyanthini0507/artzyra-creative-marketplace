import User from "../models/User.js";

class UserService {
  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async createUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async updateUser(id, data) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

export default new UserService();



