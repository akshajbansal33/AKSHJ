import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BodyTypeCard from '../components/BodyTypeCard';
import Footer from '../components/Footer';

// Data imports
import { bodyTypes } from '../data/bodyTypes';
import { cars } from '../data/cars';
import './Home.css';

function BodyTypesPage() {
  const navigate = useNavigate();

  const handleBodyTypeClick = (bodyTypeName) => {
    // Navigate back to home page and pass body type as query param
    navigate(`/?bodyType=${encodeURIComponent(bodyTypeName)}`);
  };

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
        <h1>Explore by Body Type</h1>
        <p>Find the perfect car style matching your styling preferences and passenger needs</p>
      </div>

      {/* 3. Body Types Grid */}
      <main style={{ flexGrow: 1 }} className="page-container">
        <div className="bodytypes-grid" style={{ margin: '0' }}>
          {bodyTypes.map((type) => {
            // Count total cars of this body type (default new cars counts)
            const dynamicCount = cars.filter(car => 
              car.bodyType.toLowerCase() === type.name.toLowerCase() && !car.isUsed
            ).length;
            return (
              <BodyTypeCard
                key={type.id}
                bodyType={type}
                dynamicCount={dynamicCount}
                onClick={handleBodyTypeClick}
              />
            );
          })}
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}

export default BodyTypesPage;
