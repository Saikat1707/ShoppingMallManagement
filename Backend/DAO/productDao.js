import Product from "../models/product.js";
import Shop from "../models/shop.js";
import User from "../models/user.js";

class ProductDAO {
  // ✅ Create a new product (shop_owner or admin)
  async createProduct(data) {
    const { shop, ownerId } = data;

    const user = await User.findById(ownerId);
    if (!user) throw new Error("User not found");

    if (user.role !== "shop_owner" && user.role !== "admin") {
      throw new Error("Only shop owners or admins can add products");
    }

    const shopData = await Shop.findById(shop);
    if (!shopData) throw new Error("Shop not found");

    // Only admin or the shop owner can add products for that shop
    if (user.role !== "admin" && shopData.owner.toString() !== ownerId) {
      throw new Error("Unauthorized to add products for this shop");
    }

    return await Product.create(data);
  }

  // ✅ Get all products (admin view)
  async getAllProducts() {
    return await Product.find()
      .populate("shop", "name floor")
      .sort({ createdAt: -1 });
  }

  // ✅ Get products for a specific shop
  async getProductsByShop(shopId, requesterId) {
    const requester = await User.findById(requesterId);
    if (!requester) throw new Error("Requester not found");

    const shop = await Shop.findById(shopId);
    if (!shop) throw new Error("Shop not found");

    // if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
    //   throw new Error("Unauthorized to view this shop’s products");
    // }

    return await Product.find({ shop: shopId }).sort({ createdAt: -1 });
  }

  // ✅ Get product by ID
  async getProductById(id, requesterId) {
    const product = await Product.findById(id).populate("shop", "name owner");
    if (!product) throw new Error("Product not found");

    const requester = await User.findById(requesterId);
    const shop = await Shop.findById(product.shop);

    if (!requester) throw new Error("Requester not found");
    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to view this product");
    }

    return product;
  }

  // ✅ Update product (admin or shop owner)
  async updateProduct(id, updateData, requesterId) {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    const shop = await Shop.findById(product.shop);
    const requester = await User.findById(requesterId);

    if (!requester) throw new Error("Requester not found");
    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to update this product");
    }

    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  // ✅ Delete product (admin or shop owner)
  async deleteProduct(id, requesterId) {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    const shop = await Shop.findById(product.shop);
    const requester = await User.findById(requesterId);

    if (!requester) throw new Error("Requester not found");
    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to delete this product");
    }

    return await Product.findByIdAndDelete(id);
  }

  // ✅ Toggle availability (shop owner or admin)
  async toggleAvailability(id, requesterId) {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    const shop = await Shop.findById(product.shop);
    const requester = await User.findById(requesterId);

    if (!requester) throw new Error("Requester not found");
    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to update availability");
    }

    product.isAvailable = !product.isAvailable;
    await product.save();

    return product;
  }
}

export default new ProductDAO();
