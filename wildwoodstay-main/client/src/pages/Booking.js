import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaUsers, FaDollarSign } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import './Booking.css';

const Booking = () => {
  const { cabinId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  
  const [cabin, setCabin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: '',
    specialRequests: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchCabin = async () => {
      try {
        const response = await axios.get(`/api/cabins/${cabinId}`);
        setCabin(response.data);
        setFormData(prev => ({
          ...prev,
          guestName: user?.name || '',
          guestEmail: user?.email || '',
        }));
      } catch (error) {
        toast.error('Failed to load cabin details');
        navigate('/cabins');
      } finally {
        setLoading(false);
      }
    };

    fetchCabin();
  }, [cabinId, isAuthenticated, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value) : value,
    }));
  };

  const calculateNights = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const numberOfNights = calculateNights();
  const totalPrice = cabin ? cabin.price * numberOfNights : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.checkInDate || !formData.checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (numberOfNights <= 0) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    if (formData.numberOfGuests > cabin.maxGuests) {
      toast.error(`Maximum guests allowed is ${cabin.maxGuests}`);
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post('/api/bookings', {
        cabinId,
        ...formData,
      });

      toast.success('Booking created successfully!');
      navigate(`/booking-confirmation/${response.data.booking._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-page">
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

  return (
    <div className="booking-page">
      <div className="container">
        <h1>Book {cabin.name}</h1>

        <div className="booking-content">
          {/* Cabin Info */}
          <div className="cabin-info-section">
            <img src={cabin.image} alt={cabin.name} className="cabin-image" />
            <div className="cabin-details">
              <h2>{cabin.name}</h2>
              <p className="cabin-description">{cabin.description}</p>
              <div className="cabin-specs">
                <div className="spec">
                  <strong>Bedrooms:</strong> {cabin.bedrooms}
                </div>
                <div className="spec">
                  <strong>Bathrooms:</strong> {cabin.bathrooms}
                </div>
                <div className="spec">
                  <strong>Max Guests:</strong> {cabin.maxGuests}
                </div>
                <div className="spec">
                  <strong>Price:</strong> ${cabin.price} / night
                </div>
              </div>
              {cabin.amenities && cabin.amenities.length > 0 && (
                <div className="amenities">
                  <h3>Amenities</h3>
                  <ul>
                    {cabin.amenities.map((amenity, idx) => (
                      <li key={idx}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form-section">
            <h2>Booking Details</h2>
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-section">
                <h3>Dates</h3>
                
                <div className="form-group">
                  <label htmlFor="checkInDate">
                    <FaCalendarAlt /> Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkOutDate">
                    <FaCalendarAlt /> Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOutDate"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    required
                    min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Guest Information</h3>

                <div className="form-group">
                  <label htmlFor="numberOfGuests">
                    <FaUsers /> Number of Guests
                  </label>
                  <select
                    id="numberOfGuests"
                    name="numberOfGuests"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    required
                  >
                    {Array.from({ length: cabin.maxGuests }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="guestName">Full Name</label>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guestEmail">Email</label>
                  <input
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={formData.guestEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guestPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="guestPhone"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Special Requests</h3>
                <div className="form-group">
                  <label htmlFor="specialRequests">Any special requests?</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Let us know if you have any special requirements..."
                  />
                </div>
              </div>

              {/* Price Summary */}
              <div className="price-summary">
                <h3>Price Summary</h3>
                <div className="summary-row">
                  <span>Nightly Rate:</span>
                  <span>${cabin.price}</span>
                </div>
                <div className="summary-row">
                  <span>Number of Nights:</span>
                  <span>{numberOfNights}</span>
                </div>
                <div className="summary-row total">
                  <span><FaDollarSign /> Total Price:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={submitting || numberOfNights <= 0}
                style={{ width: '100%' }}
              >
                {submitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
