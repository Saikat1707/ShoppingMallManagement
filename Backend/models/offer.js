import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  title: { type: String, required: true },
  description: { type: String },
  discountPercent: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
});

export default mongoose.model("Offer", offerSchema);
