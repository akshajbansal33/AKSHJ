import React from 'react';
import SearchBox from './SearchBox';
import './Hero.css';

/* 
  Hero Component — cinematic full-bleed banner
  A large image, oversized display headline, floating glass search card,
  and a live stats strip. Commits to a dark-luxury automotive aesthetic.
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
  setSearchMode,
  onScrollToCatalog
}) {
  return (
    <section className="hero-section">
      {/* Background media */}
      <div className="hero-bg">
        <img src="/cinematic_hero.png" alt="" className="hero-bg-img" aria-hidden="true" />
        <div className="hero-bg-overlay" aria-hidden="true"></div>
      </div>

      {/* Oversized watermark headline behind content */}
      <span className="hero-watermark" aria-hidden="true">DRIVE</span>

      <div className="hero-inner container">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">Power. Precision. Prestige.</span>
          <h1 className="hero-title">
            Find Your
            <span className="hero-title-accent"> Perfect </span>
            Machine
          </h1>
          <p className="hero-desc">
            Explore, compare, and configure India&apos;s finest new and pre-owned cars —
            all in one cinematic showroom built for enthusiasts.
          </p>

          <div className="hero-actions">
            <button type="button" className="hero-cta-primary" onClick={onScrollToCatalog}>
              Explore Inventory
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>500+</strong>
                <span>Models</span>
              </div>
              <div className="hero-stat">
                <strong>10</strong>
                <span>Top Brands</span>
              </div>
              <div className="hero-stat">
                <strong>4.9</strong>
                <span>Avg Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating search card */}
        <div className="hero-search-slot">
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
      </div>
    </section>
  );
}

export default Hero;
