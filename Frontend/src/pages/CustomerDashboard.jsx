// src/pages/CustomerDashboard.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerSidebar from '../components/CustomerComp/CustomerSidebar';
import CustomerHeader from '../components/CustomerComp/CustomerHeader';
import CustomerHome from '../components/CustomerComp/CustomerHome';
import ShopBrowser from '../components/CustomerComp/ShopBrowser';
import MyBookings from '../components/CustomerComp/MyBookings';
import "../CSS/PageCSS/CustomerDash.css";

const CustomerDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="customer-dashboard">
      <CustomerSidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar}
      />
      <div className={`customer-main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <CustomerHeader toggleSidebar={toggleSidebar} />
        <div className="customer-content-area">
          <Routes>
            <Route index element={<CustomerHome />} />
            <Route path="shops" element={<ShopBrowser />} />
            <Route path="bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;