import userModel from "../models/user.js";

class UserDAO {
  // ✅ Create new user
  async createUser(userData) {
    try {
      const user = new userModel(userData);
      return await user.save();
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  // ✅ Find by email
  async findByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw new Error("Error finding user by email: " + error.message);
    }
  }

  // ✅ Find by ID
  async findById(userId) {
    try {
      return await userModel.findById(userId).select("-password");
    } catch (error) {
      throw new Error("Error finding user by ID: " + error.message);
    }
  }

  // ✅ Get all users (Admin only)
  async getAllUsers() {
    try {
      return await userModel.find().select("-password");
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  // ✅ Get users by role
  async getUsersByRole(role) {
    try {
      return await userModel.find({ role }).select("-password");
    } catch (error) {
      throw new Error("Error fetching users by role: " + error.message);
    }
  }

  // ✅ Update user info
  async updateUser(userId, updateData) {
    try {
      return await userModel.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  // ✅ Delete user
  async deleteUser(userId) {
    try {
      return await userModel.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

export default new UserDAO();
