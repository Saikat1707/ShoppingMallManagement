// src/components/CustomerDashboard/CustomerHome/CustomerHome.js
import React from 'react';
import '../../CSS/ComponentCSS/customerCompCss/CustomerHome.css';

const CustomerHome = () => {
  // Mock data for featured shops
  const featuredShops = [
    {
      id: 1,
      name: "Smart Salon",
      category: "Salon & Spa",
      location: "Egra City Center",
      rating: 4.8,
      reviews: 127,
      image: "🏪",
      offers: ["20% off on first visit", "Free hair treatment"]
    },
    {
      id: 2,
      name: "Elite Barbers",
      category: "Men's Grooming",
      location: "Downtown Egra",
      rating: 4.9,
      reviews: 89,
      image: "💈",
      offers: ["Free beard trim", "Student discount"]
    },
    {
      id: 3,
      name: "Beauty Bliss",
      category: "Beauty Parlor",
      location: "Mall Road",
      rating: 4.7,
      reviews: 203,
      image: "💅",
      offers: ["Manicure + Pedicure combo", "Loyalty points"]
    }
  ];

  // Mock data for recent bookings
  const recentBookings = [
    {
      id: 1,
      shopName: "Smart Salon",
      service: "Haircut & Styling",
      date: "2024-01-25",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: 2,
      shopName: "Elite Barbers",
      service: "Beard Trim",
      date: "2024-01-20",
      time: "3:00 PM",
      status: "completed"
    }
  ];

  return (
    <div className="customer-home">
      <div className="customer-welcome-banner">
        <div className="welcome-content">
          <h1>Welcome back! 👋</h1>
          <p>Discover amazing services and book your next appointment with ease.</p>
          <button className="cta-button">Explore Shops</button>
        </div>
        <div className="welcome-graphic">
          <div className="graphic-icon">🎯</div>
        </div>
      </div>

      <div className="customer-home-grid">
        <div className="featured-shops-section">
          <div className="section-header">
            <h2>Featured Shops</h2>
            <a href="/customer/shops" className="view-all-link">View All →</a>
          </div>
          <div className="featured-shops-grid">
            {featuredShops.map(shop => (
              <div key={shop.id} className="featured-shop-card">
                <div className="shop-image">{shop.image}</div>
                <div className="shop-info">
                  <h3>{shop.name}</h3>
                  <p className="shop-category">{shop.category}</p>
                  <p className="shop-location">{shop.location}</p>
                  <div className="shop-rating">
                    <span className="rating-stars">⭐ {shop.rating}</span>
                    <span className="reviews">({shop.reviews} reviews)</span>
                  </div>
                  <div className="shop-offers">
                    {shop.offers.map((offer, index) => (
                      <span key={index} className="offer-tag">{offer}</span>
                    ))}
                  </div>
                </div>
                <button className="book-now-btn">Book Now</button>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-bookings-section">
          <div className="section-header">
            <h2>Recent Bookings</h2>
            <a href="/customer/bookings" className="view-all-link">View All →</a>
          </div>
          <div className="bookings-list">
            {recentBookings.map(booking => (
              <div key={booking.id} className="booking-item">
                <div className="booking-info">
                  <h4>{booking.shopName}</h4>
                  <p>{booking.service}</p>
                  <span className="booking-date">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </span>
                </div>
                <span className={`booking-status ${booking.status}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>5</h3>
                <p>Total Bookings</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <h3>12</h3>
                <p>Shops Visited</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <h3>3</h3>
                <p>Upcoming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;