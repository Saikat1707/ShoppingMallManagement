// src/components/CustomerDashboard/MyBookings/MyBookings.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/customerCompCss/MyBookings.css';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      shopName: "Smart Salon",
      shopImage: "💇‍♀️",
      service: "Haircut & Styling",
      date: "2024-01-25",
      time: "10:00 AM - 11:00 AM",
      status: "confirmed",
      amount: 450,
      employee: "John Doe",
      notes: "Regular haircut with styling",
      bookingDate: "2024-01-20"
    },
    {
      id: 2,
      shopName: "Elite Barbers",
      shopImage: "💈",
      service: "Beard Trim & Shave",
      date: "2024-01-22",
      time: "03:00 PM - 04:00 PM",
      status: "completed",
      amount: 300,
      employee: "Mike Smith",
      notes: "Hot towel shave included",
      bookingDate: "2024-01-18"
    },
    {
      id: 3,
      shopName: "Beauty Bliss",
      shopImage: "💅",
      service: "Manicure & Pedicure",
      date: "2024-01-30",
      time: "02:00 PM - 03:30 PM",
      status: "pending",
      amount: 600,
      employee: "Sarah Johnson",
      notes: "French manicure requested",
      bookingDate: "2024-01-21"
    },
    {
      id: 4,
      shopName: "Relax Zone",
      shopImage: "🧖‍♀️",
      service: "Full Body Massage",
      date: "2024-01-18",
      time: "11:00 AM - 12:30 PM",
      status: "cancelled",
      amount: 800,
      employee: "David Wilson",
      notes: "Swedish massage technique",
      bookingDate: "2024-01-15"
    }
  ];

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: bookings.filter(b => ['confirmed', 'pending'].includes(b.status)).length },
    { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { key: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length },
    { key: 'all', label: 'All Bookings', count: bookings.length }
  ];

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') return ['confirmed', 'pending'].includes(booking.status);
    if (activeTab === 'completed') return booking.status === 'completed';
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const cancelBooking = (bookingId) => {
    // TODO: Implement API call
    // PATCH /api/booking/:id/status
    console.log('Cancelling booking:', bookingId);
    alert('Booking cancelled successfully!');
  };

  const getMyBookings = () => {
    // TODO: Implement API call
    // GET /api/booking/customer/me
    console.log('Fetching customer bookings');
    return bookings;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="my-bookings">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage and track your appointments</p>
      </div>

      <div className="bookings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <div className="no-bookings-icon">📅</div>
            <h3>No bookings found</h3>
            <p>
              {activeTab === 'upcoming' && "You don't have any upcoming bookings."}
              {activeTab === 'completed' && "You haven't completed any bookings yet."}
              {activeTab === 'cancelled' && "You don't have any cancelled bookings."}
              {activeTab === 'all' && "You haven't made any bookings yet."}
            </p>
            {activeTab === 'upcoming' && (
              <button className="btn-primary" onClick={() => window.location.href = '/customer/shops'}>
                Book Now
              </button>
            )}
          </div>
        ) : (
          filteredBookings.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={cancelBooking}
              onViewDetails={() => setSelectedBooking(booking)}
              getStatusColor={getStatusColor}
              getStatusLabel={getStatusLabel}
            />
          ))
        )}
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
        />
      )}
    </div>
  );
};

const BookingCard = ({ booking, onCancel, onViewDetails, getStatusColor, getStatusLabel }) => {
  const isUpcoming = ['confirmed', 'pending'].includes(booking.status);
  const isCancellable = booking.status === 'confirmed' || booking.status === 'pending';

  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <div className="shop-info">
          <div className="shop-image">{booking.shopImage}</div>
          <div className="shop-details">
            <h3>{booking.shopName}</h3>
            <p className="service-name">{booking.service}</p>
          </div>
        </div>
        <div className="booking-status">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(booking.status) }}
          >
            {getStatusLabel(booking.status)}
          </span>
        </div>
      </div>

      <div className="booking-details">
        <div className="detail-row">
          <div className="detail-item">
            <span className="label">Date & Time:</span>
            <span className="value">
              {new Date(booking.date).toLocaleDateString()} at {booking.time}
            </span>
          </div>
          <div className="detail-item">
            <span className="label">Amount:</span>
            <span className="value amount">₹{booking.amount}</span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item">
            <span className="label">Assigned To:</span>
            <span className="value">{booking.employee}</span>
          </div>
          <div className="detail-item">
            <span className="label">Booked On:</span>
            <span className="value">
              {new Date(booking.bookingDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="booking-actions">
        <button className="btn-secondary" onClick={onViewDetails}>
          View Details
        </button>
        {isCancellable && (
          <button 
            className="btn-danger"
            onClick={() => onCancel(booking.id)}
          >
            Cancel Booking
          </button>
        )}
        {isUpcoming && (
          <button className="btn-primary">
            Reschedule
          </button>
        )}
      </div>
    </div>
  );
};

const BookingDetailsModal = ({ booking, onClose, getStatusColor, getStatusLabel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content booking-details-modal">
        <div className="modal-header">
          <h2>Booking Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="booking-details-content">
          <div className="detail-section">
            <div className="shop-info-large">
              <div className="shop-image-large">{booking.shopImage}</div>
              <div>
                <h3>{booking.shopName}</h3>
                <span 
                  className="status-badge-large"
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {getStatusLabel(booking.status)}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4>Service Information</h4>
            <div className="details-grid">
              <div className="detail-item-full">
                <span className="label">Service:</span>
                <span className="value">{booking.service}</span>
              </div>
              <div className="detail-item-full">
                <span className="label">Assigned Staff:</span>
                <span className="value">{booking.employee}</span>
              </div>
              <div className="detail-item-full">
                <span className="label">Amount:</span>
                <span className="value amount">₹{booking.amount}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4>Appointment Details</h4>
            <div className="details-grid">
              <div className="detail-item-full">
                <span className="label">Date:</span>
                <span className="value">{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item-full">
                <span className="label">Time Slot:</span>
                <span className="value">{booking.time}</span>
              </div>
              <div className="detail-item-full">
                <span className="label">Booked On:</span>
                <span className="value">{new Date(booking.bookingDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div className="detail-section">
              <h4>Additional Notes</h4>
              <p className="booking-notes">{booking.notes}</p>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          {(booking.status === 'confirmed' || booking.status === 'pending') && (
            <button className="btn-danger">
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;