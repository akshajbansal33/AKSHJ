import React from 'react';
import './BrandCard.css';

/* 
  BrandCard Component
  Demonstrates:
  1. Component modularity: receiving specific `brand` object props.
  2. UI aesthetics: using stylized text tags as icons to keep the project offline-resilient.
  3. Interactive DOM navigation: bubbling clicks to filter parent items.
*/
function BrandCard({ brand, onClick }) {
  const { name, tagline, logoText, logo } = brand;

  return (
    <div 
      className="brand-card" 
      onClick={() => onClick(name)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(name);
        }
      }}
    >
      {/* Real-life logo emblem */}
      <div className="brand-logo-bubble">
        {logo ? (
          <img src={logo} alt={`${name} logo`} className="brand-logo-img" />
        ) : (
          logoText
        )}
      </div>
      
      <div className="brand-name">{name}</div>
      <div className="brand-tagline">{tagline}</div>
    </div>
  );
}

export default BrandCard;
