import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BrandCard from '../components/BrandCard';
import BodyTypeCard from '../components/BodyTypeCard';
import BudgetCard from '../components/BudgetCard';
import CarGrid from '../components/CarGrid';
import CompareBar from '../components/CompareBar';
import SectionTitle from '../components/SectionTitle';
import Footer from '../components/Footer';

// Data imports
import { cars } from '../data/cars';
import { brands } from '../data/brands';
import { bodyTypes } from '../data/bodyTypes';
import { budgets } from '../data/budgets';

// Hook and utility imports
import { useCarFilter } from '../hooks/useCarFilter';
import { formatIndianPrice } from '../components/CarCard';
import './Home.css';

/* 
  Home Page Component
  Demonstrates:
  1. State Orchestrator Pattern: Assembles child modular components and controls parent-level states.
  2. Lifting State Up: Coordinates comparison state and modal triggers shared between grids and cards.
  3. Custom Hook integration: Imports `useCarFilter` to power the primary search system.
  4. Conditional Modals: Renders detail sheet overlays using state triggers.
  5. Smooth Viewport Scroll Anchoring: Interlaces navigation triggers and scrolls down to the grid.
*/
function Home() {
  // 1. Invoke custom search/filter hook
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    handleFilterChange,
    resetFilters,
    filteredCars,
    searchMode,
    setSearchMode
  } = useCarFilter(cars);

  const [searchParams, setSearchParams] = useSearchParams();

  // Sync URL search parameters to hook state on mount or when search parameters change
  useEffect(() => {
    const brand = searchParams.get('brand');
    const budget = searchParams.get('budget');
    const bodyType = searchParams.get('bodyType');
    const mode = searchParams.get('mode');
    const tab = searchParams.get('tab');
    const q = searchParams.get('q');

    if (tab) {
      setActiveTab(tab);
    }
    if (q) {
      setSearchQuery(q);
    }
    if (mode) {
      setSearchMode(mode);
    }

    if (brand || budget || bodyType) {
      setFilters({
        brand: brand || '',
        budget: budget || '',
        bodyType: bodyType || '',
        fuel: '',
        transmission: ''
      });
      // Smooth scroll to catalog
      setTimeout(scrollToCatalog, 200);
    }
  }, [searchParams]);

  // 2. Comparison states (Maximum 3 cars)
  const [compareCars, setCompareCars] = useState([]);


  // 3. Detail modal visibility states
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);

  // Helper: Scroll viewport to listing grid
  const scrollToCatalog = () => {
    const element = document.getElementById('popular-cars');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Callback: Handle search submissions from Hero panel
  const handleSearchSubmit = () => {
    scrollToCatalog();
  };

  // Callback: User selects a brand card
  const handleBrandClick = (brandName) => {
    setSearchMode('brand');
    setFilters((prev) => ({
      ...prev,
      brand: brandName,
      budget: '',
      bodyType: ''
    }));
    scrollToCatalog();
  };

  // Callback: User selects a body type category card
  const handleBodyTypeClick = (bodyTypeName) => {
    setFilters((prev) => ({
      ...prev,
      bodyType: bodyTypeName,
      brand: '',
      budget: ''
    }));
    scrollToCatalog();
  };

  // Callback: User selects a budget range card
  const handleBudgetClick = (budgetValue) => {
    setSearchMode('budget');
    setFilters((prev) => ({
      ...prev,
      budget: budgetValue,
      brand: '',
      bodyType: ''
    }));
    scrollToCatalog();
  };

  // Callback: Toggle adding / removing cars in compare array
  const handleCompareToggle = (car) => {
    const exists = compareCars.some((item) => item.id === car.id);
    
    if (exists) {
      // Remove car if already added
      setCompareCars(compareCars.filter((item) => item.id !== car.id));
    } else {
      // Limit comparison array to maximum 3 items
      if (compareCars.length >= 3) {
        alert('You can compare a maximum of 3 cars at a time! Remove a car to add this one.');
        return;
      }
      setCompareCars([...compareCars, car]);
    }
  };

  // Callback: Remove a car chip from comparison bar
  const handleCompareRemove = (car) => {
    setCompareCars(compareCars.filter((item) => item.id !== car.id));
  };

  // Callback: Clear all selected cars
  const handleClearAllCompare = () => {
    setCompareCars([]);
  };

  // Callback: Open detailed specifications overlay modal
  const handleViewDetails = (car) => {
    setSelectedCarDetails(car);
  };

  // Callback: Close detailed specifications overlay modal
  const handleCloseDetails = () => {
    setSelectedCarDetails(null);
  };

  const isCarCompared = (carId) => compareCars.some((item) => item.id === carId);

  const getBudgetCount = (value) => {
    const isUsedTab = activeTab === 'used';
    const matchesTab = (car) => car.isUsed === isUsedTab;
    if (value === '500000') {
      return cars.filter(car => car.price <= 500000 && matchesTab(car)).length;
    }
    if (value === '1000000') {
      return cars.filter(car => car.price > 500000 && car.price <= 1000000 && matchesTab(car)).length;
    }
    if (value === '1500000') {
      return cars.filter(car => car.price > 1000000 && car.price <= 1500000 && matchesTab(car)).length;
    }
    if (value === '2000000') {
      return cars.filter(car => car.price > 1500000 && car.price <= 2000000 && matchesTab(car)).length;
    }
    if (value === '3000000') {
      return cars.filter(car => car.price > 2000000 && car.price <= 3000000 && matchesTab(car)).length;
    }
    if (value === 'luxury') {
      return cars.filter(car => car.price > 3000000 && matchesTab(car)).length;
    }
    return 0;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Header (Sticky navigation) */}
      <Header />

      {/* 2. Hero banner (gradient background + search card) */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        handleFilterChange={handleFilterChange}
        onSearchSubmit={handleSearchSubmit}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        onScrollToCatalog={scrollToCatalog}
      />

      <main style={{ flexGrow: 1 }}>
        {/* 3. Popular Brands Section */}
        <section id="brands" className="section-wrapper">
          <div className="container">
            <SectionTitle 
              title="Popular Car Brands" 
              subtitle="Find cars by manufacturers" 
            />
            <div className="brands-grid">
              {brands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  onClick={handleBrandClick}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Explore by Body Type Section */}
        <section id="body-types" className="section-wrapper">
          <div className="container">
            <SectionTitle 
              title="Explore by Body Type" 
              subtitle="Select styling categories" 
            />
            <div className="bodytypes-grid">
              {bodyTypes.map((type) => {
                const isUsedTab = activeTab === 'used';
                const dynamicCount = cars.filter(car => 
                  car.bodyType.toLowerCase() === type.name.toLowerCase() && 
                  car.isUsed === isUsedTab
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
          </div>
        </section>

        {/* 5. Budget Categories Section */}
        <section id="budgets" className="section-wrapper">
          <div className="container">
            <SectionTitle 
              title="Find Cars by Budget" 
              subtitle="Explore customized price guides" 
            />
            <div className="budgets-grid">
              {budgets.map((budget) => {
                const dynamicCount = getBudgetCount(budget.value);
                return (
                  <BudgetCard
                    key={budget.id}
                    budget={budget}
                    dynamicCount={dynamicCount}
                    onClick={handleBudgetClick}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Popular Cars Catalog Grid (State-filtered list) */}
        <CarGrid
          cars={filteredCars}
          compareCars={compareCars}
          onCompareToggle={handleCompareToggle}
          onViewDetails={handleViewDetails}
          onResetFilters={resetFilters}
        />

        {/* 7. Why choose Torque Talk section (Marketing details) */}
        <section id="why-us" className="section-wrapper">
          <div className="container">
            <SectionTitle 
              title="Why Choose Torque Talk?" 
              subtitle="India's leading auto research portal" 
            />
            <div className="why-us-grid">
              <div className="why-us-card">
                <div className="why-us-icon-wrapper">⚖️</div>
                <h3 className="why-us-title">Detailed Comparisons</h3>
                <p className="why-us-desc">Compare up to 3 models side-by-side on prices, gearbox capacities, fuel mileage, and star ratings to discover your fit.</p>
              </div>
              <div className="why-us-card">
                <div className="why-us-icon-wrapper">🔍</div>
                <h3 className="why-us-title">Smart Filter Match</h3>
                <p className="why-us-desc">Refine listings down to specific seating capacities, budgets, brands, or transmission styles instantly without delays.</p>
              </div>
              <div className="why-us-card">
                <div className="why-us-icon-wrapper">🛡️</div>
                <h3 className="why-us-title">Certified Resale Listings</h3>
                <p className="why-us-desc">Explore used cars with pre-verified mileage counts and odometer specs for a transparent buying experience.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Compare Tray Bar (appears sticky at bottom when compareCars > 0) */}
      <CompareBar
        compareCars={compareCars}
        onRemove={handleCompareRemove}
        onClearAll={handleClearAllCompare}
      />

      {/* 9. Footer (copyrights, link rows) */}
      <Footer />

      {/* 10. Specifications Detail Modal overlay */}
      {selectedCarDetails && (
        <div className="details-modal-overlay" onClick={handleCloseDetails}>
          <div 
            className="details-modal-box" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="details-modal-header">
              <h3>Vehicle Specifications Sheet</h3>
              <button 
                type="button" 
                className="btn-details-close" 
                onClick={handleCloseDetails}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Details Grid */}
            <div className="details-modal-body">
              <img 
                src={selectedCarDetails.image} 
                alt={selectedCarDetails.name} 
                className="details-modal-img" 
              />
              <div className="details-info-wrap">
                <div className="details-meta-header">
                  <span className="details-brand">{selectedCarDetails.brand}</span>
                  <h2 className="details-name">{selectedCarDetails.name}</h2>
                  <div className="details-price">
                    {formatIndianPrice(selectedCarDetails.price)}
                  </div>
                </div>

                <table className="details-specs-table">
                  <tbody>
                    <tr>
                      <th>Fuel Type</th>
                      <td>{selectedCarDetails.fuel}</td>
                    </tr>
                    <tr>
                      <th>Gearbox</th>
                      <td>{selectedCarDetails.transmission}</td>
                    </tr>
                    <tr>
                      <th>Body Style</th>
                      <td>{selectedCarDetails.bodyType}</td>
                    </tr>
                    <tr>
                      <th>Mileage Rating</th>
                      <td>{selectedCarDetails.mileage}</td>
                    </tr>
                    <tr>
                      <th>Seating</th>
                      <td>{selectedCarDetails.seating} Seater</td>
                    </tr>
                    <tr>
                      <th>Safety Rating</th>
                      <td>⭐ {selectedCarDetails.rating} / 5.0</td>
                    </tr>
                    {selectedCarDetails.isUsed && selectedCarDetails.odometer && (
                      <tr>
                        <th>Odometer Count</th>
                        <td>{selectedCarDetails.odometer}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="details-modal-footer">
              <button 
                type="button" 
                className={`btn-details-compare ${isCarCompared(selectedCarDetails.id) ? 'active' : ''}`}
                onClick={() => {
                  handleCompareToggle(selectedCarDetails);
                }}
              >
                {isCarCompared(selectedCarDetails.id) ? 'Added to Compare ✓' : 'Add to Compare'}
              </button>
              <button 
                type="button" 
                className="btn-reset-filters" 
                style={{ backgroundColor: 'var(--dark-900)' }} 
                onClick={handleCloseDetails}
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
