import userDAO from "../DAO/userDao.js";
import { comparePassword, hashThePassword } from "../service/hashedPassword.js";
import { generateToken } from "../service/tokenService.js";
import { options } from "../service/cookieOptions.js";

// ---------------- AUTH SECTION ----------------
export const signUp = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // check existing user
    const existingUser = await userDAO.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await hashThePassword(password);

    // create new user
    const newUser = await userDAO.createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userDAO.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = await generateToken(user._id, user.role);
    res.cookie("token", token, options());

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- ADMIN ONLY ----------------
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }
    const users = await userDAO.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsersByRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }
    const { role } = req.params;
    const users = await userDAO.getUsersByRole(role);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const deleted = await userDAO.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- USER SELF-UPDATE ----------------
export const getProfile = async (req, res) => {
  try {
    const user = await userDAO.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updateData = req.body;
    const user = await userDAO.updateUser(req.user.id, updateData);
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
