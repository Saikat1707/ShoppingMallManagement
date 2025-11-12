import bookingDAO from "../DAO/bookingDao.js";

export const createBooking = async (req, res) => {
  try {
    const bookingData = { ...req.body, customer: req.user.id }; // from auth middleware
    const booking = await bookingDAO.createBooking(bookingData);
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingDAO.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingDAO.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await bookingDAO.updateBooking(req.params.id, req.body);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await bookingDAO.deleteBooking(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingsByCustomer = async (req, res) => {
  try {
    const bookings = await bookingDAO.getBookingsByCustomer(req.user.id);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingsByShop = async (req, res) => {
  try {
    const bookings = await bookingDAO.getBookingsByShop(req.params.shopId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await bookingDAO.changeStatus(req.params.id, status);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: `Booking status updated to ${status}`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
