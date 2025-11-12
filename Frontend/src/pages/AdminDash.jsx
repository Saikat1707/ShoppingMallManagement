// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/AdminComp/AdminSidebar';
import AdminHeader from '../components/AdminComp/AdminHeader';
import AdminHome from '../components/AdminComp/AdminHome';
import UserManagement from '../components/AdminComp/UserManagement';
import ShopManagement from '../components/AdminComp/ShopManagement';
import SalesMonitoring from '../components/AdminComp/SalesMonitoring';
import BookingOversight from '../components/AdminComp/BookingOversight';
import "../CSS/PageCSS/AdminDash.css";

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar}
      />
      <div className={`admin-main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <AdminHeader toggleSidebar={toggleSidebar} />
        <div className="admin-content-area">
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="shops" element={<ShopManagement />} />
            <Route path="sales" element={<SalesMonitoring />} />
            <Route path="bookings" element={<BookingOversight />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;