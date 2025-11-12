// src/components/AdminDashboard/ShopManagement/ShopManagement.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/adminCompCss/ShopManagement.css';

const ShopManagement = () => {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShop, setSelectedShop] = useState(null);

  // Mock data for shops
  const mockShops = [
    {
      id: 1,
      name: "Smart Salon",
      owner: "Alice Owner",
      category: "Salon",
      location: "Egra City Center",
      status: "active",
      rating: 4.8,
      totalSales: 84500,
      totalBookings: 127,
      registrationDate: "2024-01-10",
      contact: "+91 9876543210",
      email: "alice@smartsalon.com"
    },
    {
      id: 2,
      name: "Elite Barbers",
      owner: "Mike Johnson",
      category: "Barber",
      location: "Downtown Egra",
      status: "active",
      rating: 4.9,
      totalSales: 67200,
      totalBookings: 89,
      registrationDate: "2024-01-12",
      contact: "+91 9876543211",
      email: "mike@elitebarbers.com"
    },
    {
      id: 3,
      name: "Beauty Bliss",
      owner: "Carol Johnson",
      category: "Spa",
      location: "Mall Road",
      status: "inactive",
      rating: 4.7,
      totalSales: 58900,
      totalBookings: 156,
      registrationDate: "2024-01-08",
      contact: "+91 9876543212",
      email: "carol@beautybliss.com"
    },
    {
      id: 4,
      name: "Relax Zone",
      owner: "David Brown",
      category: "Spa",
      location: "Lake View Road",
      status: "pending",
      rating: 4.6,
      totalSales: 45300,
      totalBookings: 94,
      registrationDate: "2024-01-15",
      contact: "+91 9876543213",
      email: "david@relaxzone.com"
    },
    {
      id: 5,
      name: "Style Studio",
      owner: "Emma Wilson",
      category: "Salon",
      location: "Market Street",
      status: "active",
      rating: 4.5,
      totalSales: 38900,
      totalBookings: 78,
      registrationDate: "2024-01-05",
      contact: "+91 9876543214",
      email: "emma@stylestudio.com"
    }
  ];

  const getAllShops = () => {
    // TODO: Implement API call
    // GET /api/shop
    console.log('Fetching all shops');
    return mockShops;
  };

  const deleteShop = (shopId) => {
    // TODO: Implement API call
    // DELETE /api/shop/:id
    console.log('Deleting shop:', shopId);
    setShops(shops.filter(shop => shop.id !== shopId));
    alert('Shop deleted successfully!');
  };

  const changeShopStatus = (shopId, newStatus) => {
    // TODO: Implement API call
    // PATCH /api/shop/:id/status
    console.log('Changing shop status:', shopId, newStatus);
    setShops(shops.map(shop => 
      shop.id === shopId ? { ...shop, status: newStatus } : shop
    ));
    alert('Shop status updated successfully!');
  };

  const filteredShops = mockShops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Salon': return '#3b82f6';
      case 'Barber': return '#8b5cf6';
      case 'Spa': return '#ec4899';
      default: return '#6b7280';
    }
  };

  return (
    <div className="shop-management-admin">
      <div className="page-header">
        <h1>Shop Management</h1>
        <p>Manage all shops and their status in the system</p>
      </div>

      <div className="management-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search shops by name, owner, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="shops-grid">
        {filteredShops.length === 0 ? (
          <div className="no-data">
            <div className="no-data-icon">🏪</div>
            <h3>No shops found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredShops.map(shop => (
            <ShopCard 
              key={shop.id}
              shop={shop}
              onDelete={deleteShop}
              onChangeStatus={changeShopStatus}
              getStatusColor={getStatusColor}
              getCategoryColor={getCategoryColor}
            />
          ))
        )}
      </div>

      <div className="table-footer">
        <div className="table-stats">
          Showing {filteredShops.length} of {mockShops.length} shops
        </div>
      </div>
    </div>
  );
};

const ShopCard = ({ shop, onDelete, onChangeStatus, getStatusColor, getCategoryColor }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="shop-card-admin">
      <div className="shop-card-header">
        <div className="shop-basic-info">
          <h3>{shop.name}</h3>
          <div className="shop-meta">
            <span 
              className="category-badge"
              style={{ backgroundColor: getCategoryColor(shop.category) }}
            >
              {shop.category}
            </span>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(shop.status) }}
            >
              {shop.status}
            </span>
          </div>
        </div>
        <div className="shop-rating">
          ⭐ {shop.rating}
        </div>
      </div>

      <div className="shop-details">
        <div className="detail-row">
          <span className="label">Owner:</span>
          <span className="value">{shop.owner}</span>
        </div>
        <div className="detail-row">
          <span className="label">Location:</span>
          <span className="value">{shop.location}</span>
        </div>
        <div className="detail-row">
          <span className="label">Contact:</span>
          <span className="value">{shop.contact}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{shop.email}</span>
        </div>
        <div className="detail-row">
          <span className="label">Registered:</span>
          <span className="value">{new Date(shop.registrationDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="shop-stats">
        <div className="stat-item">
          <span className="stat-value">₹{shop.totalSales.toLocaleString()}</span>
          <span className="stat-label">Total Sales</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{shop.totalBookings}</span>
          <span className="stat-label">Bookings</span>
        </div>
      </div>

      <div className="shop-actions">
        <button 
          className="btn-secondary btn-sm"
          onClick={() => setShowActions(!showActions)}
        >
          {showActions ? 'Hide Actions' : 'Show Actions'}
        </button>

        {showActions && (
          <div className="action-menu">
            <select
              value={shop.status}
              onChange={(e) => onChangeStatus(shop.id, e.target.value)}
              className="status-select"
              style={{ borderColor: getStatusColor(shop.status) }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <button 
              className="btn-danger btn-sm"
              onClick={() => onDelete(shop.id)}
            >
              Delete Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopManagement;