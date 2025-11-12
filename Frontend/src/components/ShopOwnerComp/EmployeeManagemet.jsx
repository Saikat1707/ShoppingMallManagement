// src/components/ShopOwnerDashboard/EmployeeManagement/EmployeeManagement.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/EmployeeManagemet.css';

const EmployeeManagement = ({ activeShop }) => {
  const [employees, setEmployees] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Mock data
  const mockEmployees = [
    {
      id: 1,
      name: "John Doe",
      email: "john@smartsalon.com",
      phone: "+91 9876543210",
      role: "Stylist",
      salary: 25000,
      joinDate: "2024-01-01",
      status: "active",
      shop: "Smart Salon"
    }
  ];

  const addEmployee = (employeeData) => {
    // TODO: Implement API call
    // POST /api/employee
    console.log('Adding employee:', employeeData);
    const newEmployee = {
      ...employeeData,
      id: Date.now(),
      shop: activeShop?.name || 'Unknown Shop'
    };
    setEmployees([...employees, newEmployee]);
    setShowEmployeeForm(false);
  };

  const updateEmployee = (employeeId, employeeData) => {
    // TODO: Implement API call
    // PUT /api/employee/:id
    console.log('Updating employee:', employeeId, employeeData);
    setEmployees(employees.map(employee => 
      employee.id === employeeId ? { ...employee, ...employeeData } : employee
    ));
    setEditingEmployee(null);
  };

  const deleteEmployee = (employeeId) => {
    // TODO: Implement API call
    // DELETE /api/employee/:id
    console.log('Deleting employee:', employeeId);
    setEmployees(employees.filter(employee => employee.id !== employeeId));
  };

  const getEmployeesByShop = (shopId) => {
    // TODO: Implement API call
    // GET /api/employee/shop/:shopId
    console.log('Fetching employees for shop:', shopId);
    return mockEmployees;
  };

  return (
    <div className="employee-management">
      <div className="page-header">
        <h2>Employee Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowEmployeeForm(true)}
          disabled={!activeShop}
        >
          + Add Employee
        </button>
      </div>

      {!activeShop && (
        <div className="alert-banner">
          ⚠️ Please select an active shop to manage employees
        </div>
      )}

      {activeShop && (
        <>
          {showEmployeeForm && (
            <EmployeeForm
              onSubmit={addEmployee}
              onCancel={() => setShowEmployeeForm(false)}
            />
          )}

          {editingEmployee && (
            <EmployeeForm
              employee={editingEmployee}
              onSubmit={(data) => updateEmployee(editingEmployee.id, data)}
              onCancel={() => setEditingEmployee(null)}
            />
          )}

          <div className="employees-list">
            {employees.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h4>No Employees Added</h4>
                <p>Start building your team by adding employees.</p>
                <button 
                  className="btn-primary"
                  onClick={() => setShowEmployeeForm(true)}
                >
                  Add Your First Employee
                </button>
              </div>
            ) : (
              <div className="employees-table">
                <div className="table-header">
                  <span>Name</span>
                  <span>Role</span>
                  <span>Contact</span>
                  <span>Salary</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                {employees.map(employee => (
                  <div key={employee.id} className="table-row">
                    <span className="name-cell">
                      <div className="employee-avatar">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {employee.name}
                    </span>
                    <span className="role-cell">{employee.role}</span>
                    <span className="contact-cell">
                      <div>{employee.email}</div>
                      <div className="phone">{employee.phone}</div>
                    </span>
                    <span className="salary-cell">₹{employee.salary}</span>
                    <span className="status-cell">
                      <span className={`status-badge ${employee.status}`}>
                        {employee.status}
                      </span>
                    </span>
                    <span className="actions-cell">
                      <button 
                        onClick={() => setEditingEmployee(employee)}
                        className="btn-secondary btn-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteEmployee(employee.id)}
                        className="btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    role: employee?.role || '',
    salary: employee?.salary || '',
    joinDate: employee?.joinDate || '',
    status: employee?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      salary: parseFloat(formData.salary)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{employee ? 'Edit Employee' : 'Add New Employee'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Salary (₹)</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Join Date</label>
            <input
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {employee ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeManagement;