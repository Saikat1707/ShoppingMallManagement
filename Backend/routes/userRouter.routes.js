import express from "express";
import {
  signUp,
  login,
  getAllUsers,
  getUsersByRole,
  deleteUser,
  getProfile,
  updateProfile,
} from "../Controller/userController.js";
import { verifyToken } from "../middleware/authValidator.js";

const router = express.Router();

// ---------- AUTH ----------
router.post("/signup", signUp);
router.post("/login", login);

// ---------- USER ----------
router.get("/me", verifyToken, getProfile);
router.put("/me", verifyToken, updateProfile);

// ---------- ADMIN ----------
router.get("/admin/users", verifyToken, getAllUsers);
router.get("/admin/users/role/:role", verifyToken, getUsersByRole);
router.delete("/admin/users/:id", verifyToken, deleteUser);

export default router;
