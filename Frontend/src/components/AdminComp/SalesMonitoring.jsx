// src/components/AdminDashboard/SalesMonitoring/SalesMonitoring.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/adminCompCss/SalesMonitoring.css';

const SalesMonitoring = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedShop, setSelectedShop] = useState('all');

  // Mock data for sales
  const mockSales = [
    {
      id: 1,
      shopName: "Smart Salon",
      customer: "John Customer",
      amount: 450,
      product: "Haircut & Styling",
      paymentType: "card",
      date: "2024-01-20T10:30:00Z",
      status: "completed"
    },
    {
      id: 2,
      shopName: "Elite Barbers",
      customer: "Mike Smith",
      amount: 300,
      product: "Beard Trim",
      paymentType: "cash",
      date: "2024-01-20T09:15:00Z",
      status: "completed"
    },
    {
      id: 3,
      shopName: "Beauty Bliss",
      customer: "Sarah Wilson",
      amount: 600,
      product: "Manicure & Pedicure",
      paymentType: "upi",
      date: "2024-01-19T14:20:00Z",
      status: "completed"
    },
    {
      id: 4,
      shopName: "Smart Salon",
      customer: "David Brown",
      amount: 1200,
      product: "Hair Treatment Package",
      paymentType: "card",
      date: "2024-01-19T11:45:00Z",
      status: "completed"
    },
    {
      id: 5,
      shopName: "Relax Zone",
      customer: "Emma Johnson",
      amount: 800,
      product: "Full Body Massage",
      paymentType: "online",
      date: "2024-01-18T16:30:00Z",
      status: "completed"
    }
  ];

  // Mock data for sales summary
  const salesSummary = {
    totalRevenue: 284750,
    totalTransactions: 1247,
    averageSale: 320,
    growthRate: 18.5,
    topPerformingShop: "Smart Salon",
    revenueByCategory: {
      Salon: 154200,
      Barber: 89200,
      Spa: 41350
    }
  };

  const getAllSales = () => {
    // TODO: Implement API call
    // GET /api/sale
    console.log('Fetching all sales');
    return mockSales;
  };

  const getSalesSummary = (shopId) => {
    // TODO: Implement API call
    // GET /api/sale/summary/:shopId
    console.log('Fetching sales summary for shop:', shopId);
    return salesSummary;
  };

  const shops = ['all', 'Smart Salon', 'Elite Barbers', 'Beauty Bliss', 'Relax Zone', 'Style Studio'];

  const filteredSales = selectedShop === 'all' 
    ? mockSales 
    : mockSales.filter(sale => sale.shopName === selectedShop);

  const getPaymentTypeColor = (type) => {
    switch (type) {
      case 'card': return '#3b82f6';
      case 'cash': return '#10b981';
      case 'upi': return '#8b5cf6';
      case 'online': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="sales-monitoring">
      <div className="page-header">
        <h1>Sales Monitoring</h1>
        <p>Track sales performance across all shops</p>
      </div>

      <div className="monitoring-controls">
        <div className="control-group">
          <label>Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="control-select"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="control-group">
          <label>Shop Filter:</label>
          <select
            value={selectedShop}
            onChange={(e) => setSelectedShop(e.target.value)}
            className="control-select"
          >
            {shops.map(shop => (
              <option key={shop} value={shop}>
                {shop === 'all' ? 'All Shops' : shop}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="sales-overview">
        <div className="overview-cards">
          <div className="overview-card">
            <div className="overview-icon">💰</div>
            <div className="overview-info">
              <h3>₹{salesSummary.totalRevenue.toLocaleString()}</h3>
              <p>Total Revenue</p>
              <span className="growth positive">+{salesSummary.growthRate}%</span>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">📊</div>
            <div className="overview-info">
              <h3>{salesSummary.totalTransactions}</h3>
              <p>Total Transactions</p>
              <span className="growth positive">+12%</span>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">📈</div>
            <div className="overview-info">
              <h3>₹{salesSummary.averageSale}</h3>
              <p>Average Sale</p>
              <span className="growth positive">+8%</span>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">🏆</div>
            <div className="overview-info">
              <h3>{salesSummary.topPerformingShop}</h3>
              <p>Top Performing Shop</p>
              <span className="growth">Leading</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sales-content">
        <div className="revenue-breakdown">
          <div className="section-header">
            <h2>Revenue by Category</h2>
          </div>
          <div className="breakdown-chart">
            {Object.entries(salesSummary.revenueByCategory).map(([category, revenue]) => (
              <div key={category} className="breakdown-item">
                <div className="breakdown-info">
                  <span className="category-name">{category}</span>
                  <span className="category-revenue">₹{revenue.toLocaleString()}</span>
                </div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill"
                    style={{ 
                      width: `${(revenue / salesSummary.totalRevenue) * 100}%`,
                      backgroundColor: getCategoryColor(category)
                    }}
                  ></div>
                </div>
                <span className="breakdown-percentage">
                  {((revenue / salesSummary.totalRevenue) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-sales">
          <div className="section-header">
            <h2>Recent Sales</h2>
            <span className="section-badge">{filteredSales.length} transactions</span>
          </div>
          <div className="sales-list">
            {filteredSales.map(sale => (
              <div key={sale.id} className="sale-item">
                <div className="sale-info">
                  <div className="sale-shop">{sale.shopName}</div>
                  <div className="sale-details">
                    <span className="sale-product">{sale.product}</span>
                    <span className="sale-customer">for {sale.customer}</span>
                  </div>
                  <div className="sale-meta">
                    <span className="sale-date">
                      {new Date(sale.date).toLocaleDateString()} at {new Date(sale.date).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="sale-amount">
                  <div className="amount">₹{sale.amount}</div>
                  <span 
                    className="payment-type"
                    style={{ backgroundColor: getPaymentTypeColor(sale.paymentType) }}
                  >
                    {sale.paymentType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'Salon': return '#3b82f6';
    case 'Barber': return '#8b5cf6';
    case 'Spa': return '#ec4899';
    default: return '#6b7280';
  }
};

export default SalesMonitoring;