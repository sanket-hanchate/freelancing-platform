import React from 'react';
import './index.css';

const ConversionSection = () => {
  return (
    <div className="conversion-section-container">
      <div className="conversion-content">
        <h2 className="conversion-title">
          Ready to Elevate Your Work or Your Career?
        </h2>
        <p className="conversion-subtitle">
          Join NxtTrendz today and access a world of top talent and rewarding opportunities.
        </p>
        
        <div className="conversion-buttons">
          <a href="/post-project" className="conversion-btn btn-primary-lg">
            Start Hiring Now
          </a>
          <a href="/projects" className="conversion-btn btn-secondary-lg">
            Find Your Next Project
          </a>
        </div>
      </div>
    </div>
  );
};


export default ConversionSection;
