import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: {
    type: String,
    enum: ["admin", "shop_owner", "customer"],
    default: "customer",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
