// src/components/ShopOwnerDashboard/OfferManagement/OfferManagement.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/OfferManagement.css';

const OfferManagement = ({ activeShop }) => {
  const [offers, setOffers] = useState([]);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  // Mock data
  const mockOffers = [
    {
      id: 1,
      title: "Summer Special",
      description: "20% off on all services",
      discountType: "percentage",
      discountValue: 20,
      validUntil: "2024-02-28",
      status: "active",
      shop: "Smart Salon"
    }
  ];

  const createOffer = (offerData) => {
    // TODO: Implement API call
    // POST /api/offer
    console.log('Creating offer:', offerData);
    const newOffer = {
      ...offerData,
      id: Date.now(),
      shop: activeShop?.name || 'Unknown Shop'
    };
    setOffers([...offers, newOffer]);
    setShowOfferForm(false);
  };

  const updateOffer = (offerId, offerData) => {
    // TODO: Implement API call
    // PUT /api/offer/:id
    console.log('Updating offer:', offerId, offerData);
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, ...offerData } : offer
    ));
    setEditingOffer(null);
  };

  const deleteOffer = (offerId) => {
    // TODO: Implement API call
    // DELETE /api/offer/:id
    console.log('Deleting offer:', offerId);
    setOffers(offers.filter(offer => offer.id !== offerId));
  };

  const getOffersByShop = (shopId) => {
    // TODO: Implement API call
    // GET /api/offer/shop/:shopId
    console.log('Fetching offers for shop:', shopId);
    return mockOffers;
  };

  return (
    <div className="offer-management">
      <div className="page-header">
        <h2>Offer Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowOfferForm(true)}
          disabled={!activeShop}
        >
          + Create Offer
        </button>
      </div>

      {!activeShop && (
        <div className="alert-banner">
          ⚠️ Please select an active shop to manage offers
        </div>
      )}

      {activeShop && (
        <>
          {showOfferForm && (
            <OfferForm
              onSubmit={createOffer}
              onCancel={() => setShowOfferForm(false)}
            />
          )}

          {editingOffer && (
            <OfferForm
              offer={editingOffer}
              onSubmit={(data) => updateOffer(editingOffer.id, data)}
              onCancel={() => setEditingOffer(null)}
            />
          )}

          <div className="offers-grid">
            {offers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎁</div>
                <h4>No Offers Created</h4>
                <p>Create attractive offers to attract more customers.</p>
                <button 
                  className="btn-primary"
                  onClick={() => setShowOfferForm(true)}
                >
                  Create Your First Offer
                </button>
              </div>
            ) : (
              offers.map(offer => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onEdit={() => setEditingOffer(offer)}
                  onDelete={() => deleteOffer(offer.id)}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

const OfferForm = ({ offer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: offer?.title || '',
    description: offer?.description || '',
    discountType: offer?.discountType || 'percentage',
    discountValue: offer?.discountValue || '',
    validUntil: offer?.validUntil || '',
    status: offer?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      discountValue: parseFloat(formData.discountValue)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{offer ? 'Edit Offer' : 'Create New Offer'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Offer Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Discount Type</label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({...formData, discountType: e.target.value})}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>
                Discount Value
                {formData.discountType === 'percentage' ? ' (%)' : ' (₹)'}
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.discountValue}
                onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Valid Until</label>
            <input
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
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
              {offer ? 'Update' : 'Create'} Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const OfferCard = ({ offer, onEdit, onDelete }) => {
  const isExpired = new Date(offer.validUntil) < new Date();

  return (
    <div className={`offer-card ${isExpired ? 'expired' : ''}`}>
      <div className="offer-header">
        <h3>{offer.title}</h3>
        <span className={`status-badge ${offer.status} ${isExpired ? 'expired' : ''}`}>
          {isExpired ? 'Expired' : offer.status}
        </span>
      </div>
      
      <p className="offer-description">
        {offer.description}
      </p>
      
      <div className="offer-details">
        <div className="discount-badge">
          {offer.discountType === 'percentage' ? 
            `${offer.discountValue}% OFF` : 
            `₹${offer.discountValue} OFF`
          }
        </div>
        
        <div className="valid-until">
          Valid until: {new Date(offer.validUntil).toLocaleDateString()}
        </div>
      </div>
      
      <div className="offer-actions">
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

export default OfferManagement;