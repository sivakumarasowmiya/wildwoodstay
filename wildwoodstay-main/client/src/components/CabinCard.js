import React, { useState } from 'react';
import './CabinCard.css';
import { Link } from 'react-router-dom';
import { FaUsers, FaStar, FaImage } from 'react-icons/fa';

const CabinCard = ({ cabin }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const defaultImage = 'https://images.unsplash.com/photo-1542314503-37143f4f6424?w=500&h=400&fit=crop';
  const cabinImage = cabin.image || (cabin.images && cabin.images[0]) || defaultImage;

  return (
    <Link to={`/cabins/${cabin._id}`} className="cabin-card-link">
      <div className="cabin-card">
        <div className="cabin-image">
          {!imageLoaded && !imageError && (
            <div className="image-loading">
              <div className="spinner"></div>
            </div>
          )}
          {imageError && (
            <div className="image-error">
              <FaImage className="error-icon" />
              <span>Image unavailable</span>
            </div>
          )}
          <img 
            src={cabinImage} 
            alt={cabin.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageLoaded(true);
              setImageError(true);
            }}
            className={`cabin-img ${imageLoaded ? 'loaded' : ''}`}
          />
          <div className="cabin-rating">
            <FaStar className="star-icon" />
            <span>{cabin.rating?.toFixed(1) || '4.8'}</span>
          </div>
        </div>
        <div className="cabin-info">
          <h3>{cabin.name}</h3>
          <p className="cabin-location">{cabin.location || 'Italian Dolomites'}</p>
          <div className="cabin-meta">
            <span className="guests">
              <FaUsers /> {cabin.maxGuests} guests max
            </span>
          </div>
          <div className="cabin-price">
            <span className="price">${cabin.price}</span>
            <span className="per-night">/ night</span>
          </div>
          <div className="cabin-actions">
            <button className="btn-details">View Details →</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CabinCard;
