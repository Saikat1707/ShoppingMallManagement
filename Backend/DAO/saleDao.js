import Sale from "../models/sale.js";
import Shop from "../models/shop.js";
import User from "../models/user.js";
import Product from "../models/product.js";

class SaleDAO {
  // ✅ Create a new sale (only shop_owner or admin)
  async createSale(data) {
    const { shop, product, quantity, totalAmount, paymentMethod, ownerId } = data;
    const user = await User.findById(ownerId);
    if (!user) throw new Error("User not found");

    if (user.role !== "shop_owner" && user.role !== "admin") {
      throw new Error("Only shop owners or admins can record a sale");
    }

    const shopData = await Shop.findById(shop);
    if (!shopData) throw new Error("Shop not found");

    // Check shop ownership if not admin
    if (user.role !== "admin" && shopData.owner.toString() !== ownerId) {
      throw new Error("Unauthorized to add sales for this shop");
    }

    // ✅ Check product availability
    const productData = await Product.findById(product);
    // console.log(productData)
    if (!productData) throw new Error("Product not found");
    if (productData.stock < quantity) {
      throw new Error(`Not enough stock. Available: ${productData.quantity}`);
    }
    if(productData.stock == 0) productData.isAvailable = false
    // ✅ Reduce stock
    productData.stock -= quantity;
    await productData.save();

    // ✅ Record sale
    const sale = await Sale.create({
      shop,
      product,
      quantity,
      totalAmount,
      paymentMethod,
    });

    return sale;
  }

  // ✅ Get all sales (admin only)
  async getAllSales() {
    return await Sale.find()
      .populate("shop", "name floor")
      .populate("product", "name price")
      .sort({ date: -1 });
  }

  // ✅ Get sales by shop (shop owner or admin)
  async getSalesByShop(shopId, requesterId) {
    const requester = await User.findById(requesterId);
    if (!requester) throw new Error("Requester not found");

    const shop = await Shop.findById(shopId);
    if (!shop) throw new Error("Shop not found");

    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to view this shop’s sales");
    }

    return await Sale.find({ shop: shopId })
      .populate("product", "name price")
      .sort({ date: -1 });
  }

  // ✅ Get single sale by ID (admin or shop owner)
  async getSaleById(id, requesterId) {
    const sale = await Sale.findById(id)
      .populate("shop", "name owner")
      .populate("product", "name price");
    if (!sale) throw new Error("Sale not found");

    const requester = await User.findById(requesterId);
    if (!requester) throw new Error("Requester not found");

    const shop = await Shop.findById(sale.shop);
    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to view this sale");
    }

    return sale;
  }

  // ✅ Delete sale (admin or shop owner)
  async deleteSale(id, requesterId) {
    const sale = await Sale.findById(id);
    if (!sale) throw new Error("Sale not found");

    const shop = await Shop.findById(sale.shop);
    const requester = await User.findById(requesterId);

    if (!requester) throw new Error("Requester not found");

    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to delete this sale");
    }

    return await Sale.findByIdAndDelete(id);
  }

  // ✅ Get total sales summary (for analytics)
  async getSalesSummary(shopId, requesterId) {
    const requester = await User.findById(requesterId);
    if (!requester) throw new Error("Requester not found");

    const shop = await Shop.findById(shopId);
    if (!shop) throw new Error("Shop not found");

    if (requester.role !== "admin" && shop.owner.toString() !== requesterId) {
      throw new Error("Unauthorized to view sales summary");
    }

    const summary = await Sale.aggregate([
      { $match: { shop: shop._id } },
      {
        $group: {
          _id: "$shop",
          totalSales: { $sum: "$totalAmount" },
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);

    return summary[0] || { totalSales: 0, totalQuantity: 0 };
  }
}

export default new SaleDAO();
