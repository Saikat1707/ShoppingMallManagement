import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String },
  purpose: { type: String },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
});

export default mongoose.model("Booking", bookingSchema);
