// src/components/CustomerDashboard/ShopBrowser/ShopBrowser.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/customerCompCss/ShopBrowser.css';

const ShopBrowser = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  // Mock data for shops
  const shops = [
    {
      id: 1,
      name: "Smart Salon",
      category: "Salon",
      location: "Egra City Center",
      rating: 4.8,
      reviews: 127,
      image: "💇‍♀️",
      description: "Professional salon services with expert stylists",
      services: ["Haircut", "Hair Color", "Hair Treatment", "Styling"],
      offers: ["20% off on first visit", "Free hair treatment with haircut"],
      openTime: "09:00",
      closeTime: "20:00",
      contact: "+91 9876543210"
    },
    {
      id: 2,
      name: "Elite Barbers",
      category: "Barber",
      location: "Downtown Egra",
      rating: 4.9,
      reviews: 89,
      image: "💈",
      description: "Premium men's grooming experience",
      services: ["Haircut", "Beard Trim", "Shave", "Facials"],
      offers: ["Free beard trim", "Student discount available"],
      openTime: "08:00",
      closeTime: "22:00",
      contact: "+91 9876543211"
    },
    {
      id: 3,
      name: "Beauty Bliss",
      category: "Spa",
      location: "Mall Road",
      rating: 4.7,
      reviews: 203,
      image: "💅",
      description: "Complete beauty and wellness solutions",
      services: ["Manicure", "Pedicure", "Facial", "Waxing"],
      offers: ["Manicure + Pedicure combo", "Loyalty points system"],
      openTime: "10:00",
      closeTime: "21:00",
      contact: "+91 9876543212"
    },
    {
      id: 4,
      name: "Relax Zone",
      category: "Spa",
      location: "Lake View Road",
      rating: 4.6,
      reviews: 156,
      image: "🧖‍♀️",
      description: "Ultimate relaxation and therapeutic treatments",
      services: ["Massage", "Therapy", "Aromatherapy", "Steam Bath"],
      offers: ["20% off on weekdays", "Couple packages available"],
      openTime: "08:00",
      closeTime: "23:00",
      contact: "+91 9876543213"
    },
    {
      id: 5,
      name: "Style Studio",
      category: "Salon",
      location: "Market Street",
      rating: 4.5,
      reviews: 94,
      image: "💄",
      description: "Trendy styles and modern beauty treatments",
      services: ["Makeup", "Bridal", "Hair Styling", "Nail Art"],
      offers: ["Free makeup trial", "Bridal package discounts"],
      openTime: "09:30",
      closeTime: "20:30",
      contact: "+91 9876543214"
    },
    {
      id: 6,
      name: "Gentleman's Club",
      category: "Barber",
      location: "Business District",
      rating: 4.8,
      reviews: 112,
      image: "👔",
      description: "Exclusive grooming services for gentlemen",
      services: ["Premium Haircut", "Hot Towel Shave", "Skin Care", "Hair Treatment"],
      offers: ["Loyalty card", "Corporate discounts"],
      openTime: "07:00",
      closeTime: "21:00",
      contact: "+91 9876543215"
    }
  ];

  const categories = ['all', 'Salon', 'Barber', 'Spa'];

  const filteredShops = shops.filter(shop => {
    const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openBookingModal = (shop) => {
    setSelectedShop(shop);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedShop(null);
  };

  const createBooking = (bookingData) => {
    // TODO: Implement API call
    // POST /api/booking
    console.log('Creating booking:', bookingData);
    alert('Booking created successfully!');
    closeBookingModal();
  };

  const getShops = () => {
    // TODO: Implement API call
    // GET /api/shop/public
    console.log('Fetching public shops');
    return shops;
  };

  const getShopDetails = (shopId) => {
    // TODO: Implement API call
    // GET /api/shop/:id
    console.log('Fetching shop details:', shopId);
    return shops.find(shop => shop.id === shopId);
  };

  return (
    <div className="shop-browser">
      <div className="shop-browser-header">
        <h1>Browse Shops</h1>
        <p>Discover and book services from the best shops in town</p>
      </div>

      <div className="shop-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search shops or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Shops' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="shops-grid">
        {filteredShops.length === 0 ? (
          <div className="no-shops-found">
            <div className="no-shops-icon">🏪</div>
            <h3>No shops found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredShops.map(shop => (
            <ShopCard 
              key={shop.id} 
              shop={shop} 
              onBookNow={() => openBookingModal(shop)}
            />
          ))
        )}
      </div>

      {showBookingModal && selectedShop && (
        <BookingModal
          shop={selectedShop}
          onSubmit={createBooking}
          onClose={closeBookingModal}
        />
      )}
    </div>
  );
};

const ShopCard = ({ shop, onBookNow }) => {
  return (
    <div className="shop-card">
      <div className="shop-card-header">
        <div className="shop-image">{shop.image}</div>
        <div className="shop-basic-info">
          <h3>{shop.name}</h3>
          <span className="shop-category">{shop.category}</span>
          <div className="shop-rating">
            <span className="rating">⭐ {shop.rating}</span>
            <span className="reviews">({shop.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="shop-details">
        <p className="shop-location">📍 {shop.location}</p>
        <p className="shop-description">{shop.description}</p>
        
        <div className="shop-services">
          <strong>Services:</strong>
          <div className="service-tags">
            {shop.services.slice(0, 3).map((service, index) => (
              <span key={index} className="service-tag">{service}</span>
            ))}
            {shop.services.length > 3 && (
              <span className="service-tag more">+{shop.services.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="shop-offers">
          <strong>Special Offers:</strong>
          <div className="offer-tags">
            {shop.offers.map((offer, index) => (
              <span key={index} className="offer-tag">🎁 {offer}</span>
            ))}
          </div>
        </div>

        <div className="shop-timing">
          <span>🕒 {shop.openTime} - {shop.closeTime}</span>
        </div>
      </div>

      <button className="book-now-btn" onClick={onBookNow}>
        Book Appointment
      </button>
    </div>
  );
};

const BookingModal = ({ shop, onSubmit, onClose }) => {
  const [bookingData, setBookingData] = useState({
    shop: shop.id,
    date: '',
    timeSlot: '',
    purpose: '',
    notes: ''
  });

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookingData);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content booking-modal">
        <div className="modal-header">
          <h2>Book Appointment</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="shop-booking-info">
          <div className="shop-booking-image">{shop.image}</div>
          <div>
            <h3>{shop.name}</h3>
            <p>{shop.location}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Service</label>
            <select
              value={bookingData.purpose}
              onChange={(e) => setBookingData({...bookingData, purpose: e.target.value})}
              required
            >
              <option value="">Choose a service</option>
              {shop.services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                min={getMinDate()}
                required
              />
            </div>

            <div className="form-group">
              <label>Time Slot</label>
              <select
                value={bookingData.timeSlot}
                onChange={(e) => setBookingData({...bookingData, timeSlot: e.target.value})}
                required
              >
                <option value="">Select time</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Additional Notes (Optional)</label>
            <textarea
              value={bookingData.notes}
              onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
              rows="3"
              placeholder="Any special requirements or notes..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopBrowser;