import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import CabinCard from "../components/CabinCard";
import "./Cabins.css";

const Cabins = () => {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        setLoading(true);
        const params = {};
        if (guests) params.guests = guests;
        if (checkIn) params.checkIn = checkIn;
        if (checkOut) params.checkOut = checkOut;
        const response = await axios.get("/api/cabins", { params });
        setCabins(response.data);
      } catch (error) {
        console.error("Error fetching cabins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCabins();
  }, [guests, checkIn, checkOut]);

  const filterButtons = [
    { label: "All Cabins", value: null },
    { label: "1-3 guests", value: 3 },
    { label: "4-7 guests", value: 7 },
    { label: "8-12 guests", value: 12 },
  ];

  return (
    <div className="cabins-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Luxury Cabins</h1>
          <p>
            Cozy yet luxurious cabins, located right in the heart of the Italian
            Dolomites. Choose your perfect getaway destination.
          </p>
        </div>

        <div className="filters-section">
          <div className="filter-header">
            <FaFilter className="filter-icon" />
            <span>Filter by Guests & Dates</span>
          </div>
          <div className="filter-buttons">
            {filterButtons.map((btn) => (
              <button
                key={btn.label}
                className={`filter-btn ${guests === btn.value ? "active" : ""}`}
                onClick={() => setGuests(btn.value)}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="date-filters">
            <label>
              Check-in:
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </label>
            <label>
              Check-out:
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : cabins.length > 0 ? (
          <div className="cabins-grid">
            {cabins.map((cabin) => (
              <CabinCard key={cabin._id} cabin={cabin} />
            ))}
          </div>
        ) : (
          <div className="no-cabins">
            <p>No cabins found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cabins;
