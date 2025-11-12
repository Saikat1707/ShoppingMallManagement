// src/pages/ShopOwnerDashBoard.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/ShopOwnerComp/Sidebar';
import Header from '../components/ShopOwnerComp/Header';
import DashboardHome from '../components/ShopOwnerComp/DashboardHome';
import ShopManagement from '../components/ShopOwnerComp/ShopManagement';
import SalesManagement from '../components/ShopOwnerComp/SalesManagement';
import ProductManagement from '../components/ShopOwnerComp/ProductManagement';
import OfferManagement from '../components/ShopOwnerComp/OfferManagement';
import EmployeeManagement from '../components/ShopOwnerComp/EmployeeManagemet';
import BookingManagement from '../components/ShopOwnerComp/BookingManagement';
import '../CSS/PageCSS/ShopOwnerDash.css';

const ShopOwnerDashBoard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeShop, setActiveShop] = useState(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="shop-owner-dashboard">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar}
        activeShop={activeShop}
      />
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="content-area">
          <Routes>
            <Route index element={<DashboardHome activeShop={activeShop} />} />
            <Route path="shops" element={<ShopManagement setActiveShop={setActiveShop} />} />
            <Route path="sales" element={<SalesManagement activeShop={activeShop} />} />
            <Route path="products" element={<ProductManagement activeShop={activeShop} />} />
            <Route path="offers" element={<OfferManagement activeShop={activeShop} />} />
            <Route path="employees" element={<EmployeeManagement activeShop={activeShop} />} />
            <Route path="bookings" element={<BookingManagement activeShop={activeShop} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashBoard;