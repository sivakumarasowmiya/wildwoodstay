const mongoose = require("mongoose");
const Cabin = require("./models/Cabin");
require("dotenv").config();

const cabinsData = [
  {
    name: "Forest Retreat",
    description:
      "A cozy cabin nestled in the heart of the forest with stunning views and all modern amenities. Perfect for couples or small families.",
    price: 160,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [
      "Free WiFi",
      "Full Kitchen",
      "Hot Tub",
      "Fireplace",
      "Mountain Views",
      "Heating",
      "Air Conditioning",
      "TV/Entertainment System",
    ],

    image:
      "https://images.unsplash.com/photo-1611602132349-7032e597432a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1763051339093-61c59f40ba28?q=80&w=1178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1763338997140-1727cf418419?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1759524493792-43d255dbfdfd?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    rating: 4.8,
    reviews: [
      {
        userId: null,
        userName: "John Doe",
        rating: 5,
        comment:
          "Amazing experience! The cabin is exactly as described. Highly recommended!",
        createdAt: new Date("2024-01-15"),
      },
      {
        userId: null,
        userName: "Jane Smith",
        rating: 5,
        comment:
          "Perfect getaway for a romantic weekend. Beautiful views and comfortable amenities.",
        createdAt: new Date("2024-01-10"),
      },
    ],
  },
  {
    name: "Mountain Lodge",
    description:
      "Luxury mountain retreat with breathtaking panoramic views. Spacious and perfect for families. Features a private hot tub and large deck.",
    price: 300,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: [
      "Free WiFi",
      "Full Kitchen",
      "Private Hot Tub",
      "Fireplace",
      "Mountain Views",
      "Heating",
      "Air Conditioning",
      "Large Deck",
      "BBQ Grill",
      "Washer/Dryer",
    ],
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562323150-c3f486a6f185?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    rating: 4.9,
    reviews: [
      {
        userId: null,
        userName: "Michael Johnson",
        rating: 5,
        comment:
          "Fantastic family vacation! Kids loved the outdoor space and activities.",
        createdAt: new Date("2024-01-20"),
      },
    ],
  },
  {
    name: "Alpine Summit",
    description:
      "Premium luxury cabin at high altitude with 360-degree mountain views. Exclusive amenities and privacy guaranteed.",
    price: 450,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: [
      "Free WiFi",
      "Full Kitchen",
      "Private Hot Tub",
      "Sauna",
      "Fireplace",
      "Mountain Views",
      "Heating",
      "Air Conditioning",
      "Large Deck",
      "BBQ Grill",
      "Washer/Dryer",
      "Home Theater",
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1686090450574-214118216bdc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1749063737042-d382e07c6043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1716470884800-7aa2555ef7b3?q=80&w=745&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    rating: 5.0,
    reviews: [],
  },
  {
    name: "Wilderness Lodge",
    description:
      "Rustic yet comfortable cabin for adventure seekers. Perfect base for hiking and outdoor activities.",
    price: 200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: [
      "Free WiFi",
      "Full Kitchen",
      "Hot Tub",
      "Fireplace",
      "Mountain Views",
      "Heating",
      "Patio",
    ],
    image:
      "https://images.unsplash.com/photo-1765743223683-7d4af92938f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1763338997140-1727cf418419?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    rating: 4.7,
    reviews: [],
  },
  {
    name: "Lakeside Cabin",
    description:
      "Peaceful lakeside cabin with water views. Great for relaxation and enjoying nature.",
    price: 250,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      "Free WiFi",
      "Full Kitchen",
      "Private Hot Tub",
      "Fireplace",
      "Lake Views",
      "Heating",
      "Air Conditioning",
      "Deck with Lake Access",
    ],
    image:
      "https://images.unsplash.com/photo-1628620801061-51e05d0ad917?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1560100660-c36c72ad4524?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.6,
    reviews: [],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    // Clear existing cabins
    await Cabin.deleteMany({});
    console.log("Cleared existing cabins");

    // Insert new cabins
    const result = await Cabin.insertMany(cabinsData);
    console.log(`${result.length} cabins inserted successfully`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
