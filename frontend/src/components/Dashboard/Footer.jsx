import React from 'react';
import './index.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-grid">
        <div className="footer-column footer-brand">
          <h4 className="footer-logo">NxtTrendz</h4>
          <p className="footer-mission">
            Connecting the best talent with world-changing projects. Work on your terms.
          </p>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn" className="social-icon"></a> 
            <a href="#" aria-label="Twitter" className="social-icon"></a>
            <a href="#" aria-label="Instagram" className="social-icon"></a>
          </div>
        </div>

        <div className="footer-column footer-links">
          <h5 className="column-title">Company</h5>
          <a href="/about" className="footer-link">About Us</a>
          <a href="/careers" className="footer-link">Careers</a>
          <a href="/press" className="footer-link">Press</a>
          <a href="/blog" className="footer-link">Blog</a>
        </div>

        <div className="footer-column footer-contact">
          <h5 className="column-title">Support</h5>
          <a href="/help" className="footer-link">Help Center</a>
          <a href="/contact" className="footer-link">Contact Sales</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </div> 
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} NxtTrendz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;