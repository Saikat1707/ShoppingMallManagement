// src/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ShopOwnerDashBoard from './pages/ShopOwnerDashBoard';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDash';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/owner/*" element={<ShopOwnerDashBoard />} />
        <Route path="/customer/*" element={<CustomerDashboard/>} />
        <Route path="/admin/*" element={<AdminDashboard/>} />
        <Route path="/" element={<Navigate to="/customer" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;