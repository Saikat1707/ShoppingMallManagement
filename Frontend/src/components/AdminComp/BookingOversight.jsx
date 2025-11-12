// src/components/AdminDashboard/BookingOversight/BookingOversight.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/adminCompCss/BookingOversight.css';

const BookingOversight = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [shopFilter, setShopFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data for bookings
  const mockBookings = [
    {
      id: 1,
      shopName: "Smart Salon",
      customer: "John Customer",
      customerPhone: "+91 9876543210",
      service: "Haircut & Styling",
      employee: "Alice Stylist",
      date: "2024-01-25",
      time: "10:00 AM - 11:00 AM",
      amount: 450,
      status: "confirmed",
      bookingDate: "2024-01-20T10:30:00Z",
      notes: "Regular haircut with styling"
    },
    {
      id: 2,
      shopName: "Elite Barbers",
      customer: "Mike Smith",
      customerPhone: "+91 9876543211",
      service: "Beard Trim & Shave",
      employee: "Mike Barber",
      date: "2024-01-22",
      time: "03:00 PM - 04:00 PM",
      amount: 300,
      status: "completed",
      bookingDate: "2024-01-18T14:20:00Z",
      notes: "Hot towel shave included"
    },
    {
      id: 3,
      shopName: "Beauty Bliss",
      customer: "Sarah Wilson",
      customerPhone: "+91 9876543212",
      service: "Manicure & Pedicure",
      employee: "Sarah Technician",
      date: "2024-01-30",
      time: "02:00 PM - 03:30 PM",
      amount: 600,
      status: "pending",
      bookingDate: "2024-01-21T09:15:00Z",
      notes: "French manicure requested"
    },
    {
      id: 4,
      shopName: "Relax Zone",
      customer: "David Brown",
      customerPhone: "+91 9876543213",
      service: "Full Body Massage",
      employee: "David Therapist",
      date: "2024-01-18",
      time: "11:00 AM - 12:30 PM",
      amount: 800,
      status: "cancelled",
      bookingDate: "2024-01-15T16:30:00Z",
      notes: "Swedish massage technique"
    },
    {
      id: 5,
      shopName: "Smart Salon",
      customer: "Emma Johnson",
      customerPhone: "+91 9876543214",
      service: "Hair Color Treatment",
      employee: "Alice Stylist",
      date: "2024-01-26",
      time: "02:00 PM - 04:00 PM",
      amount: 1200,
      status: "confirmed",
      bookingDate: "2024-01-22T11:45:00Z",
      notes: "Full hair color with treatment"
    }
  ];

  const getAllBookings = () => {
    // TODO: Implement API call
    // GET /api/booking
    console.log('Fetching all bookings');
    return mockBookings;
  };

  const deleteBooking = (bookingId) => {
    // TODO: Implement API call
    // DELETE /api/booking/:id
    console.log('Deleting booking:', bookingId);
    alert('Booking deleted successfully!');
  };

  const shops = ['all', 'Smart Salon', 'Elite Barbers', 'Beauty Bliss', 'Relax Zone'];

  const filteredBookings = mockBookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesShop = shopFilter === 'all' || booking.shopName === shopFilter;
    return matchesStatus && matchesShop;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const bookingStats = {
    total: mockBookings.length,
    confirmed: mockBookings.filter(b => b.status === 'confirmed').length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
    completed: mockBookings.filter(b => b.status === 'completed').length,
    cancelled: mockBookings.filter(b => b.status === 'cancelled').length
  };

  return (
    <div className="booking-oversight">
      <div className="page-header">
        <h1>Booking Oversight</h1>
        <p>Monitor and manage all bookings across the platform</p>
      </div>

      <div className="booking-stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{bookingStats.total}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{bookingStats.confirmed}</h3>
            <p>Confirmed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{bookingStats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{bookingStats.cancelled}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      <div className="oversight-controls">
        <div className="control-group">
          <label>Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="control-select"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="control-group">
          <label>Shop Filter:</label>
          <select
            value={shopFilter}
            onChange={(e) => setShopFilter(e.target.value)}
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

      <div className="bookings-table-container">
        <div className="table-header">
          <div className="table-row header-row">
            <div className="table-cell">Booking Details</div>
            <div className="table-cell">Customer</div>
            <div className="table-cell">Service & Employee</div>
            <div className="table-cell">Amount</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Actions</div>
          </div>
        </div>

        <div className="table-body">
          {filteredBookings.length === 0 ? (
            <div className="no-data">
              <div className="no-data-icon">📅</div>
              <h3>No bookings found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className="table-row">
                <div className="table-cell booking-details">
                  <div className="shop-name">{booking.shopName}</div>
                  <div className="booking-date">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </div>
                  <div className="booking-created">
                    Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="table-cell customer-info">
                  <div className="customer-name">{booking.customer}</div>
                  <div className="customer-phone">{booking.customerPhone}</div>
                </div>

                <div className="table-cell service-info">
                  <div className="service-name">{booking.service}</div>
                  <div className="employee-name">by {booking.employee}</div>
                  {booking.notes && (
                    <div className="booking-notes">📝 {booking.notes}</div>
                  )}
                </div>

                <div className="table-cell">
                  <div className="booking-amount">₹{booking.amount}</div>
                </div>

                <div className="table-cell">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(booking.status) }}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="table-cell actions">
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary btn-sm"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn-danger btn-sm"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
};

const BookingDetailsModal = ({ booking, onClose, getStatusColor }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content booking-details-modal">
        <div className="modal-header">
          <h2>Booking Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="booking-details-content">
          <div className="detail-section">
            <div className="shop-customer-info">
              <div className="info-group">
                <h4>Shop Information</h4>
                <p><strong>Shop Name:</strong> {booking.shopName}</p>
                <p><strong>Assigned Employee:</strong> {booking.employee}</p>
              </div>
              <div className="info-group">
                <h4>Customer Information</h4>
                <p><strong>Customer Name:</strong> {booking.customer}</p>
                <p><strong>Phone:</strong> {booking.customerPhone}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4>Service Details</h4>
            <div className="service-details">
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>Amount:</strong> ₹{booking.amount}</p>
              <p>
                <strong>Status:</strong> 
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(booking.status), marginLeft: '10px' }}
                >
                  {booking.status}
                </span>
              </p>
            </div>
          </div>

          <div className="detail-section">
            <h4>Appointment Schedule</h4>
            <div className="schedule-details">
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time Slot:</strong> {booking.time}</p>
              <p><strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
            </div>
          </div>

          {booking.notes && (
            <div className="detail-section">
              <h4>Additional Notes</h4>
              <div className="notes-content">
                {booking.notes}
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingOversight;