import shopDAO from "../DAO/shopDao.js";
import User from "../models/user.js";

// 🏪 Create a new shop
export const createShop = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "shop_owner" && user.role !== "admin") {
      return res.status(403).json({ message: "Only shop owners or admins can create shops" });
    }

    const shopData = { ...req.body, owner: req.user.id };
    const shop = await shopDAO.createShop(shopData);
    res.status(201).json({ message: "Shop created successfully", shop });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📋 Get all shops (admin only)
export const getAllShops = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const shops = await shopDAO.getAllShops();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🌍 Get all active shops (public route)
export const getActiveShops = async (req, res) => {
  try {
    const shops = await shopDAO.getActiveShops();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get single shop by ID (public route)
export const getShopById = async (req, res) => {
  try {
    const shop = await shopDAO.getShopById(req.params.id);
    res.status(200).json(shop);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ✏️ Update shop (owner or admin)
export const updateShop = async (req, res) => {
  try {
    const shop = await shopDAO.updateShop(req.params.id, req.body, req.user.id);
    res.status(200).json({ message: "Shop updated successfully", shop });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// ❌ Delete shop (admin only)
export const deleteShop = async (req, res) => {
  try {
    await shopDAO.deleteShop(req.params.id, req.user.id);
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// 👤 Get shops by owner (shop_owner)
export const getShopsByOwner = async (req, res) => {
  try {
    const shops = await shopDAO.getShopsByOwner(req.user.id);
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⚙️ Change shop status (admin)
export const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const shop = await shopDAO.changeStatus(req.params.id, status, req.user.id);
    res.status(200).json({ message: `Shop status updated to ${status}`, shop });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
