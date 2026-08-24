import React from 'react';
import './SearchBox.css';


/* 
  SearchBox Component (CarDekho Style Redesign)
  Demonstrates:
  1. Controlled Components & State: Local searchMode state ('budget' vs 'brand').
  2. Tabs & Radios: Tab buttons and radio buttons mapping to active filters.
  3. Dynamic Fields: Conditional form inputs rendering based on selected search mode.
*/
function SearchBox({ 
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

  // Available filter options (matching data/cars.js)
  const brands = ['Maruti Suzuki', 'Tata', 'Hyundai', 'Mahindra', 'Toyota', 'Kia', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi'];
  const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'MUV', 'Coupe'];
  const budgets = [
    { label: 'Under ₹5 Lakh', value: '500000' },
    { label: '₹5–10 Lakh', value: '1000000' },
    { label: '₹10–15 Lakh', value: '1500000' },
    { label: '₹15–20 Lakh', value: '2000000' },
    { label: '₹20–30 Lakh', value: '3000000' },
    { label: 'Luxury Cars (₹30L+)', value: 'luxury' }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'compare') {
      const element = document.getElementById('popular-cars');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleModeChange = (mode) => {
    setSearchMode(mode);
    // When switching mode, reset the unused filter
    if (mode === 'budget') {
      handleFilterChange('brand', '');
    } else {
      handleFilterChange('budget', '');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(); // Scroll to listings
  };

  const handleQuickTagClick = (brandName) => {
    setSearchMode('brand');
    handleFilterChange('brand', brandName);
    onSearchSubmit();
  };

  return (
    <div className="search-box-card">
      <h3 className="search-box-title">Find your right car</h3>

      {/* Tabs: New Car / Used Car / Compare Cars */}
      <div className="search-tabs">
        <button
          type="button"
          className={`search-tab-btn ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => handleTabClick('new')}
        >
          New Car
        </button>
        <button
          type="button"
          className={`search-tab-btn ${activeTab === 'used' ? 'active' : ''}`}
          onClick={() => handleTabClick('used')}
        >
          Used Car
        </button>
        <button
          type="button"
          className={`search-tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
          onClick={() => handleTabClick('compare')}
        >
          Compare Cars
        </button>
      </div>

      {/* Mode Radios: By Budget / By Brand */}
      <div className="search-mode-radios">
        <label className="radio-label">
          <input
            type="radio"
            name="searchMode"
            value="budget"
            checked={searchMode === 'budget'}
            onChange={() => handleModeChange('budget')}
            className="radio-input"
          />
          <span className="custom-radio"></span>
          <span className="radio-text">By Budget</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="searchMode"
            value="brand"
            checked={searchMode === 'brand'}
            onChange={() => handleModeChange('brand')}
            className="radio-input"
          />
          <span className="custom-radio"></span>
          <span className="radio-text">By Brand</span>
        </label>
      </div>

      {/* Search Form */}
      <form onSubmit={handleFormSubmit}>
        <div className="search-form-inputs">
          {searchMode === 'budget' ? (
            <>
              {/* Budget Select */}
              <div className="form-group">
                <div className="form-input-wrapper form-input-wrapper-select">
                  <select
                    id="budget-select"
                    className="form-select"
                    value={filters.budget}
                    onChange={(e) => handleFilterChange('budget', e.target.value)}
                  >
                    <option value="">Select Budget</option>
                    {budgets.map((b) => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Body Type Select */}
              <div className="form-group">
                <div className="form-input-wrapper form-input-wrapper-select">
                  <select
                    id="bodytype-select"
                    className="form-select"
                    value={filters.bodyType}
                    onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                  >
                    <option value="">All Vehicle Types</option>
                    {bodyTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Brand Select */}
              <div className="form-group">
                <div className="form-input-wrapper form-input-wrapper-select">
                  <select
                    id="brand-select"
                    className="form-select"
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                  >
                    <option value="">Select Brand</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Body Type Select */}
              <div className="form-group">
                <div className="form-input-wrapper form-input-wrapper-select">
                  <select
                    id="bodytype-select"
                    className="form-select"
                    value={filters.bodyType}
                    onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                  >
                    <option value="">All Vehicle Types</option>
                    {bodyTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Large Premium Search Button */}
        <button type="submit" className="search-submit-btn-large">
          Search
        </button>

        {/* Text Input Search Bar (Collapsible / Sleek under text) */}
        <div className="form-group name-search-group">
          <div className="form-input-wrapper">
            <span className="form-input-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Or search by name (e.g., Nexon, Thar...)"
              className="form-input-compact"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </form>

      {/* Quick search tags */}
      <div className="quick-tags-compact">
        <span className="quick-tag" onClick={() => handleQuickTagClick('Tata')}>Tata Nexon</span>
        <span className="quick-tag" onClick={() => handleQuickTagClick('Mahindra')}>Mahindra Thar</span>
        <span className="quick-tag" onClick={() => handleQuickTagClick('Hyundai')}>Hyundai Creta</span>
      </div>
    </div>
  );
}

export default SearchBox;
