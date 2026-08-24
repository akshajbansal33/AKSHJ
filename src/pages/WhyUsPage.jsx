import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

function WhyUsPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Header */}
      <Header />

      {/* 2. Page Hero */}
      <div className="page-hero">
        <button className="page-back-btn" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline' }}>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </button>
        <h1>Why Torque Talk?</h1>
        <p>Learn how India's leading automotive research platform helps you find the perfect ride</p>
      </div>

      {/* 3. Detailed Info Cards */}
      <main style={{ flexGrow: 1 }} className="page-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
          
          <div className="why-us-card" style={{ flexDirection: 'column', textAlign: 'left', alignItems: 'flex-start', padding: '40px', width: '100%', gap: '20px' }}>
            <div className="why-us-icon-wrapper" style={{ margin: '0' }}>⚖️</div>
            <h2 className="why-us-title" style={{ fontSize: '1.6rem' }}>Comprehensive Side-by-Side Comparisons</h2>
            <p className="why-us-desc" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
              Making an informed choice requires data. Torque Talk offers a custom comparison engine that lets you add up to three new or used models to a sticky comparison tray. By clicking compare, you generate a visual matrix comparing exact price figures, fuel variants, automatic or manual transmission systems, fuel efficiency ratings, seating capacity, and safety scores.
            </p>
          </div>

          <div className="why-us-card" style={{ flexDirection: 'column', textAlign: 'left', alignItems: 'flex-start', padding: '40px', width: '100%', gap: '20px' }}>
            <div className="why-us-icon-wrapper" style={{ margin: '0' }}>🔍</div>
            <h2 className="why-us-title" style={{ fontSize: '1.6rem' }}>Advanced Multi-Dimensional Filtering</h2>
            <p className="why-us-desc" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
              Skip scroll fatigue. Our platform runs query-filtering algorithms in real-time. Whether you search by keywords like manufacturer name, or refine results by specific body styles (like rugged SUVs or slick Coupes) and custom price brackets, Torque Talk narrows down the database instantly, caching calculations via React's optimization hooks to guarantee lag-free responsiveness.
            </p>
          </div>

          <div className="why-us-card" style={{ flexDirection: 'column', textAlign: 'left', alignItems: 'flex-start', padding: '40px', width: '100%', gap: '20px' }}>
            <div className="why-us-icon-wrapper" style={{ margin: '0' }}>🛡️</div>
            <h2 className="why-us-title" style={{ fontSize: '1.6rem' }}>Certified Used Car Listing Verification</h2>
            <p className="why-us-desc" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
              Buying a used car requires trust. Torque Talk separates resale listings into a dedicated catalogue page. Every certified used car includes verified mileage ratings, odometer readings, previous owners' star reviews, and detailed specs sheet overlays. We ensure full transparency so you know the exact vehicle health before calling a dealership.
            </p>
          </div>

        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}

export default WhyUsPage;
