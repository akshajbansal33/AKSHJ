import React from 'react';
import './Footer.css';

/* 
  Footer Component
  Demonstrates:
  1. Standard Semantic HTML structure: `<footer className="footer-wrapper">`.
  2. Multi-column flex & grid grids.
  3. Simple click-to-scroll utility links.
*/
function Footer() {
  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        
        {/* Upper Column list */}
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-col footer-brand">
            <h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)' }}>
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
              Torque<span className="logo-text-talk">Talk</span>
            </h3>
            <p className="footer-brand-desc">
              Torque Talk is India's premium automobile discovery platform. We assist you in finding, comparing, and selecting the perfect car that seamlessly integrates with your lifestyle and budget.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <span className="footer-col-title">Overview</span>
            <ul className="footer-links">
              <li><span onClick={() => handleScrollTo('popular-cars')}>New Car Listings</span></li>
              <li><span onClick={() => handleScrollTo('brands')}>Popular Brands</span></li>
              <li><span onClick={() => handleScrollTo('body-types')}>Body Types</span></li>
              <li><span onClick={() => handleScrollTo('budgets')}>Budget Guides</span></li>
            </ul>
          </div>

          {/* Column 3: Corporate Info */}
          <div className="footer-col">
            <span className="footer-col-title">Corporate</span>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('About Us will be added in Phase 2 Router!'); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Contact Us will be added in Phase 2 Router!'); }}>Contact Support</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Careers will be added in Phase 2!'); }}>Careers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Press Center will be added in Phase 2!'); }}>Press Releases</a></li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="footer-col">
            <span className="footer-col-title">Get in Touch</span>
            <div className="footer-links">
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>123 Auto Hub, Bandra Kurla Complex, Mumbai, India</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <span>+91 22 5555 0199</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <span>discover@torquetalk.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Copyright bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Torque Talk India Private Ltd. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
