import React from 'react';
import './BodyTypeCard.css';

/* 
  BodyTypeCard Component
  Demonstrates:
  1. Prop usage: mapping individual `bodyType` details (name, iconName) and `dynamicCount`.
  2. Loading real-life images dynamically from the public directory.
  3. Interactive UI filter bubble navigation.
*/
function BodyTypeCard({ bodyType, dynamicCount, onClick }) {
  const { name, iconName } = bodyType;

  return (
    <div 
      className="bodytype-card" 
      onClick={() => onClick(name)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(name);
        }
      }}
    >
      <div className="bodytype-image-wrapper">
        <img 
          src={`/${iconName}_bodytype.png`} 
          alt={`${name} Body Type`} 
          className="bodytype-image"
        />
      </div>
      <div className="bodytype-name">{name}</div>
      <div className="bodytype-count">
        {dynamicCount} {dynamicCount === 1 ? 'Car' : 'Cars'} Available
      </div>
    </div>
  );
}

export default BodyTypeCard;
