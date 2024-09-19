// SkeletonCard.js
import React, { useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import "./PortfolioSkeletonCard.css";

function PortfolioSkeletonCard() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      document.body.classList.add('home-page');
    }
    else{
      document.body.classList.remove('home-page');
    }
  }, []);
  return (
    <div className='skeleton-card-container'>
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
    </div>
  );
}

export default PortfolioSkeletonCard;
