import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Fashion, Electronics
  floor: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String },
  contactNumber: { type: String },
  openTime: { type: String, default: "10:00 AM" },
  closeTime: { type: String, default: "9:00 PM" },
  status: {
    type: String,
    enum: ["active", "inactive", "pending_approval"],
    default: "pending_approval",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Shop", shopSchema);
