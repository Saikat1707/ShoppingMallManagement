import productDAO from "../DAO/productDao.js";

export const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body, ownerId: req.user.id };
    const product = await productDAO.createProduct(productData);
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "Access denied: Admin only" });
    // }
    const products = await productDAO.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByShop = async (req, res) => {
  try {
    const products = await productDAO.getProductsByShop(req.params.shopId, req.user.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productDAO.getProductById(req.params.id, req.user.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productDAO.updateProduct(req.params.id, req.body, req.user.id);
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productDAO.deleteProduct(req.params.id, req.user.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const product = await productDAO.toggleAvailability(req.params.id, req.user.id);
    res.status(200).json({
      message: `Product availability changed to ${product.isAvailable ? "Available" : "Unavailable"}`,
      product,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
