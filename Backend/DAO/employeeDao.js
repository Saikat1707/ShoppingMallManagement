import Employee from "../models/employee.js";

const employeeDAO = {
  async createEmployee(data) {
    return await Employee.create(data);
  },

  async getAllEmployees() {
    return await Employee.find().populate("shop");
  },

  async getEmployeeById(id) {
    return await Employee.findById(id).populate("shop");
  },

  async updateEmployee(id, data) {
    return await Employee.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteEmployee(id) {
    return await Employee.findByIdAndDelete(id);
  },

  async getEmployeesByShop(shopId) {
    return await Employee.find({ shop: shopId });
  },

  async changeStatus(id, status) {
    return await Employee.findByIdAndUpdate(id, { status }, { new: true });
  },
};

export default employeeDAO;
