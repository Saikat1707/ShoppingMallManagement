// src/components/ShopOwnerDashboard/BookingManagement/BookingManagement.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/BookingManagement.css';

const BookingManagement = ({ activeShop }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data
  const mockBookings = [
    {
      id: 1,
      customerName: "Alice Johnson",
      customerPhone: "+91 9876543210",
      service: "Haircut",
      employee: "John Doe",
      date: "2024-01-25",
      time: "10:00",
      status: "pending",
      shop: "Smart Salon"
    }
  ];

  const updateBookingStatus = (bookingId, status) => {
    // TODO: Implement API call
    // PATCH /api/booking/:id/status
    console.log('Updating booking status:', bookingId, status);
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
    setSelectedBooking(null);
  };

  const getBookingsByShop = (shopId) => {
    // TODO: Implement API call
    // GET /api/booking/shop/:shopId
    console.log('Fetching bookings for shop:', shopId);
    return mockBookings;
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: '#f59e0b' },
    { value: 'confirmed', label: 'Confirmed', color: '#10b981' },
    { value: 'cancelled', label: 'Cancelled', color: '#ef4444' },
    { value: 'completed', label: 'Completed', color: '#6366f1' }
  ];

  return (
    <div className="booking-management">
      <div className="page-header">
        <h2>Booking Management</h2>
        <div className="booking-stats">
          <div className="stat">
            <span className="count">{bookings.length}</span>
            <span className="label">Total Bookings</span>
          </div>
          <div className="stat">
            <span className="count">
              {bookings.filter(b => b.status === 'pending').length}
            </span>
            <span className="label">Pending</span>
          </div>
        </div>
      </div>

      {!activeShop && (
        <div className="alert-banner">
          ⚠️ Please select an active shop to manage bookings
        </div>
      )}

      {activeShop && (
        <div className="bookings-container">
          {bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h4>No Bookings Yet</h4>
              <p>Customer bookings will appear here once they start booking.</p>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onStatusChange={(status) => updateBookingStatus(booking.id, status)}
                  statusOptions={statusOptions}
                />
              ))}
            </div>
          )}

          {selectedBooking && (
            <StatusModal
              booking={selectedBooking}
              statusOptions={statusOptions}
              onUpdate={(status) => updateBookingStatus(selectedBooking.id, status)}
              onClose={() => setSelectedBooking(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

const BookingCard = ({ booking, onStatusChange, statusOptions }) => {
  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(s => s.value === status);
    return statusObj ? statusObj.color : '#6b7280';
  };

  const getStatusLabel = (status) => {
    const statusObj = statusOptions.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  return (
    <div className="booking-card">
      <div className="booking-header">
        <h3>{booking.customerName}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(booking.status) }}
        >
          {getStatusLabel(booking.status)}
        </span>
      </div>
      
      <div className="booking-details">
        <div className="detail-row">
          <span className="label">Service:</span>
          <span className="value">{booking.service}</span>
        </div>
        <div className="detail-row">
          <span className="label">Assigned To:</span>
          <span className="value">{booking.employee}</span>
        </div>
        <div className="detail-row">
          <span className="label">Date & Time:</span>
          <span className="value">
            {new Date(booking.date).toLocaleDateString()} at {booking.time}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Contact:</span>
          <span className="value">{booking.customerPhone}</span>
        </div>
      </div>
      
      <div className="booking-actions">
        <select
          value={booking.status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="status-select"
          style={{ borderColor: getStatusColor(booking.status) }}
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const StatusModal = ({ booking, statusOptions, onUpdate, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState(booking.status);

  const handleUpdate = () => {
    onUpdate(selectedStatus);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Booking Status</h3>
        <div className="booking-info">
          <p><strong>Customer:</strong> {booking.customerName}</p>
          <p><strong>Service:</strong> {booking.service}</p>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
        </div>
        
        <div className="form-group">
          <label>New Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-select"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={handleUpdate} className="btn-primary">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;