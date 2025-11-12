// src/components/ShopOwnerDashboard/SalesManagement/SalesManagement.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/SalesManagement.css';

const SalesManagement = ({ activeShop }) => {
  const [sales, setSales] = useState([]);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  // Mock data
  const mockSales = [
    {
      id: 1,
      shop: "Smart Salon",
      amount: 250,
      product: "Haircut",
      paymentType: "cash",
      date: "2024-01-20T10:30:00Z"
    }
  ];

  const recordSale = (saleData) => {
    // TODO: Implement API call
    // POST /api/sale
    console.log('Recording sale:', saleData);
    const newSale = {
      ...saleData,
      id: Date.now(),
      date: new Date().toISOString(),
      shop: activeShop?.name || 'Unknown Shop'
    };
    setSales([...sales, newSale]);
    setShowSaleForm(false);
  };

  const deleteSale = (saleId) => {
    // TODO: Implement API call
    // DELETE /api/sale/:id
    console.log('Deleting sale:', saleId);
    setSales(sales.filter(sale => sale.id !== saleId));
  };

  const getSalesByShop = (shopId) => {
    // TODO: Implement API call
    // GET /api/sale/shop/:shopId
    console.log('Fetching sales for shop:', shopId);
    return mockSales;
  };

  const getSalesSummary = (shopId) => {
    // TODO: Implement API call
    // GET /api/sale/summary/:shopId
    console.log('Fetching sales summary for shop:', shopId);
    return {
      totalSales: 12450,
      todaySales: 1250,
      averageSale: 320,
      topProduct: "Haircut"
    };
  };

  const summary = getSalesSummary(activeShop?.id);

  return (
    <div className="sales-management">
      <div className="page-header">
        <h2>Sales Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowSaleForm(true)}
          disabled={!activeShop}
        >
          + Record Sale
        </button>
      </div>

      {!activeShop && (
        <div className="alert-banner">
          ⚠️ Please select an active shop to manage sales
        </div>
      )}

      {activeShop && (
        <>
          <div className="sales-summary">
            <h3>Sales Overview</h3>
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-icon">💰</div>
                <div className="summary-info">
                  <h4>₹{summary.totalSales}</h4>
                  <p>Total Sales</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📈</div>
                <div className="summary-info">
                  <h4>₹{summary.todaySales}</h4>
                  <p>Today's Sales</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📊</div>
                <div className="summary-info">
                  <h4>₹{summary.averageSale}</h4>
                  <p>Average Sale</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">🏆</div>
                <div className="summary-info">
                  <h4>{summary.topProduct}</h4>
                  <p>Top Product</p>
                </div>
              </div>
            </div>
          </div>

          {showSaleForm && (
            <SaleForm
              onSubmit={recordSale}
              onCancel={() => setShowSaleForm(false)}
              shopId={activeShop.id}
            />
          )}

          <div className="sales-list">
            <h3>Recent Sales</h3>
            {sales.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🧾</div>
                <h4>No Sales Recorded</h4>
                <p>Start recording your sales to see them here.</p>
              </div>
            ) : (
              <div className="sales-table">
                <div className="table-header">
                  <span>Product</span>
                  <span>Amount</span>
                  <span>Payment</span>
                  <span>Date</span>
                  <span>Actions</span>
                </div>
                {sales.map(sale => (
                  <div key={sale.id} className="table-row">
                    <span className="product-cell">{sale.product}</span>
                    <span className="amount-cell">₹{sale.amount}</span>
                    <span className={`payment-cell ${sale.paymentType}`}>
                      {sale.paymentType}
                    </span>
                    <span className="date-cell">
                      {new Date(sale.date).toLocaleDateString()}
                    </span>
                    <span className="actions-cell">
                      <button 
                        className="btn-danger btn-sm"
                        onClick={() => deleteSale(sale.id)}
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const SaleForm = ({ onSubmit, onCancel, shopId }) => {
  const [formData, setFormData] = useState({
    shop: shopId,
    amount: '',
    product: '',
    paymentType: 'cash'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Record New Sale</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product/Service</label>
            <input
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({...formData, product: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Payment Type</label>
            <select
              value={formData.paymentType}
              onChange={(e) => setFormData({...formData, paymentType: e.target.value})}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="online">Online</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Record Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesManagement;