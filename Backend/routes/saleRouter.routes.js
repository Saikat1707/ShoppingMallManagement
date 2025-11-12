import express from "express";
import {
  createSale,
  getAllSales,
  getSalesByShop,
  getSaleById,
  deleteSale,
  getSalesSummary,
} from "../Controller/saleController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/* 
--------------------------------------------
🧾 SALE ROUTES — Access Permissions Summary
--------------------------------------------
🔹 Admin:
   - Can perform all actions (full access)

🔹 Shop Owner:
   - Can create sales for their own shop
   - Can view and manage sales of their shop
   - Can view summary of their shop’s sales

🔹 Customer:
   - ❌ No direct access to sale routes
--------------------------------------------
*/

// 🛒 Create a sale (Shop Owner / Admin)
router.post("/", verifyToken, createSale);

// 📦 Get all sales (Admin only)
router.get("/", verifyToken, getAllSales);

// 🏪 Get sales for a specific shop (Shop Owner / Admin)
router.get("/shop/:shopId", verifyToken, getSalesByShop);

// 📊 Get sales summary for a specific shop (Shop Owner / Admin)
router.get("/summary/:shopId", verifyToken, getSalesSummary);

// 🔍 Get a single sale by ID (Shop Owner / Admin)
router.get("/:id", verifyToken, getSaleById);

// ❌ Delete sale by ID (Shop Owner / Admin)
router.delete("/:id", verifyToken, deleteSale);

export default router;
