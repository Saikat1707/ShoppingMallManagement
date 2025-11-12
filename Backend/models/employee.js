import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., cashier, salesperson
  contactNumber: { type: String },
  salary: { type: Number },
  joinDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export default mongoose.model("Employee", employeeSchema);
