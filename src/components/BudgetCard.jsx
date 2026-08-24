import React from 'react';
import './BudgetCard.css';

/* 
  BudgetCard Component
  Demonstrates:
  1. Component props: mapping individual `budget` range options (label, value, count).
  2. Sub-component design.
  3. Interactive DOM callbacks.
*/
function BudgetCard({ budget, dynamicCount, onClick }) {
  const { label, value } = budget;

  return (
    <div 
      className="budget-card" 
      onClick={() => onClick(value)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(value);
        }
      }}
    >
      <div className="budget-info">
        <span className="budget-label">{label}</span>
        <span className="budget-count">
          {dynamicCount} {dynamicCount === 1 ? 'Car' : 'Cars'}
        </span>
      </div>
      
      {/* Visual chevron indicator */}
      <div className="budget-chevron">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}

export default BudgetCard;
