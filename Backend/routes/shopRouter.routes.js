import express from "express";
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
  getShopsByOwner,
  changeStatus,
  getActiveShops
} from "../Controller/shopController.js";

import { verifyToken } from "../middleware/authValidator.js"; // assumes JWT auth

const router = express.Router();

// 🏪 Public routes
router.get("/public", getActiveShops);        // View all active shops
router.get("/:id", getShopById);              // View one shop by ID

// 🔒 Protected routes
router.post("/", verifyToken, createShop);                 // Create new shop
router.get("/", verifyToken, getAllShops);                 // Admin: get all shops
router.get("/owner/me", verifyToken, getShopsByOwner);// Shop Owner: view their shops
router.put("/:id", verifyToken, updateShop);               // Owner/Admin: update
router.delete("/:id", verifyToken, deleteShop);            // Admin: delete
router.patch("/:id/status", verifyToken, changeStatus);    // Admin: change status

export default router;
