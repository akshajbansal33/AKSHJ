import React from 'react';
import './CarCard.css';

/* 
  Helper Utility: Formats number price to Indian Lakhs/Crores display
  Demonstrates: Basic ES6 function, conditional returns, arithmetic division, and toFixed decimal formatting.
*/
export const formatIndianPrice = (price) => {
  if (price >= 10000000) {
    return `₹ ${(price / 10000000).toFixed(2)} Crore`;
  }
  return `₹ ${(price / 100000).toFixed(2)} Lakh`;
};

/* 
  CarCard Component
  Demonstrates:
  1. Component Props: Receiving dynamic data (`car`, `isCompared`, callbacks).
  2. Sub-component division: Modular reuse.
  3. Conditional rendering: Showing odometer only for used cars, and changing button state depending on `isCompared`.
  4. Javascript logic: Inline string interpolation and event triggers.
*/
function CarCard({ car, onCompareToggle, isCompared, onViewDetails }) {
  const {
    name,
    brand,
    price,
    fuel,
    mileage,
    transmission,
    bodyType,
    seating,
    rating,
    isUsed,
    odometer,
    image
  } = car;

  return (
    <article className="car-card">
      {/* Visual Card Image Wrap */}
      <div className="car-card-img-wrapper">
        <img src={image} alt={`${brand} ${name}`} className="car-card-img" loading="lazy" />
        
        {/* Conditional badge showing if car is New or Used */}
        <span className={`car-badge ${isUsed ? 'car-badge-used' : 'car-badge-new'}`}>
          {isUsed ? 'Certified Used' : 'New'}
        </span>
        
        {/* User rating score tag */}
        <div className="car-rating-badge">
          <span className="rating-star">★</span>
          <span>{rating}</span>
        </div>
      </div>

      {/* Details Area */}
      <div className="car-card-content">
        <span className="car-brand-name">{brand}</span>
        <h3 className="car-model-name">{name}</h3>
        
        {/* Conditional odometer label if car is used */}
        {isUsed && odometer && (
          <div className="car-odometer-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{odometer} | Resale</span>
          </div>
        )}

        <div className="car-price">{formatIndianPrice(price)}</div>

        {/* Small Specifications List grid */}
        <div className="car-specs-grid">
          <div className="spec-item">
            <span className="spec-value">{fuel}</span>
            <span className="spec-label">Fuel</span>
          </div>
          <div className="spec-item">
            <span className="spec-value">{transmission}</span>
            <span className="spec-label">Gearbox</span>
          </div>
          <div className="spec-item">
            <span className="spec-value">{seating} Seater</span>
            <span className="spec-label">Capacity</span>
          </div>
        </div>

        {/* Action Button Controls */}
        <div className="car-card-actions">
          <button 
            type="button" 
            className="btn-card-details" 
            onClick={() => onViewDetails(car)}
          >
            Details
          </button>
          
          <button 
            type="button" 
            className={`btn-card-compare ${isCompared ? 'active' : ''}`}
            onClick={() => onCompareToggle(car)}
          >
            {isCompared ? 'Added ✓' : '+ Compare'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default CarCard;
