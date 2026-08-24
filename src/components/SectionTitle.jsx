import React from 'react';
import './SectionTitle.css';

/* 
  SectionTitle Component
  Demonstrates:
  1. Reusable Heading Component: Standardizes headings across different page areas.
  2. Conditional Layout classes: Aligns left or center.
  3. Prop fallback properties: E.g., defaulting align to center.
*/
function SectionTitle({ title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title-wrapper ${align}`}>
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      <h2 className="section-title-main">{title}</h2>
      <div className="section-title-underline"></div>
    </div>
  );
}

export default SectionTitle;
