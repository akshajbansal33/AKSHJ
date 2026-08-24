import React from 'react';
import SearchBox from './SearchBox';
import './Hero.css';

/* 
  Hero Component
  Clean, high-fidelity professional layout.
  Demonstrates:
  1. Component Composition: Nesting the SearchBox component.
  2. Multi-column Grid: Content on the left, premium graphic asset on the right.
  3. Fully responsive styling.
*/
function Hero({ 
  searchQuery, 
  setSearchQuery, 
  filters, 
  handleFilterChange, 
  onSearchSubmit,
  activeTab,
  setActiveTab,
  searchMode,
  setSearchMode
}) {
  return (
    <section className="hero-section">
      <div className="hero-container container">
        {/* Left Column: Heading, description, and search card */}
        <div className="hero-content-left">
          <span className="hero-subtitle">Discover Your Drive</span>
          <h1 className="hero-title">
            Find Your <span className="hero-title-highlight">Perfect</span> Car
          </h1>
          <p className="hero-desc">
            Explore, compare, and discover cars that fit your lifestyle and budget.
          </p>
          
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            handleFilterChange={handleFilterChange}
            onSearchSubmit={onSearchSubmit}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchMode={searchMode}
            setSearchMode={setSearchMode}
          />
        </div>
        
        {/* Right Column: Premium vehicle card asset */}
        <div className="hero-content-right">
          <div className="hero-image-card">
            <img 
              src="/realistic_car_hero.png" 
              alt="Realistic premium vehicles" 
              className="hero-car-image" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;


