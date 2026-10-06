const Booking = require("../models/Booking");
const Cabin = require("../models/Cabin");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const {
      cabinId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      specialRequests,
      guestName,
      guestEmail,
      guestPhone,
    } = req.body;

    const cabin = await Cabin.findById(cabinId);
    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }

    if (numberOfGuests > cabin.maxGuests) {
      return res
        .status(400)
        .json({ message: `Maximum guests allowed is ${cabin.maxGuests}` });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const numberOfNights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24),
    );

    if (numberOfNights <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid check-in or check-out date" });
    }

    const totalPrice = cabin.price * numberOfNights;

    // Check for booking conflicts
    const conflict = await Booking.findOne({
      cabinId,
      status: { $in: ["pending", "confirmed"] },
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn },
        },
      ],
    });

    if (conflict) {
      return res
        .status(409)
        .json({ message: "Cabin already booked for these dates" });
    }

    const booking = new Booking({
      userId: req.userId,
      cabinId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfGuests,
      numberOfNights,
      totalPrice,
      status: "confirmed",
      paymentStatus: "completed",
      specialRequests,
      guestName,
      guestEmail,
      guestPhone,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).populate(
      "cabinId",
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single booking
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("cabinId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.userId && req.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = "cancelled";
    booking.paymentStatus = "refunded";
    await booking.save();

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all bookings (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("cabinId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
