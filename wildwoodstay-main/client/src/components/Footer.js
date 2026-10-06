import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>
              The Wildwood Stay offers luxury cabins in the heart of the Italian
              Dolomites. Experience nature's beauty with comfort and elegance.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/cabins">Cabins</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/guest-area">Guest Area</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@wildwoodstay.com</p>
            <p>Phone: +39 123 456 7890</p>
            <p>Address: Italian Dolomites</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 The Wildwood Stay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
