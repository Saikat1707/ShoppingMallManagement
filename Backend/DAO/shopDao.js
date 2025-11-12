import Shop from "../models/shop.js";
import User from "../models/user.js";

class ShopDAO {
  // 🏪 Create a new shop (owner or admin)
  async createShop(data) {
    const { owner } = data;

    const user = await User.findById(owner);
    if (!user) throw new Error("Owner not found");
    if (user.role !== "shop_owner" && user.role !== "admin") {
      throw new Error("Only shop owners or admins can create shops");
    }

    return await Shop.create({ ...data, status: "pending" }); // Default status on creation
  }

  // 📋 Fetch all shops (admin only)
  async getAllShops() {
    return await Shop.find()
      .populate("owner", "name email role")
      .sort({ createdAt: -1 });
  }

  // 🌍 Public: Get all active shops (visible to everyone)
  async getActiveShops() {
    return await Shop.find({ status: "active" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
  }

  // 🔍 Get a specific shop by ID
  async getShopById(id) {
    const shop = await Shop.findById(id).populate("owner", "name email role");
    if (!shop) throw new Error("Shop not found");
    return shop;
  }

  // ✏️ Update shop (only owner or admin)
  async updateShop(id, updateData, requesterId) {
    const shop = await Shop.findById(id);
    if (!shop) throw new Error("Shop not found");

    const requester = await User.findById(requesterId);
    if (!requester) throw new Error("Requester not found");

    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to update this shop");
    }

    return await Shop.findByIdAndUpdate(id, updateData, { new: true });
  }

  // ❌ Delete shop (admin only)
  async deleteShop(id, requesterId) {
    const requester = await User.findById(requesterId);
    if (!requester || requester.role !== "admin") {
      throw new Error("Only admin can delete shops");
    }

    const shop = await Shop.findByIdAndDelete(id);
    if (!shop) throw new Error("Shop not found");
    return shop;
  }

  // 👤 Get all shops by owner
  async getShopsByOwner(ownerId) {
    return await Shop.find({ owner: ownerId })
      .populate("owner", "name email role")
      .sort({ createdAt: -1 });
  }

  // ⚙️ Change shop status (admin only)
  async changeStatus(id, status, adminId) {
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
      throw new Error("Only admin can change shop status");
    }

    const shop = await Shop.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("owner", "name email role");

    if (!shop) throw new Error("Shop not found");
    return shop;
  }
}

export default new ShopDAO();
