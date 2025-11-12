import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingsByCustomer,
  getBookingsByShop,
  changeStatus,
} from "../Controller/bookingController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/*
-------------------------------------------
📅 BOOKING ROUTES — Access Permissions
-------------------------------------------
🔹 Customer:
   - Create new booking for a shop
   - View own bookings (GET /customer/me)
   - Cancel own booking (DELETE /:id)

🔹 Shop Owner:
   - View all bookings for their shop (GET /shop/:shopId)
   - Update booking status (PATCH /:id/status)

🔹 Admin:
   - Can view all bookings
   - Can delete or update any booking
-------------------------------------------
*/

// 🧾 Create a new booking (Customer)
router.post("/", verifyToken, createBooking);

// 📋 Get all bookings (Admin only)
router.get("/", verifyToken, getAllBookings);

// 👤 Get all bookings by logged-in customer
router.get("/customer/me", verifyToken, getBookingsByCustomer);

// 🏪 Get bookings for a specific shop (Shop Owner / Admin)
router.get("/shop/:shopId", verifyToken, getBookingsByShop);

// 🔍 Get booking by ID (All authorized)
router.get("/:id", verifyToken, getBookingById);

// ✏️ Update booking (Admin / Customer if own)
router.put("/:id", verifyToken, updateBooking);

// ❌ Delete booking (Admin / Customer if own)
router.delete("/:id", verifyToken, deleteBooking);

// 🔄 Change booking status (Shop Owner / Admin)
router.patch("/:id/status", verifyToken, changeStatus);

export default router;
