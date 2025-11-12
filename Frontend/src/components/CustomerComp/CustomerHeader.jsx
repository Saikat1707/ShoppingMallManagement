// src/components/CustomerDashboard/CustomerHeader/CustomerHeader.js
import React from 'react';
import '../../CSS/ComponentCSS/customerCompCss/CustomerHeader.css';

const CustomerHeader = ({ toggleSidebar }) => {
  return (
    <header className="customer-header">
      <div className="customer-header-left">
        <button className="customer-menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Customer Dashboard</h1>
      </div>
      
      <div className="customer-header-right">
        <div className="customer-notifications">
          <button className="customer-icon-btn">🔔</button>
          <span className="notification-badge">3</span>
        </div>
        <div className="customer-profile">
          <div className="customer-avatar">C</div>
          <div className="customer-profile-info">
            <span className="customer-name">John Customer</span>
            <span className="customer-role">Customer</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;