import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaHome } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/api/bookings/${bookingId}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBooking();
    }
  }, [bookingId, isAuthenticated]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="error-message">
            <p>Booking not found</p>
            <Link to="/cabins" className="btn-primary">Back to Cabins</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="success-header">
            <FaCheckCircle className="success-icon" />
            <h1>Booking Confirmed!</h1>
            <p>Your reservation has been successfully created</p>
          </div>

          <div className="confirmation-details">
            <div className="detail-section">
              <h2>Booking Information</h2>
              <div className="detail-row">
                <span className="label">Booking ID:</span>
                <span className="value">{booking._id}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`status ${booking.status}`}>{booking.status.toUpperCase()}</span>
              </div>
            </div>

            <div className="detail-section">
              <h2>Guest Details</h2>
              <div className="detail-row">
                <span className="label">Name:</span>
                <span className="value">{booking.guestName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{booking.guestEmail}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{booking.guestPhone || 'Not provided'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Number of Guests:</span>
                <span className="value">{booking.numberOfGuests}</span>
              </div>
            </div>

            <div className="detail-section">
              <h2>Stay Details</h2>
              <div className="detail-row">
                <span className="label">Cabin:</span>
                <span className="value">{booking.cabinId?.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Check-in:</span>
                <span className="value">
                  {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Check-out:</span>
                <span className="value">
                  {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Number of Nights:</span>
                <span className="value">{booking.numberOfNights}</span>
              </div>
            </div>

            <div className="detail-section">
              <h2>Price Information</h2>
              <div className="detail-row">
                <span className="label">Price per Night:</span>
                <span className="value">${booking.cabinId?.price}</span>
              </div>
              <div className="detail-row">
                <span className="label">Number of Nights:</span>
                <span className="value">{booking.numberOfNights}</span>
              </div>
              <div className="detail-row total">
                <span className="label">Total Price:</span>
                <span className="value">${booking.totalPrice}</span>
              </div>
              <div className="detail-row">
                <span className="label">Payment Status:</span>
                <span className={`status ${booking.paymentStatus}`}>
                  {booking.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="detail-section">
                <h2>Special Requests</h2>
                <p className="special-requests">{booking.specialRequests}</p>
              </div>
            )}
          </div>

          <div className="confirmation-actions">
            <button className="btn-primary" onClick={handlePrint}>
              <FaDownload /> Download Confirmation
            </button>
            <Link to="/my-bookings" className="btn-secondary">
              View All Bookings
            </Link>
            <Link to="/" className="btn-secondary">
              <FaHome /> Back to Home
            </Link>
          </div>

          <div className="confirmation-info">
            <h3>What's Next?</h3>
            <ul>
              <li>A confirmation email has been sent to {booking.guestEmail}</li>
              <li>Payment is due at check-in unless other arrangements have been made</li>
              <li>Please bring a valid ID to the cabin</li>
              <li>Check-in time is 3:00 PM and check-out time is 11:00 AM</li>
              <li>For any questions, contact us at info@wildwoodstay.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
