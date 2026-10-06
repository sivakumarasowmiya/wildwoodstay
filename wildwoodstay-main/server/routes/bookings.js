const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

// Protected routes
router.post("/", authMiddleware, createBooking);
router.get("/user/my-bookings", authMiddleware, getUserBookings);
router.get("/:id", authMiddleware, getBookingById);
router.put("/:id", authMiddleware, updateBooking);
router.patch("/:id/cancel", authMiddleware, cancelBooking);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, getAllBookings);

module.exports = router;
