import React, { useState } from 'react';
import { formatIndianPrice } from './CarCard';
import './CompareBar.css';

/* 
  CompareBar Component
  Demonstrates:
  1. Portals / Modal overlays: Render comparison table directly on the viewport.
  2. Conditional Layouts: Toolbar slides up only when items are selected (`visible` class).
  3. Spec Comparison Table: Rows mapping attributes (Brand, Fuel, Gearbox, Capacity, Rating).
  4. React Hooks: useState to open/close the modal.
*/
function CompareBar({ compareCars, onRemove, onClearAll }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasItems = compareCars.length > 0;

  const handleOpenModal = () => {
    if (compareCars.length < 2) {
      alert('Please add at least 2 cars to compare side-by-side!');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Sticky Bottom Compare Bar Panel */}
      <div className={`compare-bar-wrapper ${hasItems ? 'visible' : ''}`}>
        <div className="compare-bar-container container">
          
          {/* Metadata Title */}
          <div className="compare-title-area">
            <h4>Compare Selection</h4>
            <p>{compareCars.length} of 3 cars selected</p>
          </div>

          {/* List of active car chips */}
          <div className="compare-items-list">
            {compareCars.map((car) => (
              <div key={car.id} className="compare-item-chip">
                <img src={car.image} alt={car.name} className="compare-chip-img" />
                <div className="compare-chip-details">
                  <span className="compare-chip-name">{car.name}</span>
                  <span className="compare-chip-price">{formatIndianPrice(car.price)}</span>
                </div>
                <button 
                  type="button" 
                  className="compare-chip-remove" 
                  onClick={() => onRemove(car)}
                  title="Remove car"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
            
            {/* Display empty slots */}
            {Array.from({ length: Math.max(0, 3 - compareCars.length) }).map((_, idx) => (
              <div 
                key={`empty-${idx}`} 
                className="compare-item-chip" 
                style={{ opacity: 0.5, borderStyle: 'dashed', backgroundColor: 'transparent' }}
              >
                <div className="compare-chip-details" style={{ margin: 'auto' }}>
                  <span className="compare-chip-name" style={{ color: 'var(--dark-400)', fontWeight: 500 }}>
                    + Select Car
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Control Action Buttons */}
          <div className="compare-bar-actions">
            <button 
              type="button" 
              className="btn-compare-now" 
              onClick={handleOpenModal}
            >
              Compare Now
            </button>
            <button 
              type="button" 
              className="btn-compare-clear" 
              onClick={onClearAll}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Modal Overlay */}
      {isModalOpen && (
        <div className="compare-modal-overlay" onClick={handleCloseModal}>
          <div 
            className="compare-modal-box" 
            onClick={(e) => e.stopPropagation()} /* Prevents click-away triggering close */
          >
            {/* Modal Title bar */}
            <div className="compare-modal-header">
              <h3>Car Comparison Sheet</h3>
              <button 
                type="button" 
                className="btn-modal-close" 
                onClick={handleCloseModal}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Spec Comparison Table wrapper */}
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    {compareCars.map((car) => (
                      <td key={car.id}>
                        <div className="compare-table-car-header">
                          <img src={car.image} alt={car.name} className="compare-table-car-img" />
                          <div className="compare-table-car-name">{car.name}</div>
                          <div className="compare-table-car-price">{formatIndianPrice(car.price)}</div>
                          <button 
                            type="button" 
                            className="compare-table-remove-btn" 
                            onClick={() => {
                              onRemove(car);
                              // Close modal if comparison list shrinks below 2
                              if (compareCars.length <= 2) {
                                handleCloseModal();
                              }
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Brand</th>
                    {compareCars.map(car => <td key={car.id}>{car.brand}</td>)}
                  </tr>
                  <tr>
                    <th>Fuel Type</th>
                    {compareCars.map(car => <td key={car.id}>{car.fuel}</td>)}
                  </tr>
                  <tr>
                    <th>Gearbox</th>
                    {compareCars.map(car => <td key={car.id}>{car.transmission}</td>)}
                  </tr>
                  <tr>
                    <th>Mileage</th>
                    {compareCars.map(car => <td key={car.id}>{car.mileage}</td>)}
                  </tr>
                  <tr>
                    <th>Capacities</th>
                    {compareCars.map(car => <td key={car.id}>{car.seating} Seater</td>)}
                  </tr>
                  <tr>
                    <th>Body Type</th>
                    {compareCars.map(car => <td key={car.id}>{car.bodyType}</td>)}
                  </tr>
                  <tr>
                    <th>Rating</th>
                    {compareCars.map(car => (
                      <td key={car.id} style={{ fontWeight: 600 }}>
                        <span style={{ color: 'var(--warning)' }}>★</span> {car.rating} / 5.0
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompareBar;
