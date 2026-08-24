import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BrandCard from '../components/BrandCard';
import Footer from '../components/Footer';

// Data imports
import { brands } from '../data/brands';
import './Home.css';

function BrandsPage() {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    // Navigate back to home page and pass selected brand as query param
    navigate(`/?brand=${encodeURIComponent(brandName)}&mode=brand`);
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
        <h1>Popular Car Brands</h1>
        <p>Explore vehicles and compare specifications sorted by India's leading car manufacturers</p>
      </div>

      {/* 3. Brands Grid Container */}
      <main style={{ flexGrow: 1 }} className="page-container">
        <div className="brands-grid" style={{ margin: '0' }}>
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onClick={handleBrandClick}
            />
          ))}
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}

export default BrandsPage;
