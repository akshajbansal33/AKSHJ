import React from 'react';
import CarCard from './CarCard';
import './CarGrid.css';

/* 
  CarGrid Component
  Demonstrates:
  1. List Rendering: Using `.map()` to generate lists of React components.
  2. Keys in Lists: Applying unique `key={car.id}` properties (essential React concept).
  3. Conditional Rendering: Showing empty state when search filters return 0 results.
  4. Lifting State / Callbacks: Toggling compare selections and triggering resets on parent state.
*/
function CarGrid({ cars, compareCars, onCompareToggle, onViewDetails, onResetFilters }) {
  
  // Helper to check if a car is added to the comparison list
  const checkIfCompared = (carId) => {
    return compareCars.some(item => item.id === carId);
  };

  return (
    <section id="popular-cars" className="cargrid-section">
      <div className="container">
        
        {/* Grid Header Info bar */}
        <div className="cargrid-header">
          <h2>Trending Discovery Cars</h2>
          <span className="cargrid-count">
            Showing {cars.length} {cars.length === 1 ? 'car' : 'cars'}
          </span>
        </div>

        {/* Conditional rendering depending on results list size */}
        {cars.length > 0 ? (
          <div className="cargrid-layout">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isCompared={checkIfCompared(car.id)}
                onCompareToggle={onCompareToggle}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty State component when filters yield no matches */
          <div className="cargrid-empty">
            <span className="cargrid-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </span>
            <h3>No Cars Found</h3>
            <p>We couldn't find any cars matching your current filters. Try resetting the criteria or modifying search terms.</p>
            <button 
              type="button" 
              className="btn-reset-filters" 
              onClick={onResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CarGrid;
