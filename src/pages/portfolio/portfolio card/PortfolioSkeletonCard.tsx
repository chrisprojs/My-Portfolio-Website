// SkeletonCard.js
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import "./PortfolioSkeletonCard.css";

function PortfolioSkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton-title" />
        <div className="skeleton-details" />
        <div className="skeleton-skills">
          <div className="skeleton-skill" />
          <div className="skeleton-skill" />
          <div className="skeleton-skill" />
        </div>
      </div>
    </div>
  );
}

export default PortfolioSkeletonCard;