import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; 

const BannerPage = () =>  {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="hero-content">
       
        <h1 className="hero-title">
          The Future of Work is Here. <br /> Hire Top Talent or Find Your Next Project.
        </h1> 
        
        <p className="hero-subtitle">
          NxtTrendz connects employers with vetted professionals and helps freelancers find high-quality, rewarding work.
        </p>

        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/login')}
          >
            Post a Project
          </button>

          <button className="btn btn-secondary">
            Find Work Today
          </button>
        </div>

        <p className="trust-indicator">
          Trusted by 5,000+ businesses and freelancers globally.
        </p>
      </div>

      <div className="hero-image-placeholder">
        <img 
          src="https://media.istockphoto.com/id/1415537875/photo/asian-graphic-designer-working-in-office-artist-creative-designer-illustrator-graphic-skill.jpg?s=612x612&w=0&k=20&c=9ufB0QZ-LPcz14zLh909QEEbmDmcfIYzhBsST3hXbMs=" 
          alt="freelancer-home-img" 
        />
      </div>
    </div>
  );
};

export default BannerPage;


