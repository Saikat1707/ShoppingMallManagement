// src/components/CustomerDashboard/CustomerSidebar/CustomerSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../CSS/ComponentCSS/customerCompCss/CustomerSidebar.css';

const CustomerSidebar = ({ collapsed, toggleSidebar }) => {
  const menuItems = [
    { path: '/customer', icon: '🏠', label: 'Home', exact: true },
    { path: '/customer/shops', icon: '🏪', label: 'Browse Shops' },
    { path: '/customer/bookings', icon: '📅', label: 'My Bookings' },
  ];

  return (
    <div className={`customer-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="customer-sidebar-header">
        {!collapsed && <h2>Customer Hub</h2>}
        <button className="customer-toggle-btn" onClick={toggleSidebar}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="customer-sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `customer-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="customer-nav-icon">{item.icon}</span>
            {!collapsed && <span className="customer-nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      
      {!collapsed && (
        <div className="customer-sidebar-footer">
          <div className="customer-welcome">
            <span>Welcome back!</span>
            <strong>Customer</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSidebar;