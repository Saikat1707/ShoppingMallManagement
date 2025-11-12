// src/components/AdminDashboard/UserManagement/UserManagement.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/adminCompCss/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data for users
  const mockUsers = [
    {
      id: 1,
      name: "John Customer",
      email: "john@example.com",
      phone: "+91 9876543210",
      role: "customer",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20T10:30:00Z",
      shop: null
    },
    {
      id: 2,
      name: "Alice Owner",
      email: "alice@smartsalon.com",
      phone: "+91 9876543211",
      role: "owner",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-20T09:15:00Z",
      shop: "Smart Salon"
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+91 9876543212",
      role: "customer",
      status: "inactive",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-18T14:20:00Z",
      shop: null
    },
    {
      id: 4,
      name: "Carol Johnson",
      email: "carol@beautybliss.com",
      phone: "+91 9876543213",
      role: "owner",
      status: "active",
      joinDate: "2024-01-12",
      lastLogin: "2024-01-20T11:45:00Z",
      shop: "Beauty Bliss"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+91 9876543214",
      role: "customer",
      status: "active",
      joinDate: "2024-01-08",
      lastLogin: "2024-01-19T16:30:00Z",
      shop: null
    }
  ];

  const getAllUsers = () => {
    // TODO: Implement API call
    // GET /api/user
    console.log('Fetching all users');
    return mockUsers;
  };

  const deleteUser = (userId) => {
    // TODO: Implement API call
    // DELETE /api/user/:id
    console.log('Deleting user:', userId);
    setUsers(users.filter(user => user.id !== userId));
    alert('User deleted successfully!');
  };

  const changeUserRole = (userId, newRole) => {
    // TODO: Implement API call
    // PATCH /api/user/:id/role
    console.log('Changing user role:', userId, newRole);
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    alert('User role updated successfully!');
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'owner': return '#f59e0b';
      case 'customer': return '#3b82f6';
      case 'admin': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'active' ? '#10b981' : '#6b7280';
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage all users and their roles in the system</p>
      </div>

      <div className="management-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="owner">Shop Owners</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <div className="table-header">
          <div className="table-row header-row">
            <div className="table-cell">User</div>
            <div className="table-cell">Contact</div>
            <div className="table-cell">Role</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Last Login</div>
            <div className="table-cell">Actions</div>
          </div>
        </div>

        <div className="table-body">
          {filteredUsers.length === 0 ? (
            <div className="no-data">
              <div className="no-data-icon">👥</div>
              <h3>No users found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="table-row">
                <div className="table-cell user-info">
                  <div className="user-avatar">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-join-date">
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="table-cell contact-info">
                  <div>{user.phone}</div>
                  {user.shop && <div className="user-shop">🏪 {user.shop}</div>}
                </div>

                <div className="table-cell">
                  <span 
                    className="role-badge"
                    style={{ backgroundColor: getRoleBadgeColor(user.role) }}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="table-cell">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusBadgeColor(user.status) }}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="table-cell">
                  {new Date(user.lastLogin).toLocaleDateString()}
                </div>

                <div className="table-cell actions">
                  <div className="action-buttons">
                    <select
                      value={user.role}
                      onChange={(e) => changeUserRole(user.id, e.target.value)}
                      className="role-select"
                      style={{ borderColor: getRoleBadgeColor(user.role) }}
                    >
                      <option value="customer">Customer</option>
                      <option value="owner">Shop Owner</option>
                    </select>
                    <button 
                      className="btn-danger btn-sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="table-footer">
        <div className="table-stats">
          Showing {filteredUsers.length} of {mockUsers.length} users
        </div>
      </div>
    </div>
  );
};

export default UserManagement;