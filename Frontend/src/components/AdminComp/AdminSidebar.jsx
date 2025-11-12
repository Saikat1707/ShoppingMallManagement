// src/components/AdminDashboard/AdminSidebar/AdminSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../CSS/ComponentCSS/adminCompCss/AdminSidebar.css';

const AdminSidebar = ({ collapsed, toggleSidebar }) => {
  const menuItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard', exact: true },
    { path: '/admin/users', icon: '👥', label: 'User Management' },
    { path: '/admin/shops', icon: '🏪', label: 'Shop Management' },
    { path: '/admin/sales', icon: '💰', label: 'Sales Monitoring' },
    { path: '/admin/bookings', icon: '📅', label: 'Booking Oversight' },
  ];

  return (
    <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header">
        {!collapsed && <h2>Admin Panel</h2>}
        <button className="admin-toggle-btn" onClick={toggleSidebar}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="admin-sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `admin-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="admin-nav-icon">{item.icon}</span>
            {!collapsed && <span className="admin-nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      
      {!collapsed && (
        <div className="admin-sidebar-footer">
          <div className="admin-welcome">
            <span>Administrator</span>
            <strong>System Admin</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;