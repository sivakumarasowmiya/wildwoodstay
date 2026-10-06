const Cabin = require("../models/Cabin");
const Booking = require("../models/Booking");

// Get all cabins
exports.getAllCabins = async (req, res) => {
  try {
    const { guests, minPrice, maxPrice, checkIn, checkOut } = req.query;

    let filter = {};

    if (guests) {
      filter.maxGuests = { $gte: parseInt(guests) };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const overlappingBookings = await Booking.find({
        status: { $in: ["pending", "confirmed"] },
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gt: checkInDate },
      }).select("cabinId");

      const bookedCabinIds = overlappingBookings.map((b) => b.cabinId);
      if (bookedCabinIds.length) {
        filter._id = { $nin: bookedCabinIds };
      }
    }

    const cabins = await Cabin.find(filter).sort({ price: 1 });
    res.json(cabins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single cabin
exports.getCabinById = async (req, res) => {
  try {
    const cabin = await Cabin.findById(req.params.id);
    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }
    res.json(cabin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create cabin (admin only)
exports.createCabin = async (req, res) => {
  try {
    const cabin = new Cabin(req.body);
    await cabin.save();
    res.status(201).json({
      message: "Cabin created successfully",
      cabin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update cabin (admin only)
exports.updateCabin = async (req, res) => {
  try {
    const cabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }
    res.json({
      message: "Cabin updated successfully",
      cabin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete cabin (admin only)
exports.deleteCabin = async (req, res) => {
  try {
    const cabin = await Cabin.findByIdAndDelete(req.params.id);
    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }
    res.json({ message: "Cabin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const cabin = await Cabin.findById(req.params.id);

    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }

    cabin.reviews.push({
      userId: req.userId,
      rating,
      comment,
    });

    await cabin.save();
    res.json({
      message: "Review added successfully",
      cabin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
