import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import CarGrid from '../components/CarGrid';
import CompareBar from '../components/CompareBar';
import Footer from '../components/Footer';

// Data imports
import { cars } from '../data/cars';

// Hook and utility imports
import { useCarFilter } from '../hooks/useCarFilter';
import { formatIndianPrice } from '../components/CarCard';
import './Home.css';

function NewCarsPage() {
  const navigate = useNavigate();

  // 1. Invoke custom search/filter hook
  const {
    searchQuery,
    setSearchQuery,
    filters,
    handleFilterChange,
    resetFilters,
    filteredCars,
    searchMode,
    setSearchMode
  } = useCarFilter(cars);

  // 2. Comparison states (Maximum 3 cars)
  const [compareCars, setCompareCars] = useState([]);

  // 3. Detail modal visibility states
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);

  // Toggle adding / removing cars in compare array
  const handleCompareToggle = (car) => {
    const exists = compareCars.some((item) => item.id === car.id);
    
    if (exists) {
      setCompareCars(compareCars.filter((item) => item.id !== car.id));
    } else {
      if (compareCars.length >= 3) {
        alert('You can compare a maximum of 3 cars at a time! Remove a car to add this one.');
        return;
      }
      setCompareCars([...compareCars, car]);
    }
  };

  const handleCompareRemove = (car) => {
    setCompareCars(compareCars.filter((item) => item.id !== car.id));
  };

  const handleClearAllCompare = () => {
    setCompareCars([]);
  };

  const handleViewDetails = (car) => {
    setSelectedCarDetails(car);
  };

  const handleCloseDetails = () => {
    setSelectedCarDetails(null);
  };

  const isCarCompared = (carId) => compareCars.some((item) => item.id === carId);

  // Filter only new cars for this page
  const newCars = filteredCars.filter((car) => !car.isUsed);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Header (Sticky navigation) */}
      <Header />

      {/* 2. Page Hero Banner */}
      <div className="page-hero">
        <button className="page-back-btn" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline' }}>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </button>
        <h1>New Cars Showroom</h1>
        <p>Explore and compare brand new models from India's leading manufacturers</p>
      </div>

      <main style={{ flexGrow: 1 }}>
        {/* 3. Search and Filter Box */}
        <section className="container" style={{ marginTop: '40px', padding: '0 20px' }}>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            handleFilterChange={handleFilterChange}
            searchMode={searchMode}
            setSearchMode={setSearchMode}
          />
        </section>

        {/* 4. Filtered Cars Grid */}
        <CarGrid
          cars={newCars}
          compareCars={compareCars}
          onCompareToggle={handleCompareToggle}
          onViewDetails={handleViewDetails}
          onResetFilters={resetFilters}
        />
      </main>

      {/* 5. Compare Drawer Bar */}
      <CompareBar
        compareCars={compareCars}
        onRemove={handleCompareRemove}
        onClearAll={handleClearAllCompare}
      />

      {/* 6. Footer */}
      <Footer />

      {/* 7. Specifications Detail Modal overlay */}
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

export default NewCarsPage;
