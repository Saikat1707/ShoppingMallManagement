import Booking from "../models/booking.js";

const bookingDAO = {
  async createBooking(data) {
    return await Booking.create(data);
  },

  async getAllBookings() {
    return await Booking.find()
      .populate("customer", "name email")
      .populate("shop", "name category");
  },

  async getBookingById(id) {
    return await Booking.findById(id)
      .populate("customer", "name email")
      .populate("shop", "name category");
  },

  async updateBooking(id, data) {
    return await Booking.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteBooking(id) {
    return await Booking.findByIdAndDelete(id);
  },

  async getBookingsByCustomer(customerId) {
    return await Booking.find({ customer: customerId })
      .populate("shop", "name category");
  },

  async getBookingsByShop(shopId) {
    return await Booking.find({ shop: shopId })
      .populate("customer", "name email");
  },

  async changeStatus(id, status) {
    return await Booking.findByIdAndUpdate(id, { status }, { new: true });
  },
};

export default bookingDAO;
