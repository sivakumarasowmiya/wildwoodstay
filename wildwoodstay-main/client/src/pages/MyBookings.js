import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaDollarSign, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import './MyBookings.css';

const MyBookings = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bookings/user/my-bookings');
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.patch(`/api/bookings/${bookingId}/cancel`);
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1>My Bookings</h1>

        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Bookings
          </button>
          <button
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="bookings-list">
            {filteredBookings.map(booking => (
              <div key={booking._id} className="booking-item">
                <div className="booking-header">
                  <h3>{booking.cabinId?.name || 'Cabin (Deleted)'}</h3>
                  <span className={`status ${booking.status}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail">
                    <FaCalendarAlt className="icon" />
                    <div>
                      <p className="label">Check-in</p>
                      <p className="value">
                        {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="detail">
                    <FaCalendarAlt className="icon" />
                    <div>
                      <p className="label">Check-out</p>
                      <p className="value">
                        {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="detail">
                    <FaUsers className="icon" />
                    <div>
                      <p className="label">Guests</p>
                      <p className="value">{booking.numberOfGuests}</p>
                    </div>
                  </div>

                  <div className="detail">
                    <FaDollarSign className="icon" />
                    <div>
                      <p className="label">Total Price</p>
                      <p className="value">${booking.totalPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="booking-actions">
                  {booking.cabinId && (
                    <Link to={`/cabins/${booking.cabinId._id}`} className="btn-secondary">
                      View Cabin
                    </Link>
                  )}
                  {booking.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn-danger"
                    >
                      <FaTimes /> Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <p>No bookings found</p>
            <Link to="/cabins" className="btn-primary">
              Explore Cabins
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
