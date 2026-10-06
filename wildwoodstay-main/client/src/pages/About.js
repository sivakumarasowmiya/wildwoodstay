import React from "react";
import { Link } from "react-router-dom";
import { FaHistory, FaHeart, FaLeaf } from "react-icons/fa";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>Welcome to The Wildwood Stay</h1>
          <p>
            Where nature's beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it's not just about the luxury cabins.
            It's about the experience of reconnecting with nature and enjoying
            simple pleasures with family.
          </p>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="story-content">
            <div className="story-text">
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
                personal touch only a family business can offer. Our commitment
                to excellence and authentic hospitality has made us a beloved
                destination for families and nature enthusiasts.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
                alt="Family managing the stay"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaHeart className="value-icon" />
              <h3>Family First</h3>
              <p>
                We treat every guest like family. Your comfort, safety, and
                happiness are our top priorities.
              </p>
            </div>
            <div className="value-card">
              <FaLeaf className="value-icon" />
              <h3>Nature Preservation</h3>
              <p>
                We're committed to sustainable practices and preserving the
                natural beauty of the Dolomites for future generations.
              </p>
            </div>
            <div className="value-card">
              <FaHistory className="value-icon" />
              <h3>Tradition & Excellence</h3>
              <p>
                Six decades of hospitality excellence. We honor our heritage
                while embracing modern comforts.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="experience-section">
          <h2>The Wildwood Experience</h2>
          <div className="experience-grid">
            <div className="experience-item">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                alt="Mountain hiking"
              />
              <h3>Explore Nature</h3>
              <p>Discover pristine trails and breathtaking mountain views</p>
            </div>
            <div className="experience-item">
              <img
                src="https://images.unsplash.com/photo-1668461363398-1fd41bf2ca79?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hot tub"
              />
              <h3>Relax & Unwind</h3>
              <p>Soak in your private hot tub under the stars</p>
            </div>
            <div className="experience-item">
              <img
                src="https://images.unsplash.com/photo-1676794944553-399cade9cd39?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Luxury cabin"
              />
              <h3>Luxury Comfort</h3>
              <p>Experience world-class amenities and services</p>
            </div>
            <div className="experience-item">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Family bonding"
              />
              <h3>Family Bonding</h3>
              <p>Create unforgettable memories with loved ones</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <h2>Ready to Experience Paradise?</h2>
          <p>
            Join thousands of families who have discovered their slice of heaven
            at The Wildwood Stay.
          </p>
          <Link to="/cabins" className="btn-primary">
            Book Your Cabin Today
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
