import React from 'react';
import { Link } from 'react-router-dom';
import { FaKey, FaCalendarAlt, FaLock, FaHeadset } from 'react-icons/fa';
import './GuestArea.css';

const GuestArea = () => {
  return (
    <div className="guest-area-page">
      <div className="container">
        <div className="page-header">
          <h1>Guest Area</h1>
          <p>Everything you need to know about your stay at The Wildwood Stay</p>
        </div>

        <div className="guest-content">
          {/* Check-in Section */}
          <section className="info-card">
            <div className="card-header">
              <FaKey className="card-icon" />
              <h2>Check-in Information</h2>
            </div>
            <div className="card-body">
              <div className="info-item">
                <h3>Check-in Time</h3>
                <p>3:00 PM</p>
              </div>
              <div className="info-item">
                <h3>Check-out Time</h3>
                <p>11:00 AM</p>
              </div>
              <div className="info-item">
                <h3>What to Bring</h3>
                <ul>
                  <li>Valid government-issued ID</li>
                  <li>Credit card for incidentals</li>
                  <li>Booking confirmation</li>
                </ul>
              </div>
              <div className="info-item">
                <h3>Check-in Location</h3>
                <p>The main lodge, Italian Dolomites</p>
                <p>Coordinates: 46.4104° N, 11.8860° E</p>
              </div>
            </div>
          </section>

          {/* House Rules Section */}
          <section className="info-card">
            <div className="card-header">
              <FaLock className="card-icon" />
              <h2>House Rules</h2>
            </div>
            <div className="card-body">
              <ul className="rules-list">
                <li>Guests must be 18+ to book</li>
                <li>Pets are allowed (with prior approval and additional fee)</li>
                <li>No smoking inside the cabin</li>
                <li>Noise should be kept to reasonable levels</li>
                <li>Parties and large gatherings are not permitted</li>
                <li>Respect for nature and wildlife is required</li>
                <li>Please leave the cabin in clean condition</li>
                <li>Guests are responsible for any damages</li>
              </ul>
            </div>
          </section>

          {/* Amenities & Services Section */}
          <section className="info-card">
            <div className="card-header">
              <FaCalendarAlt className="card-icon" />
              <h2>Amenities & Services</h2>
            </div>
            <div className="card-body">
              <div className="amenities-grid">
                <div className="amenity-item">
                  <h3>🏥 Medical Services</h3>
                  <p>Nearest hospital: 25 km away</p>
                </div>
                <div className="amenity-item">
                  <h3>🍽️ Dining</h3>
                  <p>Full kitchen in all cabins + restaurant on-site</p>
                </div>
                <div className="amenity-item">
                  <h3>📶 Internet</h3>
                  <p>Free high-speed WiFi throughout property</p>
                </div>
                <div className="amenity-item">
                  <h3>🔥 Heating & Cooling</h3>
                  <p>Central heating and AC available</p>
                </div>
                <div className="amenity-item">
                  <h3>🚗 Parking</h3>
                  <p>Free parking on property</p>
                </div>
                <div className="amenity-item">
                  <h3>🛁 Hot Tub</h3>
                  <p>Private hot tubs in all cabins</p>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section className="info-card">
            <div className="card-header">
              <h2>Things to Do</h2>
            </div>
            <div className="card-body">
              <div className="activities-grid">
                <div className="activity">
                  <h3>🥾 Hiking</h3>
                  <p>Numerous trails with varying difficulty levels</p>
                </div>
                <div className="activity">
                  <h3>🚴 Mountain Biking</h3>
                  <p>Professional trails available</p>
                </div>
                <div className="activity">
                  <h3>🏔️ Rock Climbing</h3>
                  <p>Guided climbing tours available</p>
                </div>
                <div className="activity">
                  <h3>⛷️ Skiing</h3>
                  <p>Winter activities December to March</p>
                </div>
                <div className="activity">
                  <h3>📸 Photography</h3>
                  <p>Stunning views for photography</p>
                </div>
                <div className="activity">
                  <h3>🦌 Wildlife Watching</h3>
                  <p>Observe alpine wildlife in natural habitat</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="info-card">
            <div className="card-header">
              <FaHeadset className="card-icon" />
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="card-body">
              <div className="faq-item">
                <h3>Can I cancel my booking?</h3>
                <p>Yes, cancellations can be made up to 7 days before check-in for full refund. Cancellations within 7 days are non-refundable.</p>
              </div>
              <div className="faq-item">
                <h3>Are pets allowed?</h3>
                <p>Yes, pets are allowed with prior approval. There is an additional fee of $30 per pet per night.</p>
              </div>
              <div className="faq-item">
                <h3>Do you offer late check-out?</h3>
                <p>Late check-out until 2:00 PM is available for an additional fee of $50 (subject to availability).</p>
              </div>
              <div className="faq-item">
                <h3>Is breakfast included?</h3>
                <p>Breakfast is not included but can be ordered at the on-site restaurant for an additional fee.</p>
              </div>
              <div className="faq-item">
                <h3>What is your cancellation policy?</h3>
                <p>7 days before arrival: Full refund. 3-7 days: 50% refund. Less than 3 days: Non-refundable.</p>
              </div>
              <div className="faq-item">
                <h3>Can I have a wedding or event at the cabin?</h3>
                <p>Small private events are possible. Contact us at info@wildwoodstay.com for details.</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="contact-section">
            <h2>Need Help?</h2>
            <p>Our team is here to help 24/7</p>
            <div className="contact-methods">
              <div className="contact-method">
                <h3>Email</h3>
                <p>info@wildwoodstay.com</p>
              </div>
              <div className="contact-method">
                <h3>Phone</h3>
                <p>+39 123 456 7890</p>
              </div>
              <div className="contact-method">
                <h3>Live Chat</h3>
                <p>Available on website during business hours</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="cta-section">
            <h2>Ready to Book Your Stay?</h2>
            <Link to="/cabins" className="btn-primary">
              Explore Cabins
            </Link>
            <Link to="/my-bookings" className="btn-secondary">
              View My Bookings
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GuestArea;
