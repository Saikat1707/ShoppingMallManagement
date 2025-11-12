import saleDAO from "../DAO/saleDao.js";

// ✅ Create a new sale
export const createSale = async (req, res) => {
  try {
    const saleData = { ...req.body, ownerId: req.user.id };
    const sale = await saleDAO.createSale(saleData);
    res.status(201).json({ message: "Sale recorded successfully", sale });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all sales (Admin only)
export const getAllSales = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }
    const sales = await saleDAO.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get sales by shop (Shop owner or Admin)
export const getSalesByShop = async (req, res) => {
  try {
    const sales = await saleDAO.getSalesByShop(req.params.shopId, req.user.id);
    res.status(200).json(sales);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// ✅ Get single sale by ID
export const getSaleById = async (req, res) => {
  try {
    const sale = await saleDAO.getSaleById(req.params.id, req.user.id);
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ✅ Delete sale
export const deleteSale = async (req, res) => {
  try {
    await saleDAO.deleteSale(req.params.id, req.user.id);
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// ✅ Get sales summary
export const getSalesSummary = async (req, res) => {
  try {
    const summary = await saleDAO.getSalesSummary(req.params.shopId, req.user.id);
    res.status(200).json(summary);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
