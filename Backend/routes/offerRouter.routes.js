import express from "express";
import {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  getOffersByShop,
  changeStatus,
} from "../Controller/offerController.js";
import { verifyToken } from "../middleware/authValidator.js";

const router = express.Router();

/*
-------------------------------------------------
🎁 OFFER ROUTES — Access Permissions Summary
-------------------------------------------------
🔹 Admin:
   - Can view all offers
   - Can create, update, delete any offer
   - Can change offer status (activate/deactivate)
   - Can view offers for any shop

🔹 Shop Owner:
   - Can create, update, delete offers for *their* shop
   - Can view offers for *their* shop
   - Can toggle active/inactive status

🔹 Customer:
   - Can view *active* offers only (public route)
-------------------------------------------------
*/

// 🌍 Public route — get only active offers for customers
router.get("/public", async (req, res) => {
  try {
    const offers = await import("../models/offer.js").then(({ default: Offer }) =>
      Offer.find({ active: true }).populate("shop")
    );
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🆕 Create an offer (Shop Owner / Admin)
router.post("/", verifyToken, createOffer);

// 📋 Get all offers (Admin)
router.get("/", verifyToken, getAllOffers);

// 🏬 Get offers by shop (Shop Owner / Admin)
router.get("/shop/:shopId", verifyToken, getOffersByShop);

// 🔍 Get a single offer (Shop Owner / Admin)
router.get("/:id", verifyToken, getOfferById);

// ✏️ Update offer (Shop Owner / Admin)
router.put("/:id", verifyToken, updateOffer);

// ❌ Delete offer (Shop Owner / Admin)
router.delete("/:id", verifyToken, deleteOffer);

// 🔄 Change offer active status (Shop Owner / Admin)
router.patch("/:id/status", verifyToken, changeStatus);

export default router;
