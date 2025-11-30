
import React from 'react';
import './index.css'; 

const stats = [
  { value: '10K+', label: 'Successful Projects Launched' },
  { value: '5K+', label: 'Vetted Freelancers Joined' },
  { value: '$1M+', label: 'Earned by our Freelancers' },
];

const logoNames = ['TechCorp', 'InnovateX', 'GlobalSolutions', 'StartupHub', 'DigitalCraft'];

const TrustSection = () => {
  return (
    <div className="trust-section-container">
      <div className="stats-row">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2 className="stat-value">{stat.value}</h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
      <hr className="section-divider" />
      <p className="logo-intro">
        Trusted by cutting-edge companies and innovative startups
      </p>
      <div className="logo-row">
        {logoNames.map((name, index) => (
          <div key={index} className="logo-placeholder">
            <span className="logo-text">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSection;