// src/components/ShopOwnerDashboard/Header/Header.js
import React from 'react';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Shop Owner Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="notifications">
          <button className="icon-btn">🔔</button>
        </div>
        <div className="user-profile">
          <div className="user-avatar">SO</div>
          <span className="user-name">Shop Owner</span>
        </div>
      </div>
    </header>
  );
};

export default Header;