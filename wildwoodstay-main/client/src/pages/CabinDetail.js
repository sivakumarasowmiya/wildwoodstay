import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaBed, FaBath, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import './CabinDetail.css';

const CabinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [cabin, setCabin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCabin = async () => {
      try {
        const response = await axios.get(`/api/cabins/${id}`);
        setCabin(response.data);
      } catch (error) {
        toast.error('Failed to load cabin details');
        navigate('/cabins');
      } finally {
        setLoading(false);
      }
    };

    fetchCabin();
  }, [id, navigate]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a cabin');
      navigate('/login');
      return;
    }
    navigate(`/booking/${id}`);
  };

  const handlePreviousImage = () => {
    const images = cabin?.images || [cabin?.image];
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    const images = cabin?.images || [cabin?.image];
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="cabin-detail-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!cabin) {
    return null;
  }

  const images = cabin.images && cabin.images.length > 0 ? cabin.images : [cabin.image];

  return (
    <div className="cabin-detail-page">
      <div className="container">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={images[currentImageIndex]} alt={cabin.name} />
            {images.length > 1 && (
              <>
                <button className="gallery-btn prev" onClick={handlePreviousImage}>
                  <FaChevronLeft />
                </button>
                <button className="gallery-btn next" onClick={handleNextImage}>
                  <FaChevronRight />
                </button>
                <div className="image-counter">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="thumbnail-gallery">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${cabin.name} ${idx + 1}`}
                  className={`thumbnail ${currentImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="detail-content">
          {/* Cabin Info */}
          <div className="cabin-info">
            <div className="header">
              <h1>{cabin.name}</h1>
              <div className="rating">
                <FaStar className="star" />
                <span>{cabin.rating}</span>
              </div>
            </div>

            <div className="specs">
              <div className="spec">
                <FaBed className="icon" />
                <div>
                  <p className="label">Bedrooms</p>
                  <p className="value">{cabin.bedrooms}</p>
                </div>
              </div>
              <div className="spec">
                <FaBath className="icon" />
                <div>
                  <p className="label">Bathrooms</p>
                  <p className="value">{cabin.bathrooms}</p>
                </div>
              </div>
              <div className="spec">
                <FaUsers className="icon" />
                <div>
                  <p className="label">Max Guests</p>
                  <p className="value">{cabin.maxGuests}</p>
                </div>
              </div>
            </div>

            <div className="description-section">
              <h2>About this Cabin</h2>
              <p>{cabin.description}</p>
            </div>

            {cabin.amenities && cabin.amenities.length > 0 && (
              <div className="amenities-section">
                <h2>Amenities</h2>
                <ul className="amenities-list">
                  {cabin.amenities.map((amenity, idx) => (
                    <li key={idx}>✓ {amenity}</li>
                  ))}
                </ul>
              </div>
            )}

            {cabin.reviews && cabin.reviews.length > 0 && (
              <div className="reviews-section">
                <h2>Guest Reviews</h2>
                <div className="reviews-list">
                  {cabin.reviews.map((review, idx) => (
                    <div key={idx} className="review">
                      <div className="review-header">
                        <strong>{review.userName}</strong>
                        <div className="review-rating">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <FaStar key={i} className="star" />
                          ))}
                        </div>
                      </div>
                      <p>{review.comment}</p>
                      <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="booking-sidebar">
            <div className="price-card">
              <div className="price-header">
                <h3>Price per Night</h3>
                <p className="price">${cabin.price}</p>
              </div>

              <button className="btn-primary" onClick={handleBookNow} style={{ width: '100%' }}>
                Book Now
              </button>

              <div className="booking-info">
                <p><strong>What's Included:</strong></p>
                <ul>
                  <li>Free WiFi</li>
                  <li>Full Kitchen</li>
                  <li>Hot Tub</li>
                  <li>Fireplace</li>
                  <li>Mountain Views</li>
                </ul>
              </div>

              <div className="contact-info">
                <h4>Questions?</h4>
                <p>Contact us at:</p>
                <p><strong>info@wildwoodstay.com</strong></p>
                <p><strong>+39 123 456 7890</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinDetail;
