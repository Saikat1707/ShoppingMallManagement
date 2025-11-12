import employeeDAO from "../DAO/employeeDao.js";

export const createEmployee = async (req, res) => {
  try {
    const employeeData = { ...req.body, shop: req.body.shop || req.user.shop };
    const employee = await employeeDAO.createEmployee(employeeData);
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeDAO.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeDAO.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await employeeDAO.updateEmployee(req.params.id, req.body);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await employeeDAO.deleteEmployee(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeesByShop = async (req, res) => {
  try {
    const employees = await employeeDAO.getEmployeesByShop(req.params.shopId);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const employee = await employeeDAO.changeStatus(req.params.id, status);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: `Employee status changed to ${status}`, employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
