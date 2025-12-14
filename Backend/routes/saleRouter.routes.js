import express from "express";
import {
  createSale,
  getAllSales,
  getSalesByShop,
  getSaleById,
  deleteSale,
  getSalesSummary,
} from "../Controller/saleController.js";
import { verifyToken } from "../middleware/authValidator.js";

const router = express.Router();

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
