import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByShop,
  changeStatus,
} from "../Controller/employeeController.js";
import { verifyToken } from "../middleware/authValidator.js";

const router = express.Router();

/*
-------------------------------------------------
👨‍💼 EMPLOYEE ROUTES — Access Permissions Summary
-------------------------------------------------
🔹 Admin:
   - Can view all employees
   - Can create, update, delete any employee
   - Can change employee status
   - Can view employees of any shop

🔹 Shop Owner:
   - Can create employees for *their own* shop
   - Can view/update/delete employees *in their shop*
   - Can change employee status (active/inactive)

🔹 Employee:
   - Can view their own profile details
-------------------------------------------------
*/

// 🧑‍💻 Create an employee (Shop Owner / Admin)
router.post("/", verifyToken, createEmployee);

// 📋 Get all employees (Admin only)
router.get("/", verifyToken, getAllEmployees);

// 🏪 Get all employees for a specific shop (Shop Owner / Admin)
router.get("/shop/:shopId", verifyToken, getEmployeesByShop);

// 🔍 Get single employee by ID (Admin / Shop Owner / Self)
router.get("/:id", verifyToken, getEmployeeById);

// ✏️ Update employee info (Shop Owner / Admin)
router.put("/:id", verifyToken, updateEmployee);

// ❌ Delete employee (Shop Owner / Admin)
router.delete("/:id", verifyToken, deleteEmployee);

// 🔄 Change employee status (Shop Owner / Admin)
router.patch("/:id/status", verifyToken, changeStatus);

export default router;
