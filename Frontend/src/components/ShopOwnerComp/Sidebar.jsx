// src/components/ShopOwnerDashboard/Sidebar/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/Sidebar.css';

const Sidebar = ({ collapsed, toggleSidebar, activeShop }) => {
  const menuItems = [
    { path: '/owner', icon: '📊', label: 'Dashboard', exact: true },
    { path: '/owner/shops', icon: '🏪', label: 'Shop Management' },
    { path: '/owner/sales', icon: '🧾', label: 'Sales' },
    { path: '/owner/products', icon: '🛍️', label: 'Products' },
    { path: '/owner/offers', icon: '🎁', label: 'Offers' },
    { path: '/owner/employees', icon: '👥', label: 'Employees' },
    { path: '/owner/bookings', icon: '📅', label: 'Bookings' },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Business Hub</h2>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      
      {activeShop && !collapsed && (
        <div className="active-shop-info">
          <div className="shop-badge">
            <strong>{activeShop.name}</strong>
            <span className="shop-status">{activeShop.status}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;