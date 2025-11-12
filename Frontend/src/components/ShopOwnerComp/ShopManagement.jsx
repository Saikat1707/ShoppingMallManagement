// src/components/ShopOwnerDashboard/ShopManagement/ShopManagement.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/ShopManagement.css';

const ShopManagement = ({ setActiveShop }) => {
  const [shops, setShops] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingShop, setEditingShop] = useState(null);

  // Mock data for demonstration
  const mockShops = [
    {
      id: 1,
      name: "Smart Salon",
      category: "Salon",
      location: "Egra",
      status: "active",
      createdAt: "2024-01-15"
    }
  ];

  const createShop = (shopData) => {
    // TODO: Implement API call
    // POST /api/shop
    console.log('Creating shop:', shopData);
    const newShop = { ...shopData, id: Date.now(), createdAt: new Date().toISOString() };
    setShops([...shops, newShop]);
    setActiveShop(newShop);
    setShowCreateForm(false);
  };

  const updateShop = (shopId, shopData) => {
    // TODO: Implement API call
    // PUT /api/shop/:id
    console.log('Updating shop:', shopId, shopData);
    setShops(shops.map(shop => shop.id === shopId ? { ...shop, ...shopData } : shop));
    setEditingShop(null);
  };

  const deleteShop = (shopId) => {
    // TODO: Implement API call
    // DELETE /api/shop/:id
    console.log('Deleting shop:', shopId);
    setShops(shops.filter(shop => shop.id !== shopId));
    if (activeShop?.id === shopId) {
      setActiveShop(null);
    }
  };

  const getMyShops = () => {
    // TODO: Implement API call
    // GET /api/shop/mine
    console.log('Fetching my shops');
    return mockShops;
  };

  return (
    <div className="shop-management">
      <div className="page-header">
        <h2>Shop Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          + Add New Shop
        </button>
      </div>

      {showCreateForm && (
        <ShopForm
          onSubmit={createShop}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {editingShop && (
        <ShopForm
          shop={editingShop}
          onSubmit={(data) => updateShop(editingShop.id, data)}
          onCancel={() => setEditingShop(null)}
        />
      )}

      <div className="shops-grid">
        {shops.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <h3>No Shops Yet</h3>
            <p>Create your first shop to get started with managing your business.</p>
            <button 
              className="btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              Create Your First Shop
            </button>
          </div>
        ) : (
          shops.map(shop => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onEdit={() => setEditingShop(shop)}
              onDelete={() => deleteShop(shop.id)}
              onSetActive={() => setActiveShop(shop)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const ShopForm = ({ shop, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: shop?.name || '',
    category: shop?.category || '',
    location: shop?.location || '',
    status: shop?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{shop ? 'Edit Shop' : 'Create New Shop'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Shop Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              <option value="Salon">Salon</option>
              <option value="Spa">Spa</option>
              <option value="Retail">Retail</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {shop ? 'Update' : 'Create'} Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ShopCard = ({ shop, onEdit, onDelete, onSetActive }) => {
  return (
    <div className="shop-card">
      <div className="shop-header">
        <h3>{shop.name}</h3>
        <span className={`status-badge ${shop.status}`}>
          {shop.status}
        </span>
      </div>
      
      <div className="shop-details">
        <div className="detail-item">
          <span className="label">Category:</span>
          <span className="value">{shop.category}</span>
        </div>
        <div className="detail-item">
          <span className="label">Location:</span>
          <span className="value">{shop.location}</span>
        </div>
        <div className="detail-item">
          <span className="label">Created:</span>
          <span className="value">{new Date(shop.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="shop-actions">
        <button onClick={onSetActive} className="btn-primary">
          Set Active
        </button>
        <button onClick={onEdit} className="btn-secondary">
          Edit
        </button>
        <button onClick={onDelete} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShopManagement;