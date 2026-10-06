const express = require("express");
const router = express.Router();
const {
  getAllCabins,
  getCabinById,
  createCabin,
  updateCabin,
  deleteCabin,
  addReview,
} = require("../controllers/cabinController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

// Public routes
router.get("/", getAllCabins);
router.get("/:id", getCabinById);

// Protected routes
router.post("/:id/reviews", authMiddleware, addReview);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, createCabin);
router.put("/:id", authMiddleware, adminMiddleware, updateCabin);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCabin);

module.exports = router;
