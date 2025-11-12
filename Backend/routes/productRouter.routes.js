import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByShop,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleAvailability,
} from "../Controller/productController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/* 
--------------------------------------------
📦 PRODUCT ROUTES — Access Permissions Summary
--------------------------------------------
🔹 Admin:
   - Can view all products
   - Can add, update, delete, and toggle availability
   - Can view products for any shop

🔹 Shop Owner:
   - Can create, update, delete, and toggle availability of products in *their* shops
   - Can view all products in their shop

🔹 Customer:
   - Can view products (no login required)
   - Cannot modify, add, or delete anything
--------------------------------------------
*/

// 🛍️ Public route — get all available products (for customers)
router.get("/public", getAllProducts); 

// 🛒 Create product (Shop Owner / Admin)
router.post("/", verifyToken, createProduct);

// 🏬 Get products of a specific shop (Shop Owner / Admin)
router.get("/shop/:shopId", verifyToken, getProductsByShop);

// 🔍 Get a specific product (Shop Owner / Admin)
router.get("/:id", verifyToken, getProductById);

// ✏️ Update product (Shop Owner / Admin)
router.put("/:id", verifyToken, updateProduct);

// ❌ Delete product (Shop Owner / Admin)
router.delete("/:id", verifyToken, deleteProduct);

// 🔄 Toggle product availability (Shop Owner / Admin)
router.patch("/:id/toggle", verifyToken, toggleAvailability);

export default router;
