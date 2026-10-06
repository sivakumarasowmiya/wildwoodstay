import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaTree, FaStar } from "react-icons/fa";
import axios from "axios";
import CabinCard from "../components/CabinCard";
import "./Home.css";

const Home = () => {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const response = await axios.get("/api/cabins");
        setCabins(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching cabins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCabins();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to The Wildwood Stay</h1>
          <p>
            Where nature's beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home.
          </p>
          <div className="hero-features">
            <div className="feature">
              <FaTree className="feature-icon" />
              <span>Surrounded by Nature</span>
            </div>
            <div className="feature">
              <FaUsers className="feature-icon" />
              <span>Family Friendly</span>
            </div>
            <div className="feature">
              <FaStar className="feature-icon" />
              <span>Luxury Comfort</span>
            </div>
          </div>
          <Link to="/cabins" className="btn-primary">
            Explore Our Cabins
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://plus.unsplash.com/premium_photo-1686090449933-2057b9fba09c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mountain cabin"
          />
        </div>
      </section>

      {/* Cabins Preview Section */}
      <section className="section cabins-preview">
        <div className="container">
          <div className="section-title">
            <h2>Our Luxury Cabins</h2>
            <p>
              Cozy yet luxurious cabins, located right in the heart of the
              Italian Dolomites. Imagine waking up to beautiful mountain views,
              spending your days exploring the dark forests around, or just
              relaxing in your private hot tub under the stars.
            </p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="cabins-grid">
              {cabins.map((cabin) => (
                <CabinCard key={cabin._id} cabin={cabin} />
              ))}
            </div>
          )}

          <div className="section-cta">
            <Link to="/cabins" className="btn-primary">
              View All Cabins
            </Link>
          </div>
        </div>
      </section>

      {/* Family History Section */}
      <section className="section family-history">
        <div className="container">
          <div className="history-content">
            <div className="history-text">
              <h2>Managed by our family since 1962</h2>
              <p>
                Since 1962, The Wildwood Stay has been a cherished family-run
                retreat. Started by our grandparents, this haven has been
                nurtured with love and care, passing down through our family as
                a testament to our dedication to creating a warm, welcoming
                environment.
              </p>
              <p>
                Over the years, we've maintained the essence of The Wildwood
                Stay, blending the timeless beauty of the mountains with the
                personal touch only a family business can offer. Here, you're
                not just a guest, you're part of our extended family. So join us
                at The Wildwood Stay soon, where tradition meets tranquility,
                and every visit is like coming home.
              </p>
              <Link
                to="/about"
                style={{ width: "100%" }}
                className="btn-secondary"
              >
                Read Our Story
              </Link>
            </div>
            <div className="history-image">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
                alt="Family at cabin"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <h2>Ready to experience paradise?</h2>
          <p>
            Book your stay at The Wildwood Stay and create unforgettable
            memories.
          </p>
          <Link to="/cabins" className="btn-primary">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
