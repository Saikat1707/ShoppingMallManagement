// src/components/AdminDashboard/AdminHeader/AdminHeader.js
import React from 'react';
import '../../CSS/ComponentCSS/adminCompCss/AdminHeader.css';

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Admin Dashboard</h1>
      </div>
      
      <div className="admin-header-right">
        <div className="admin-notifications">
          <button className="admin-icon-btn">🔔</button>
          <span className="admin-notification-badge">5</span>
        </div>
        <div className="admin-profile">
          <div className="admin-avatar">A</div>
          <div className="admin-profile-info">
            <span className="admin-name">System Administrator</span>
            <span className="admin-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;