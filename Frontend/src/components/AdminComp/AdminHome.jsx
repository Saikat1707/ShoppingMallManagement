// src/components/AdminDashboard/AdminHome/AdminHome.js
import React from 'react';
import '../../CSS/ComponentCSS/adminCompCss/AdminHome.css';

const AdminHome = () => {
  // Mock data for system overview
  const systemStats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: '👥', color: '#3b82f6' },
    { label: 'Active Shops', value: '89', change: '+5', icon: '🏪', color: '#10b981' },
    { label: 'Total Sales', value: '₹2,84,750', change: '+18%', icon: '💰', color: '#f59e0b' },
    { label: 'Pending Bookings', value: '23', change: '-3', icon: '📅', color: '#ef4444' },
  ];

  const recentActivities = [
    { action: 'New shop registration - "Beauty Palace"', time: '2 min ago', type: 'shop' },
    { action: 'User role changed - John Doe to Shop Owner', time: '15 min ago', type: 'user' },
    { action: 'Shop status updated - "Smart Salon" to inactive', time: '1 hour ago', type: 'shop' },
    { action: 'High value sale recorded - ₹2,500', time: '2 hours ago', type: 'sale' },
    { action: 'Booking cancelled by customer', time: '3 hours ago', type: 'booking' },
  ];

  const topShops = [
    { name: 'Smart Salon', revenue: '₹84,500', bookings: 127, rating: 4.8 },
    { name: 'Elite Barbers', revenue: '₹67,200', bookings: 89, rating: 4.9 },
    { name: 'Beauty Bliss', revenue: '₹58,900', bookings: 156, rating: 4.7 },
    { name: 'Relax Zone', revenue: '₹45,300', bookings: 94, rating: 4.6 },
  ];

  return (
    <div className="admin-home">
      <div className="admin-welcome-banner">
        <div className="admin-welcome-content">
          <h1>Welcome, Administrator! 🛡️</h1>
          <p>Monitor and manage the entire platform from your dashboard.</p>
        </div>
        <div className="admin-welcome-graphic">
          <div className="admin-graphic-icon">⚡</div>
        </div>
      </div>

      <div className="system-stats-grid">
        {systemStats.map((stat, index) => (
          <div key={index} className="system-stat-card">
            <div className="stat-icon-container" style={{ backgroundColor: `${stat.color}20` }}>
              <span className="stat-icon" style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
              <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-content-grid">
        <div className="recent-activities-section">
          <div className="section-header">
            <h2>Recent Activities</h2>
            <span className="section-badge">Live</span>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'shop' && '🏪'}
                  {activity.type === 'user' && '👥'}
                  {activity.type === 'sale' && '💰'}
                  {activity.type === 'booking' && '📅'}
                </div>
                <div className="activity-details">
                  <p>{activity.action}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="top-shops-section">
          <div className="section-header">
            <h2>Top Performing Shops</h2>
            <span className="section-badge">This Month</span>
          </div>
          <div className="shops-list">
            {topShops.map((shop, index) => (
              <div key={index} className="shop-rank-item">
                <div className="shop-rank">#{index + 1}</div>
                <div className="shop-info">
                  <h4>{shop.name}</h4>
                  <div className="shop-stats">
                    <span>⭐ {shop.rating}</span>
                    <span>📅 {shop.bookings} bookings</span>
                  </div>
                </div>
                <div className="shop-revenue">{shop.revenue}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions-grid">
            <button className="quick-action-btn">
              <span className="action-icon">👥</span>
              <span>Manage Users</span>
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">🏪</span>
              <span>Shop Approval</span>
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">💰</span>
              <span>Sales Report</span>
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">📊</span>
              <span>Analytics</span>
            </button>
          </div>
        </div>

        <div className="system-health-section">
          <div className="section-header">
            <h2>System Health</h2>
          </div>
          <div className="health-stats">
            <div className="health-stat">
              <span className="health-label">API Response Time</span>
              <div className="health-bar">
                <div className="health-fill" style={{ width: '95%' }}></div>
              </div>
              <span className="health-value">95%</span>
            </div>
            <div className="health-stat">
              <span className="health-label">Server Uptime</span>
              <div className="health-bar">
                <div className="health-fill" style={{ width: '99.9%' }}></div>
              </div>
              <span className="health-value">99.9%</span>
            </div>
            <div className="health-stat">
              <span className="health-label">Database Performance</span>
              <div className="health-bar">
                <div className="health-fill" style={{ width: '98%' }}></div>
              </div>
              <span className="health-value">98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;