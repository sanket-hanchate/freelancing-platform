
import React from 'react';
import './index.css';

const categories = [
  { name: 'Web Development', icon: '💻' },
  { name: 'Graphic Design', icon: '🎨' },
  { name: 'Content Writing', icon: '✍️' },
  { name: 'Virtual Assistant', icon: '📞' },
  { name: 'Digital Marketing', icon: '📈' },
  { name: 'Video Editing', icon: '🎬' },
];

const topFreelancers = [
  { name: 'Alice M.', skill: 'Full Stack Dev', rating: 5.0, projects: 45 },
  { name: 'Ben S.', skill: 'Brand Designer', rating: 4.9, projects: 62 },
  { name: 'Chloe T.', skill: 'SEO Specialist', rating: 4.8, projects: 31 },
];

const FeaturedContent = () => {
  return (
    <div className="featured-content-container">
      <h2 className="section-title">Discover Top Talent and Services</h2>
      <p className="section-subtitle">Find high-demand skills or see who's delivering amazing results on NxtTrendz.</p>
      
      <h3 className="content-heading">Browse by Top Categories</h3>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <a key={index} href={`/search?category=${cat.name}`} className="category-card">
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </a>
        ))}
      </div>

      <h3 className="content-heading">Meet Our Top-Rated Professionals</h3>
      <div className="freelancer-list">
        {topFreelancers.map((freelancer, index) => (
          <div key={index} className="freelancer-card">
            <div className="freelancer-header">
              <span className="avatar-initials">{freelancer.name.charAt(0)}</span>
              <div className="freelancer-info">
                <h4 className="freelancer-name">{freelancer.name}</h4>
                <p className="freelancer-skill">{freelancer.skill}</p>
              </div>
            </div>
            <div className="freelancer-stats">
              <p>⭐️ {freelancer.rating} Rating</p>
              <p>{freelancer.projects} Projects Completed</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default FeaturedContent;