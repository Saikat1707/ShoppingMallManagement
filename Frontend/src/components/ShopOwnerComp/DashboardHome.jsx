// src/components/ShopOwnerDashboard/DashboardHome/DashboardHome.js
import React from 'react';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/DashboardHome.css';

const DashboardHome = ({ activeShop }) => {
  const stats = [
    { label: 'Total Sales', value: '₹12,450', change: '+12%', icon: '💰' },
    { label: 'Active Products', value: '24', change: '+2', icon: '🛍️' },
    { label: 'Total Bookings', value: '18', change: '+5', icon: '📅' },
    { label: 'Employees', value: '6', change: '+1', icon: '👥' },
  ];

  const recentActivities = [
    { action: 'New sale recorded', time: '2 min ago', type: 'sale' },
    { action: 'Booking confirmed', time: '1 hour ago', type: 'booking' },
    { action: 'New product added', time: '3 hours ago', type: 'product' },
    { action: 'Offer created', time: '5 hours ago', type: 'offer' },
  ];

  return (
    <div className="dashboard-home">
      <div className="welcome-section">
        <h2>Welcome back, Shop Owner! 👋</h2>
        <p>Here's what's happening with your business today.</p>
      </div>

      {!activeShop && (
        <div className="alert-banner">
          <span>⚠️ No active shop selected. </span>
          <a href="/owner/shops">Set up your shop to get started</a>
        </div>
      )}

      <div className="owner-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
              <span className="stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'sale' && '💰'}
                  {activity.type === 'booking' && '📅'}
                  {activity.type === 'product' && '🛍️'}
                  {activity.type === 'offer' && '🎁'}
                </div>
                <div className="activity-details">
                  <p>{activity.action}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn">➕ Record Sale</button>
            <button className="action-btn">🛍️ Add Product</button>
            <button className="action-btn">🎁 Create Offer</button>
            <button className="action-btn">👥 Add Employee</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;