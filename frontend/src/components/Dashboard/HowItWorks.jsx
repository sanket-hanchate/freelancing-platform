// src/components/HowItWorks.js (No structural change needed, but included for completeness)
import React, { useState } from 'react';
import './index.css';

const employerSteps = [
  { icon: '📝', title: 'Post Your Project', description: 'Describe your needs, budget, and timeline clearly. Posting is free and fast.' },
  { icon: '🤝', title: 'Review & Connect', description: 'Receive proposals from qualified freelancers. Chat, compare portfolios, and select your best fit.' },
  { icon: '✅', title: 'Start & Pay Securely', description: 'Fund the project (held securely in escrow) and use NxtTrendz tools to track progress and approve milestones.' },
];

const freelancerSteps = [
  { icon: '✨', title: 'Build Your Profile', description: 'Showcase your skills, experience, and portfolio to attract high-value clients.' },
  { icon: '🔎', title: 'Discover Projects', description: 'Browse thousands of projects tailored to your expertise and submit custom proposals.' },
  { icon: '💸', title: 'Get Paid Fast', description: 'Deliver quality work, and payment is instantly released from escrow. Build your reputation with 5-star reviews.' },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('employer');
  const steps = activeTab === 'employer' ? employerSteps : freelancerSteps;
   
  return (
    <div className="how-it-works-container">
      <h2 className="section-title">How NxtTrendz Works</h2>
      <p className="section-subtitle">A simple, secure path to getting work done or finding your next opportunity.</p>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'employer' ? 'active' : ''}`}
          onClick={() => setActiveTab('employer')}
        >
          For Employers
        </button>
        <button 
          className={`tab-btn ${activeTab === 'freelancer' ? 'active' : ''}`}
          onClick={() => setActiveTab('freelancer')}
        >
          For Freelancers
        </button>
      </div>

      {/* Steps Content - Flow line visual is now handled purely by CSS using pseudo-elements on the cards */}
      <div className="steps-content">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number-icon">
              <span className="step-number">{index + 1}</span>
              <span className="step-icon">{step.icon}</span>
            </div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );  
};   

export default HowItWorks;
