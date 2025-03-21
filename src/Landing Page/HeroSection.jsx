// HeroSection.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import './Navbar.css';
const HeroSection = () => {
  // References for animation elements
  const heroRef = useRef(null);
  const navigate = useNavigate();
  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              <span className="highlight">Build</span> Your Future With Our 
              <span className="highlight"> Franchise</span> Opportunity
            </h1>
            
            <p className="hero-subtitle">
              Join our network of successful franchise partners and create a thriving 
              business with our proven systems and dedicated support team.
            </p>
            
            <motion.div 
              className="cta-group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* <button  className="cta-button primary ">Apply Now</button> */}
              {/* <button className="cta-button secondary">Learn More</button> */}
              
            </motion.div>

            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Locations</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* <div className="image-container">
              <img src="/api/placeholder/600/500" alt="Franchise Success" className="main-image" />
              
              <motion.div 
                className="floating-card card-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="card-icon">🚀</div>
                <div className="card-text">Quick Setup</div>
              </motion.div>
              
              <motion.div 
                className="floating-card card-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="card-icon">💰</div>
                <div className="card-text">High ROI</div>
              </motion.div>
              
              <motion.div 
                className="floating-card card-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <div className="card-icon">🛠️</div>
                <div className="card-text">Full Training</div>
              </motion.div>
            </div> */}
          </motion.div>
        </div>
      </div>
      
      <div className="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;